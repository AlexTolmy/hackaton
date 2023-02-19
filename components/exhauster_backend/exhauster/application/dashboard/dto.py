from datetime import datetime
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