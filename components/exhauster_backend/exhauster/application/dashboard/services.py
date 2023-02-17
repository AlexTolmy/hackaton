from typing import List, Optional, Tuple

from classic.app import DTO, validate_with_dto
from classic.aspects import PointCut
from classic.components import component
from classic.messaging import Message, Publisher
from pydantic import validate_arguments

from . import interfaces
from .entities import Customer, InformationEntity
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
