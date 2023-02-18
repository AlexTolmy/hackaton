from abc import ABC, abstractmethod
from typing import Dict, List, Optional


class InfluxClient(ABC):

    @abstractmethod
    def load_raws(self, data: List[Dict]):
        ...
