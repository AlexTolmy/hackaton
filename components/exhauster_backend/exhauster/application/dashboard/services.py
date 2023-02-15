from typing import List, Optional, Tuple

from classic.app import DTO, validate_with_dto
from classic.aspects import PointCut
from classic.components import component
from classic.messaging import Message, Publisher
from pydantic import validate_arguments

from . import interfaces
from .entities import InformationEntity, Customer
from .errors import TestError

join_points = PointCut()
join_point = join_points.join_point


class InformationDTO(DTO):
    text: str


@component
class AppInformation:

    @join_point
    @validate_with_dto
    def get_version(self, information: InformationDTO):
        return InformationEntity(id=1, text=information.text)

    def get_error(self, sku: str):
        raise TestError(sku=sku)


@component
class Customer:
    customer_repo: interfaces.CustomersRepo

    @join_point
    @validate_arguments
    def get_costumer(self, id_: int) -> Customer:
        customer = self.customer_repo.get_or_create(id_)
        return customer
