from dataclasses import dataclass
from enum import Enum
from typing import List, Union


class SignalType(Enum):
    DIGITAL: str = 'digital'
    ANALOG: str = 'analog'


# name = 'exhauster_3_bearing_1_vibration_horizontal',

@dataclass
class Tag:
    name: str
    value: str


@dataclass
class Signal:
    type: SignalType
    name: str
    active: bool
    comment: str
    place: str
    raw: str



mapper = {

}


@dataclass
class Sensor:
    name: str
    tags: List[Tag]
    value: Union[str, float, bool, int]