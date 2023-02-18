from abc import ABC, abstractmethod
from typing import List

from predictor.service import Prediction, ActualDataTable
from exhauster.application.predictor import dto


class PredictService(ABC):

    @abstractmethod
    def predict(self, actual_data: ActualDataTable) -> Prediction:
        ...


class RotorRepo(ABC):

    @abstractmethod
    def all(self) -> List[dto.Rotor]:
        ...


class PredictionsRepo(ABC):

    @abstractmethod
    def save(self, prediction: dto.Prediction):  # как вариант можно переделать на List[dto.Prediction] чтоб сохранять сразу все предсказания
        ...


class VibrationsRepo(ABC):

    @abstractmethod
    def get_vibrations(self, exhauster_id: str, bearing_id: str, start):
        ...
