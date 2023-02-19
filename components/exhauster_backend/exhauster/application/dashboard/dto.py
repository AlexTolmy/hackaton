from datetime import datetime
from datetime import datetime
from typing import List, Dict, Any

import attr


@attr.dataclass
class Exhauster:
    id: int
    number: str
    name: str
    aglomachine: str


@attr.dataclass
class Rotor:
    installed_at: datetime
    name: str


# @attr.dataclass
# class RawGraphicParams:
#     moment:
#     value = row.get_value(),
#     bearing_id = bearing_id,
#     vibration_type = row.values.get(vibration_type_name),
#     field_name = row.get_field()


@attr.dataclass
class Indicator:
    name: str
    value: str = None


@attr.dataclass
class GrapicParams:
    exhauster_name: str
    exhauster_id: str
    sensor_name: str
    indicators: List[Indicator]
    chart_sensors: List[Any]
