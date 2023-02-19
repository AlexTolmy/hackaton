from dataclasses import dataclass
from datetime import datetime
from enum import Enum
from typing import Dict, List, Optional, Sequence


class IndicatorState(Enum):
    DEFAULT = 'default'
    WARNING = 'warning'
    CRITICAL = 'critical'
    NODATA = 'nodata'


class IndicatorVariant(Enum):
    TEMPERATUE = 'temperature'
    VIBRATION = 'vibration'
    OIL = 'oil'


STATE_PRIORITET = {
    IndicatorState.CRITICAL: 3,
    IndicatorState.WARNING: 2,
    IndicatorState.DEFAULT: 1,
    IndicatorState.NODATA: 0
}


@dataclass
class ParamsSetpoint:
    value: Optional[float] = None
    alarm_max: Optional[float] = None
    alarm_min: Optional[float] = None
    warning_max: Optional[float] = None
    warning_min: Optional[float] = None

    @property
    def state(self) -> IndicatorState:

        if self.value is None:
            return IndicatorState.NODATA

        if self.value <= self.alarm_min or self.value >= self.alarm_max:
            return IndicatorState.CRITICAL
        elif self.value <= self.warning_min or self.value >= self.warning_max:
            return IndicatorState.WARNING
        else:
            return IndicatorState.DEFAULT


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

    @property
    def indicators(self) -> Sequence['Indicator']:

        yield Indicator(
            variant=IndicatorVariant.TEMPERATUE,
            state=self.temperature_sensor.state
        )

        indicators = (
            self.vibration_axis, self.vibration_horizontal,
            self.vibration_horizontal
        )

        if any(indicators):

            indicators = filter(None, indicators)

            point = sorted(
                indicators,
                key=lambda x: STATE_PRIORITET[x.state],
                reverse=True
            )[0]

            yield Indicator(
                variant=IndicatorVariant.VIBRATION, state=point.state
            )


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

    @property
    def indicators(self) -> Sequence['Indicator']:
        yield Indicator(
            variant=IndicatorVariant.OIL, state=IndicatorState.DEFAULT
        )


@dataclass
class MainDriveParams:
    current: float
    voltage: float


class MainDrive:
    rotor: MainDriveParams
    stator: MainDriveParams


class Aglomachine(Enum):
    AGLOMACHINE_1 = '1'
    AGLOMACHINE_2 = '2'
    AGLOMACHINE_3 = '3'


@dataclass
class Indicator:
    variant: IndicatorVariant
    state: IndicatorState


@dataclass
class Sensor:
    name: str
    indicators: Sequence[Indicator]


@dataclass
class Rotor:
    name: str
    installed_at: datetime
    stop_at: datetime


@dataclass
class Exhauster:
    id: int
    name: str
    number: str
    aglomachine: Aglomachine
    bearing: List[Bearing]
    cooler: Cooler
    gas_collector: GasCollector
    is_active: bool
    gate_position: bool
    main_drive: MainDrive
    oil_system: OilSystem
    rotor: Rotor

    @property
    def sensors(self) -> Sequence[Sensor]:

        for bearing in self.bearing:
            yield Sensor(
                name=f'№ {bearing.name} п-к',
                indicators=list(bearing.indicators)
            )

        yield Sensor(
            name='Уровень масла', indicators=list(self.oil_system.indicators)
        )
