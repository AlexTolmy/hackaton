from dataclasses import dataclass
from enum import Enum
from typing import Optional, List


@dataclass
class ParamsSetpoint:
    value: float
    alarm_max: float
    alarm_min: float
    warning_max: float
    warning_min: float


@dataclass
class Vibration:
    axis: ParamsSetpoint
    vertical: ParamsSetpoint
    horizontal: ParamsSetpoint


@dataclass
class Bearing:
    id: int
    name: str
    temperature_sensor: ParamsSetpoint
    vibration_axis: Optional[ParamsSetpoint] = None
    vibration_horizontal: Optional[ParamsSetpoint] = None
    vibration_vertical: Optional[ParamsSetpoint] = None


@dataclass
class Temperature:
    after: float
    before: float


@dataclass
class Cooler:
    oil: Temperature
    water: Temperature


@dataclass
class GasCollector:
    temperature_before: float
    under_pressure_before: float


@dataclass
class OilSystem:
    level: float
    pressure: float


@dataclass
class MainDriveParams:
    current: float
    voltage: float


class MainDrive:
    rotor: MainDriveParams
    stator: MainDriveParams


@dataclass
class Exhauster:
    id: int
    name: str
    bearing: List[Bearing]
    cooler: Cooler
    gas_collector: GasCollector
    is_active: bool
    gate_position: bool
    main_drive: MainDrive
    oil_system: OilSystem
