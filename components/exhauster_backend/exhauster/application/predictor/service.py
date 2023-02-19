import datetime
from typing import Dict, List, Tuple

import numpy as np
import pandas as pd
import pmdarima as pm
from classic.components import component

from exhauster.application import interfaces

from .dto import ActualDataTable, Prediction, Rotor
from .settings import Settings


@component
class Predictor(interfaces.PredictService):
    """
    Получает данные по 7, 8 подшипнику (горизонт. и вертикальная вибрация)
    одного из эксгаустеров с момента крайней замены,
    прогнозирует когда эксгаустер выйдет из строя
    """
    rotor_repo: interfaces.RotorRepo
    predictions_repo: interfaces.PredictionsRepo
    vibration_repo: interfaces.VibrationsRepo
    exhauster_repo: interfaces.ExhausterRepo

    def predict(self, exhauster_id: str, arima=False):
        all_rotors_start_date = self.rotor_repo.get(exhauster_id)
        fact_failures, pred_failures = self.rotor_repo.\
            get_10_failures(exhauster_id)

        rotor_start_date = self._get_start_rotor(
            all_rotors_start_date, exhauster_id
        )

        actual_data: ActualDataTable = self.vibration_repo.get_vibrations(
            exhauster_id=str(exhauster_id),
            bearing_id=str(7),
            start=rotor_start_date,
        )
        actual_data.data.append(
            self.vibration_repo.get_vibrations(
                exhauster_id=str(exhauster_id),
                bearing_id=str(8),
                start=rotor_start_date,
            )
        )

        vibrations_data, warnings = self._dto_to_dataframe(actual_data)
        rolled_data = self._rolling_data(vibrations_data)

        if arima:
            failure_days_by_col = self._calc_failure_days_arima(
                rolled_data, warnings
            )
        else:
            expressions_dict = self._get_linear_expressions(rolled_data)

            if len(fact_failures) >= 10:
                remains = self._calc_failure_errors(
                    fact_failures, pred_failures
                )
                expressions_dict = self._fined_model(remains, expressions_dict)

            failure_days_by_col = self._calc_failure_days(
                expressions_dict, warnings
            )

        days_to_failure = min(failure_days_by_col.values())
        days_to_failure = days_to_failure if days_to_failure < 30 else 30

        prediction = Prediction(
            exhauster_id=self.exhauster_repo.get(str(exhauster_id)),
            stop_at=datetime.datetime.now() +
                            datetime.timedelta(days=days_to_failure),
        )
        self.predictions_repo.save(prediction)

    def _fined_model(self, remains: List[int],
                     expressions) -> Tuple[float, float]:
        """
        штраф модели (изменения угла линейной регрессии) в зависимости
        от того, в какую сторону ошибались в последнее время,
        реализовано через затухание важности
        """
        for col in expressions:
            multiplier = expressions[col][0]
            correct_coeff = np.mean(
                np.array(remains) * np.array([i for i in range(len(remains))])
            )
            # уменьшаем угол наклона прямой прогноза, если ошибаемся вверх
            # (прогноз всегда выше факта), в противном случае наоборот
            new_multiplier = multiplier - (multiplier * correct_coeff) * 100
            expressions[col][0] = new_multiplier

        return expressions

    def _calc_failure_errors(
        self, fact_failures: List[Rotor], pred_failures: List[Prediction]
    ) -> List[int]:
        """функция для получения ошибок по предсказаниям замен ротора"""
        remains = []
        fact_failures_dates = dict()
        for val in pred_failures:
            fact_failures_dates[val] = val.days_to_failure

        pred_failures_ser = pd.Series(fact_failures_dates)
        pred_failures_ser.sort_index(inplace=True)

        for ff in fact_failures:
            pred_time = pd.to_datetime(
                ff.installed_at - datetime.timedelta(days=1)
            )
            pred_delta = pred_failures_ser.index.get_loc(
                pred_time, tolerance='nearest'
            )
            remains.append(pred_delta)

        return remains

    @staticmethod
    def _get_start_rotor(all_rotors_start_date, exhauster_id):
        for s in all_rotors_start_date:
            if s.exhauster_number == exhauster_id:
                return s.exhauster_number

        return None

    @staticmethod
    def _get_linear_expressions(data: pd.DataFrame):
        expressions_dict = dict()
        for col in data.columns:
            model = np.polynomial.polynomial.polyfit(data.index, data[col], 1)
            expressions_dict[col] = model

        return expressions_dict

    def _calc_failure_days(self, expressions, warnings) -> Dict[str, int]:
        failures_dict = dict()
        for col, expression in expressions.items():
            failures_dict[col] = self._predict_grid(expression, warnings[col])
        return failures_dict

    def _predict_grid(self, model, warning):
        """проходим по сетке на 30 дней вперед, наработкой считаем тот день,
        если на следующий выпали по предупредительной границе"""
        # 1440 - день в минутах
        day_step = int(1440 / Settings.RESAMPLE_WINDOW_MINUTES)
        # глубина прогноза - 30 дней
        depth_prediction = 30 * day_step
        days_wo_failure = 0

        for i in range(0, depth_prediction + day_step, day_step):
            pred_vibration = np.poly1d(model)(i)
            if pred_vibration > warning - Settings.WARNING_VIBRATION_SENSITIVITY:
                break
            else:
                days_wo_failure = i

        return int(days_wo_failure / day_step)

    def _calc_failure_days_arima(self, df, warnings):
        # 1440 - день в минутах
        day_step = int(1440 / Settings.RESAMPLE_WINDOW_MINUTES)
        # глубина прогноза - 30 дней
        depth_prediction = 30 * day_step

        failures_dict = dict()
        for col in df.columns:
            model = pm.auto_arima(df[col], seasonal=False)
            preds = model.predict(depth_prediction)
            # берем крайний день, когда только выпали по предупреждению и
            # берем -1 день как наработку
            failures_dict[col] = preds[preds >= warnings[col]].index.min() - 1

        return failures_dict

    @staticmethod
    def _rolling_data(df: pd.DataFrame):
        # фильтруем околонулевые значения вибраций
        for col in df.columns:
            df = df[df[col] > Settings.VIBRATION_SENSITIVITY]

        roll_window_min = Settings.ROLLING_WINDOW_MINUTES
        rolled = df.rolling(
            f'{roll_window_min}min', min_periods=int(roll_window_min / 4)
        ).mean().resample(f'{Settings.RESAMPLE_WINDOW_MINUTES}min').mean()
        rolled = rolled.reset_index(drop=True)

        return rolled

    @staticmethod
    def _dto_to_dataframe(
        actual_data: ActualDataTable
    ) -> (pd.DataFrame, Dict[str, float]):
        """
        moment - index, остальные значения в колонках dataframe
        также возвращает предупредительные уставки по вибрациям
        """
        data_by_time = dict()
        warnings = dict()

        for vibration_val in actual_data.data:
            col_name = f'Подшипник_{vibration_val.bearing_id}. ' \
                       f'Вибрация {vibration_val.vibration_type}'
            if 'vibration' in vibration_val.field_name:
                if vibration_val.moment not in data_by_time:
                    data_by_time[vibration_val.moment] = dict()
                data_by_time[vibration_val.moment
                             ][col_name] = vibration_val.value
            elif 'warning' in vibration_val.field_name:
                if col_name not in warnings:
                    warnings[col_name] = vibration_val.value

        df = pd.DataFrame.from_dict(data_by_time, orient='index')
        df.index = df.index.astype('datetime[64]')
        df = df.sort_index(ascending=True)

        return df, warnings
