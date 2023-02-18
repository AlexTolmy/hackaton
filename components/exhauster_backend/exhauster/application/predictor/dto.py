import attr
from datetime import datetime

@attr.dataclass
class Rotor:
    exhauster_number: str
    installed_at: datetime

@attr.dataclass
class Prediction:
    exhauster_number: str
    installed_at: datetime
    replace_days: int