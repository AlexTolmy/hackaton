from abc import ABC, abstractmethod


class PredictService(ABC):

    @abstractmethod
    def predict(self, *arg, **kwargs):
        ...