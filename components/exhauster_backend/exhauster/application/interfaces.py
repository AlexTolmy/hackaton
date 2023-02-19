from abc import ABC, abstractmethod
from typing import List, Tuple

from exhauster.application.dashboard import dto as dashboard_dto
from exhauster.application.predictor import dto
from exhauster.application.dashboard import dto as dash_dto


class PredictService(ABC):

    @abstractmethod
    def predict(self, actual_data: dto.ActualDataTable) -> dto.Prediction:
        ...


class RotorRepo(ABC):

    @abstractmethod
    def get(self, exhauster_id: str) -> List[dto.Rotor]:
        ...

    @abstractmethod
    def get_10_failures(self, exhauster_id: str) -> \
        Tuple[List[dto.Rotor], List[dto.Prediction]]:
        # Возвращает даты последних 10 факт замен и всех предсказаний
        # с момента самой ранней факт. замены
        ...


class PredictionsRepo(ABC):

    @abstractmethod
    def save(
        self, prediction: dto.Prediction
    ):    # как вариант можно переделать на List[dto.Prediction] чтоб сохранять сразу все предсказания
        ...


class VibrationsRepo(ABC):

    @abstractmethod
    def get_vibrations(self, exhauster_id: str, bearing_id: str, start):

        ...


class ExhausterRepo(ABC):

    @abstractmethod
    def all(self) -> List[dashboard_dto.Exhauster]:
        ...

    @abstractmethod
    def get(self, number: str) -> dash_dto.Exhauster:
        ...
