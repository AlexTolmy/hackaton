from enum import Enum

measurement = '_measurement'


class Measurement(Enum):
    heating_temperature = (measurement, 'heating_temperature')
    gas_collector_temperature = (measurement, 'gas_collector_temperature')
    gas_collector_underpressure = (measurement, 'gas_collector_underpressure')
    main_drive = (measurement, 'main_drive')
    oil_system = (measurement, 'oil_system')
    vibration = (measurement, 'vibration')
    work_exhauster = (measurement, 'work_exhauster')
    cooler_temperature = (measurement, 'cooler_temperature')

    @property
    def param(self):
        return self.value[1]

    @property
    def avible_fields(self):
        if self.name == 'heating_temperature':
            pass
        elif self.name == 'gas_collector_temperature':
            pass
        elif self.name == 'gas_collector_underpressure':
            pass
        elif self.name == 'main_drive':
            pass
        elif self.name == 'vibration':
            pass
        elif self.name == 'work_exhauster':
            pass

        return None


class ExhausterTag(Enum):
    exhauster_1 = ('exhauster', '1')
    exhauster_2 = ('exhauster', '2')
    exhauster_3 = ('exhauster', '3')
    exhauster_4 = ('exhauster', '4')
    exhauster_5 = ('exhauster', '5')
    exhauster_6 = ('exhauster', '6')

    @property
    def param(self):
        return self.value[1]


# TODO: breading -> bearing
class BearingTag(Enum):
    BEARING_1 = ('breading', '1')
    BEARING_2 = ('breading', '2')
    BEARING_3 = ('breading', '3')
    BEARING_4 = ('breading', '4')
    BEARING_5 = ('breading', '5')
    BEARING_6 = ('breading', '6')
    BEARING_7 = ('breading', '7')
    BEARING_8 = ('breading', '8')
    BEARING_9 = ('breading', '9')

    @property
    def param(self):
        return self.value[1]

    @property
    def with_vibration(self) -> bool:
        return self in [
            BearingTag.BEARING_1.value[1],
            BearingTag.BEARING_2.value[1],
            BearingTag.BEARING_7.value[1],
            BearingTag.BEARING_8.value[1],
        ]


cooler_type = 'cooler_type'


class CoolerTypeTag(Enum):
    oil = (cooler_type, 'oil')
    water = (cooler_type, 'water')

    @property
    def param(self):
        return self.value[1]


type_main_drive = 'type_main_drive'


class TypeMainDriveTag(Enum):
    rotor = (type_main_drive, 'rotor')
    stator = (type_main_drive, 'stator')

    @property
    def param(self):
        return self.value[1]


vibration_type = 'vibration_type'


class VibrationTypeTag(Enum):
    axis = (vibration_type, 'axis')
    horizontal = (vibration_type, 'horizontal')
    vertical = (vibration_type, 'vertical')

    @property
    def param(self):
        return self.value[1]
