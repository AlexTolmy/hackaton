import random
from typing import List, Optional, Tuple

from classic.app import DTO, validate_with_dto
from classic.aspects import PointCut
from classic.components import component
from classic.messaging import Message, Publisher
from pydantic import validate_arguments

from exhauster.adapters import sensor_storage
from exhauster.application import entities, interfaces
from exhauster.application.sensors import VibrationTypeTag

from . import dto

join_points = PointCut()
join_point = join_points.join_point


class TEMPERATURE_SET_DEFAULT:
    ALARM_MAX = 75
    ALARM_MIN = 0
    WARN_MAX = 65
    WARN_MIN = 0


class VIBRATION_SET_DEFAULT:
    ALARM_MAX = 7.099999904632568
    ALARM_MIN = 0
    WARN_MAX = 4.5
    WARN_MIN = 0


@component
class ExhausterService:

    exhausters_repo: interfaces.ExhausterRepo
    storage: sensor_storage.StorageDB

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
            bearing=list(self._create_bearing(exhauster_dto.number)),
            cooler=None,
            gas_collector=None,
            is_active=True,
            gate_position=True,
            main_drive=None,
            oil_system=entities.OilSystem(
                level=random.random() * 100, pressure=random.random() * 100
            )
        )

    def _create_bearing(self, exhauster_number: str) -> entities.Bearing:

        bearing_number = '1'
        yield entities.Bearing(
            id=1,
            name=1,
            temperature_sensor=self._create_temp_point(
                exhauster_id=exhauster_number, bearing_id=bearing_number
            ),
            vibration_axis=self.storage.get_bearing_vibration(
                exhauster_id=exhauster_number,
                bearing_id=bearing_number,
                vibration_type='axis'
            ),
            vibration_horizontal=self.storage.get_bearing_vibration(
                exhauster_id=exhauster_number,
                bearing_id=bearing_number,
                vibration_type='horizontal'
            ),
            vibration_vertical=self.storage.get_bearing_vibration(
                exhauster_id=exhauster_number,
                bearing_id=bearing_number,
                vibration_type='vertical'
            ),
        )
        bearing_number = '2'
        yield entities.Bearing(
            id=2,
            name=2,
            temperature_sensor=self._create_temp_point(
                exhauster_id=exhauster_number, bearing_id=bearing_number
            ),
            vibration_axis=self._create_vibro_point(
                exhauster_id=exhauster_number,
                bearing_id=bearing_number,
                vibration_type='axis'
            ),
            vibration_horizontal=self._create_vibro_point(
                exhauster_id=exhauster_number,
                bearing_id=bearing_number,
                vibration_type='horizontal'
            ),
            vibration_vertical=self._create_vibro_point(
                exhauster_id=exhauster_number,
                bearing_id=bearing_number,
                vibration_type='vertical'
            ),
        )

        for i in range(3, 7):
            yield entities.Bearing(
                id=i,
                name=i,
                temperature_sensor=self._create_temp_point(
                    exhauster_id=exhauster_number, bearing_id=str(i)
                ),
            )

        bearing_number = '7'
        yield entities.Bearing(
            id=7,
            name=7,
            temperature_sensor=self._create_temp_point(
                exhauster_id=exhauster_number, bearing_id=bearing_number
            ),
            vibration_axis=self._create_vibro_point(
                exhauster_id=exhauster_number,
                bearing_id=bearing_number,
                vibration_type='axis'
            ),
            vibration_horizontal=self._create_vibro_point(
                exhauster_id=exhauster_number,
                bearing_id=bearing_number,
                vibration_type='horizontal'
            ),
            vibration_vertical=self._create_vibro_point(
                exhauster_id=exhauster_number,
                bearing_id=bearing_number,
                vibration_type='vertical'
            ),
        )

        bearing_number = '8'
        yield entities.Bearing(
            id=8,
            name=8,
            temperature_sensor=self._create_temp_point(
                exhauster_id=exhauster_number, bearing_id=bearing_number
            ),
            vibration_axis=self._create_vibro_point(
                exhauster_id=exhauster_number,
                bearing_id=bearing_number,
                vibration_type='axis'
            ),
            vibration_horizontal=self._create_vibro_point(
                exhauster_id=exhauster_number,
                bearing_id=bearing_number,
                vibration_type='horizontal'
            ),
            vibration_vertical=self._create_vibro_point(
                exhauster_id=exhauster_number,
                bearing_id=bearing_number,
                vibration_type='vertical'
            ),
        )

        bearing_number = '9'
        yield entities.Bearing(
            id=9,
            name=9,
            temperature_sensor=self._create_temp_point(
                exhauster_id=exhauster_number, bearing_id=bearing_number
            ),
        )

    # def _create_random_setpoint(self) -> entities.ParamsSetpoint:

    #     return entities.ParamsSetpoint(
    #         value=random.randint(0, 100),
    #         alarm_min=random.randint(0, 10),
    #         alarm_max=random.randint(90, 100),
    #         warning_min=random.randint(10, 30),
    #         warning_max=random.randint(70, 90)
    #     )

    def _create_temp_point(
        self, exhauster_id: str, bearing_id: str
    ) -> entities.ParamsSetpoint:

        point = self.storage.get_bearing_temperature(
            exhauster_id=exhauster_id, bearing_id=bearing_id
        )

        if point.alarm_max is None:
            point.alarm_max = TEMPERATURE_SET_DEFAULT.ALARM_MAX
        if point.alarm_min is None:
            point.alarm_min = TEMPERATURE_SET_DEFAULT.ALARM_MIN
        if point.warning_max is None:
            point.warning_max = TEMPERATURE_SET_DEFAULT.WARN_MIN
        if point.warning_min is None:
            point.warning_min = TEMPERATURE_SET_DEFAULT.WARN_MIN

        return point

    def _create_vibro_point(
        self, exhauster_id: str, bearing_id: str, vibration_type: str
    ) -> entities.ParamsSetpoint:

        point = self.storage.get_bearing_vibration(
            exhauster_id=exhauster_id,
            bearing_id=bearing_id,
            vibration_type=vibration_type
        )

        if point.alarm_max is None:
            point.alarm_max = VIBRATION_SET_DEFAULT.ALARM_MAX
        if point.alarm_min is None:
            point.alarm_min = VIBRATION_SET_DEFAULT.ALARM_MIN
        if point.warning_max is None:
            point.warning_max = VIBRATION_SET_DEFAULT.WARN_MIN
        if point.warning_min is None:
            point.warning_min = VIBRATION_SET_DEFAULT.WARN_MIN

        return point
