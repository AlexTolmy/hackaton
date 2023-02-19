from datetime import datetime
from typing import List, Optional

import attr
from classic.app import DTO


class VibrationValue(DTO):
    moment: datetime
    value: float
    bearing_id: int
    vibration_type: str
    field_name: str


class ActualDataTable(DTO):
    exhauster_id: int    # номер эксгаустера
    data: List[VibrationValue]


class Prediction(DTO):
    exhauster_id: int
    stop_at: datetime
    created_at: Optional[datetime]


@attr.dataclass
class Rotor:
    exhauster_number: str
    installed_at: datetime
