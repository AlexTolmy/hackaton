from datetime import datetime
from typing import List, Dict

import numpy as np
import pandas as pd
import pmdarima as pm
from classic.app import DTO

from exhauster.application import interfaces
from .settings import Settings


class VibrationValue(DTO):
    moment: datetime
    value: float
    bearing_id: int
    vibration_type: str  # horizontal | vertical
    warning_max: float


class ActualDataTable(DTO):
    exhauster_id: int  # номер эксгаустера
    data: List[VibrationValue]


class Prediction(DTO):
    exhauster_id: int  # номер эксгаустера
    days_to_failure: int
    message: str


class Predictor(interfaces.PredictService):
    """
    Получает данные по 7, 8 подшипнику (горизонт. и вертикальная вибрация)
    одного из эксгаустеров с момента крайней замены,
    прогнозирует когда эксгаустер выйдет из строя
    """

    def predict(self, actual_data: ActualDataTable, arima=False) -> Prediction:
        vibrations_data, warnings = self._dto_to_dataframe(actual_data)
        rolled_data = self._rolling_data(vibrations_data)

        if arima:
            failure_days_by_col = self._calc_failure_days_arima(
                rolled_data, warnings
            )
        else:
            expressions_dict = self._get_linear_expressions(rolled_data)
            failure_days_by_col = self._calc_failure_days(
                expressions_dict, warnings
            )

        days_to_failure = min(failure_days_by_col.values())
        prediction = Prediction(
            exhauster_id=actual_data.exhauster_id,
            days_to_failure=days_to_failure,
            message=str(days_to_failure) if days_to_failure <= 30 else '>30'
        )
        return prediction

    @staticmethod
    def _get_linear_expressions(data: pd.DataFrame):
        expressions_dict = dict()
        for col in data.columns:
            model = np.polynomial.polynomial.polyfit(
                data.index, data[col], 1
            )
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

        for i in range(0, depth_prediction+day_step, day_step):
            pred_vibration = np.poly1d(model)(i)
            if pred_vibration > warning-Settings.WARNING_VIBRATION_SENSITIVITY:
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
    def _dto_to_dataframe(actual_data: ActualDataTable) -> (
        pd.DataFrame, Dict[str, float]
    ):
        """
        moment - index, остальные значения в колонках dataframe
        также возвращает предупредительные уставки по вибрациям
        """

        ...
