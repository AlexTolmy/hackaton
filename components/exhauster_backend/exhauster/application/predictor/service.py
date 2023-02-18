from datetime import datetime
from typing import List

from classic.app import DTO

from exhauster.application import interfaces


class SensorValue(DTO):
    value: float
    short_tag: str    # столбец D из файла мапинга
    full_name: str    # Название, столбец F из файла мапинга


class ActualDataRow(DTO):
    moment: datetime
    data: List[SensorValue]


class ActualDataTable(DTO):
    aglo_machine: int    # номер агломашины
    exhauster_id: int    # номер эксгаустера
    data: List[ActualDataRow]


class Prediction(DTO):
    aglo_machine: int    # номер агломашины
    exhauster_id: int    # номер эксгаустера
    days_to_failure: int


class Predictor(interfaces.PredictService):

    def predict(self, actual_data: ActualDataTable) -> Prediction:
        ...
