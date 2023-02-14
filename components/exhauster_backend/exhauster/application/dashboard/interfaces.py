from abc import ABC, abstractmethod
from typing import List, Optional

# from .entities import

    # class CustomersRepo(ABC):
    #
    #     @abstractmethod
    #     def get_by_id(self, id_: int) -> Optional[Customer]:
    #         ...
    #
    #     @abstractmethod
    #     def add(self, customer: Customer):
    #         ...
    #
    #     def get_or_create(self, id_: Optional[int]) -> Customer:
    #         if id_ is None:
    #             customer = Customer()
    #             self.add(customer)
    #         else:
    #             customer = self.get_by_id(id_)
    #             if customer is None:
    #                 customer = Customer()
    #                 self.add(customer)
    #
    #         return customer
