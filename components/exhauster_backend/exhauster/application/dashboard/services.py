import random
from typing import List, Optional, Tuple

from classic.app import DTO, validate_with_dto
from classic.aspects import PointCut
from classic.components import component
from classic.messaging import Message, Publisher
from pydantic import validate_arguments

from exhauster.application import entities, interfaces

from . import dto

join_points = PointCut()
join_point = join_points.join_point


@component
class ExhausterService:

    exhausters_repo: interfaces.ExhausterRepo

    @join_point
    def get_all(self) -> List[dto.Exhauster]:

        exchauster_dtos = self.exhausters_repo.all()

        exhausters = map(self._create_exhauster, exchauster_dtos)

        return exhausters

    def _create_exhauster(
        self, exhauster_dto: dto.Exhauster
    ) -> entities.Exhauster:

        return entities.Exhauster(
            id=exhauster_dto.id,
            name=exhauster_dto.name,
            number=int(exhauster_dto.number),
            aglomachine=entities.Aglomachine(exhauster_dto.aglomachine),
            bearing=list(self._create_bearing()),
            cooler=None,
            gas_collector=None,
            is_active=True,
            gate_position=True,
            main_drive=None,
            oil_system=entities.OilSystem(
                level=random.random() * 100, pressure=random.random() * 100
            )
        )

    def _create_bearing(self) -> entities.Bearing:

        yield entities.Bearing(
            id=1,
            name=1,
            temperature_sensor=self._create_random_setpoint(),
            vibration_axis=self._create_random_setpoint(),
            vibration_horizontal=self._create_random_setpoint(),
            vibration_vertical=self._create_random_setpoint(),
        )
        yield entities.Bearing(
            id=2,
            name=2,
            temperature_sensor=self._create_random_setpoint(),
            vibration_axis=self._create_random_setpoint(),
            vibration_horizontal=self._create_random_setpoint(),
            vibration_vertical=self._create_random_setpoint(),
        )

        for i in range(3, 7):
            yield entities.Bearing(
                id=i,
                name=i,
                temperature_sensor=self._create_random_setpoint(),
            )

        yield entities.Bearing(
            id=7,
            name=7,
            temperature_sensor=self._create_random_setpoint(),
            vibration_axis=self._create_random_setpoint(),
            vibration_horizontal=self._create_random_setpoint(),
            vibration_vertical=self._create_random_setpoint(),
        )

        yield entities.Bearing(
            id=8,
            name=8,
            temperature_sensor=self._create_random_setpoint(),
            vibration_axis=self._create_random_setpoint(),
            vibration_horizontal=self._create_random_setpoint(),
            vibration_vertical=self._create_random_setpoint(),
        )

        yield entities.Bearing(
            id=9,
            name=9,
            temperature_sensor=self._create_random_setpoint(),
        )

    def _create_random_setpoint(self) -> entities.ParamsSetpoint:

        return entities.ParamsSetpoint(
            value=random.randint(0, 100),
            alarm_min=random.randint(0, 10),
            alarm_max=random.randint(90, 100),
            warning_min=random.randint(10, 30),
            warning_max=random.randint(70, 90)
        )
