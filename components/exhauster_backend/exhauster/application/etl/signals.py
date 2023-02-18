from dataclasses import dataclass
from datetime import datetime
from enum import Enum
from typing import List, Union, Dict, Any


class SignalType(Enum):
    DIGITAL: str = 'digital'
    ANALOG: str = 'analog'


# name = 'exhauster_3_bearing_1_vibration_horizontal',
# {
#     'breading': {
#         'value': 1,
#         'node': {
#             'temp_warm': {
#                 'node': {
#                     'temp': {
#                         'value': 1
#                     },
#                     'setup': {
#                         'node':{
#                             'alarm_max': {
#                                 'value': 1
#                             }
#                         }
#                     }
#                 }
#             },
#             'comment': {
#                 'value': 'asdasdasd'
#             }
#         }
#     }
# }


@dataclass
class Tag:
    name: str


@dataclass
class Value:
    name: str


@dataclass
class Signal:
    type: SignalType
    measurment: str
    active: bool
    comment: str
    params: Dict[str, Any]
    value: List[Value]
    tags: List[Tag]


# эксгаустер
# Узел

mapper = {
    'place': Signal,
}
