from abc import ABC, abstractmethod

from predictor.service import ActualDataTable, Prediction


class PredictService(ABC):

    @abstractmethod
    def predict(self, actual_data: ActualDataTable) -> Prediction:
        ...
