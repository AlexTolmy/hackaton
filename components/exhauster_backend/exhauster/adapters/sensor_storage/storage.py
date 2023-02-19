from classic.components import component

from exhauster.application import entities, sensors
from exhauster.application.predictor.dto import VibrationValue

from exhauster.application.sensors import CoolerTypeTag, Measurement
from .client import InfluxClient


@component
class StorageDB:
    influxdb_client: InfluxClient
    start: str = '-2m'

    def get_vibrations(self, exhauster_id: str, bearing_id: str, start):
        query_api, bucket = self.influxdb_client.create_reader()

        exhauster_field_name = sensors.ExhausterTag.exhauster_1.value[0]
        vibration_type_name = sensors.VibrationTypeTag.axis.value[0]
        bearing_field_name = sensors.BearingTag.BEARING_1.value[0]

        rows = query_api.query_stream(
            f'from(bucket:"{bucket}")'
            f' |> range(start: -{start}h)'
            f' |> filter(fn: (r) => r._measurement == "vibration")'
            f' |> filter(fn: (r) => r.{exhauster_field_name} == "{exhauster_id}")'
            f' |> filter(fn: (r) => r.{bearing_field_name} == "{bearing_id}")'
        )
        result = []
        for row in rows:
            result.append(
                VibrationValue(
                    moment=row.get_time(),
                    value=row.get_value(),
                    bearing_id=bearing_id,
                    vibration_type=row.values.get(vibration_type_name),
                    field_name=row.get_field()
                )
            )
        return result

    def get_bearing_vibration(
        self, exhauster_id: str, bearing_id: str, vibration_type
    ) -> entities.ParamsSetpoint:
        query_api, bucket = self.influxdb_client.create_reader()

        exhauster_field_name = sensors.ExhausterTag.exhauster_1.value[0]
        vibration_type_name = sensors.VibrationTypeTag.axis.value[0]
        bearing_field_name = sensors.BearingTag.BEARING_1.value[0]

        rows = query_api.query_stream(
            f'from(bucket:"{bucket}")'
            f' |> range(start: {self.start})'
            f' |> filter(fn: (r) => r._measurement == "vibration")'
            f' |> filter(fn: (r) => r.{exhauster_field_name} == "{exhauster_id}")'
            f' |> filter(fn: (r) => r.{vibration_type_name} == "{vibration_type}")'
            f' |> filter(fn: (r) => r.{bearing_field_name} == "{bearing_id}")'
            f' |> last()'
        )

        result = {}
        for row in rows:
            result[row.values['_field']] = row.get_value()

        if result:
            if result.get('vibration'):
                result['value'] = result.pop('vibration')

        return entities.ParamsSetpoint(**result)

    def get_bearing_temperature(
        self,
        exhauster_id: str,
        bearing_id: str,
    ) -> entities.ParamsSetpoint:
        query_api, bucket = self.influxdb_client.create_reader()

        exhauster_field_name = sensors.ExhausterTag.exhauster_1.value[0]
        bearing_field_name = sensors.BearingTag.BEARING_1.value[0]

        rows = query_api.query_stream(
            f'from(bucket:"{bucket}")'
            f' |> range(start: {self.start})'
            f' |> filter(fn: (r) => r._measurement == "heating_temperature")'
            f' |> filter(fn: (r) => r.{exhauster_field_name} == "{exhauster_id}")'
            f' |> filter(fn: (r) => r.{bearing_field_name} == "{bearing_id}")'
            f' |> last()'
        )

        result = {}
        for row in rows:
            result[row.values['_field']] = row.get_value()

        if result:
            if result.get('temperature'):
                result['value'] = result.pop('temperature')

        return entities.ParamsSetpoint(**result)

    def get_cooler_temperature(
        self, exhauster_id: str, cooler_type: CoolerTypeTag
    ) -> entities.Temperature:
        """
            class CoolerTypeTag(Enum):
                oil = (cooler_type, 'oil')
                water = (cooler_type, 'water')
        """
        query_api, bucket = self.influxdb_client.create_reader()

        exhauster_field_name = sensors.ExhausterTag.exhauster_1.value[0]

        rows = query_api.query_stream(
            f'from(bucket:"{bucket}")'
            f' |> range(start: {self.start})'
            f' |> filter(fn: (r) => r._measurement == "{Measurement.cooler_temperature.value[1]}")'
            f' |> filter(fn: (r) => r.{exhauster_field_name} == "{exhauster_id}")'
            f' |> filter(fn: (r) => r.{cooler_type.value[0]} == "{cooler_type.value[1]}")'
            f' |> last()'
        )

        result = {}
        for row in rows:
            result[row.values['_field']] = row.get_value()
        if result:
            return entities.Temperature(
                after=result.pop('temperature_after'),
                before=result.pop('temperature_before')
            )

    def get_gas_collector_temperature(self, exhauster_id: str) -> float:
        query_api, bucket = self.influxdb_client.create_reader()
        exhauster_field_name = sensors.ExhausterTag.exhauster_1.value[0]
        measurement_name = Measurement.gas_collector_temperature.value[1]
        rows = query_api.query_stream(
            f'from(bucket:"{bucket}")'
            f' |> range(start: {self.start})'
            f' |> filter(fn: (r) => r._measurement == "{measurement_name}")'
            f' |> filter(fn: (r) => r.{exhauster_field_name} == "{exhauster_id}")'
            f' |> last()'
        )

        result = [row.get_value() for row in rows]

        if result:
            return result[0]

    def get_gas_collector_under_pressure(self, exhauster_id: str) -> float:
        """
        {'closed': 0.0, 'open': 1.0, 'underpressure': 752.3148803710938}
        digital / digital / analog
        """
        query_api, bucket = self.influxdb_client.create_reader()
        exhauster_field_name = sensors.ExhausterTag.exhauster_1.value[0]
        measurement_name = Measurement.gas_collector_underpressure.value[1]
        rows = query_api.query_stream(
            f'from(bucket:"{bucket}")'
            f' |> range(start: {self.start})'
            f' |> filter(fn: (r) => r._measurement == "{measurement_name}")'
            f' |> filter(fn: (r) => r.{exhauster_field_name} == "{exhauster_id}")'
            f' |> last()'
        )

        result = {}
        for row in rows:
            result[row.values['_field']] = row.get_value()

        if result:
            return result.pop('underpressure')

    def get_oil_system(self, exhauster_id: str) -> entities.OilSystem:
        query_api, bucket = self.influxdb_client.create_reader()

        exhauster_field_name = sensors.ExhausterTag.exhauster_1.value[0]
        measurement_name = Measurement.oil_system.value[1]

        rows = query_api.query_stream(
            f'from(bucket:"{bucket}")'
            f' |> range(start: {self.start})'
            f' |> filter(fn: (r) => r._measurement == "{measurement_name}")'
            f' |> filter(fn: (r) => r.{exhauster_field_name} == "{exhauster_id}")'
            f' |> last()'
        )

        result = {}
        for row in rows:
            result[row.values['_field']] = row.get_value()

        if result:
            return entities.OilSystem(
                level=result['oil_level'], pressure=result['oil_pressure']
            )

    def get_exhauster_is_work(self, exhauster_id: str) -> float:
        query_api, bucket = self.influxdb_client.create_reader()
        exhauster_field_name = sensors.ExhausterTag.exhauster_1.value[0]
        measurement_name = Measurement.work_exhauster.value[1]
        rows = query_api.query_stream(
            f'from(bucket:"{bucket}")'
            f' |> range(start: {self.start})'
            f' |> filter(fn: (r) => r._measurement == "{measurement_name}")'
            f' |> filter(fn: (r) => r.{exhauster_field_name} == "{exhauster_id}")'
            f' |> last()'
        )

        result = [row.get_value() for row in rows]
        if result:
            return bool(result[0])
        return False

    def get_graphics_vibrations(self, exhauster_id: str, bearing_id: str, start: None, stop: None):


        query_api, bucket = self.influxdb_client.create_reader()

        exhauster_field_name = sensors.ExhausterTag.exhauster_1.value[0]
        vibration_type_name = sensors.VibrationTypeTag.axis.value[0]
        bearing_field_name = sensors.BearingTag.BEARING_1.value[0]

        rows = query_api.query_stream(
            f'from(bucket:"{bucket}")'
            f' |> range(start: {start}, stop: {stop})'
            f' |> filter(fn: (r) => r._measurement == "vibration")'
            f' |> filter(fn: (r) => r.{exhauster_field_name} == "{exhauster_id}")'
            f' |> filter(fn: (r) => r.{bearing_field_name} == "{bearing_id}")'
            f' |> sort(columns: ["_time", )'
        )
        result = []
        for row in rows:
            result.append(
                VibrationValue(
                    moment=row.get_time(),
                    value=row.get_value(),
                    bearing_id=bearing_id,
                    vibration_type=row.values.get(vibration_type_name),
                    field_name=row.get_field()
                )
            )
            RawGraphicParams(

            )
        return result

    # def get_graphics_bearing_temperature(
    #     self,
    #     exhauster_id: str,
    #     bearing_id: str,
    #     start: None, stop: None
    # ) -> entities.ParamsSetpoint:
    #     if not start:
    #         start = int(round(datetime.utcnow().timestamp()))
    #     if not stop:
    #         stop_ = datetime.utcnow() - timedelta(10)
    #         stop = int(round(stop_.timestamp()))
    #
    #     query_api, bucket = self.influxdb_client.create_reader()
    #
    #     exhauster_field_name = sensors.ExhausterTag.exhauster_1.value[0]
    #     bearing_field_name = sensors.BearingTag.BEARING_1.value[0]
    #
    #     rows = query_api.query_stream(
    #         f'from(bucket:"{bucket}")'
    #         f' |> range(start: {start}, stop: {stop})'
    #         f' |> filter(fn: (r) => r._measurement == "heating_temperature")'
    #         f' |> filter(fn: (r) => r.{exhauster_field_name} == "{exhauster_id}")'
    #         f' |> filter(fn: (r) => r.{bearing_field_name} == "{bearing_id}")'
    #         f' |> last()'
    #     )
    #
    #     result = {}
    #     for row in rows:
    #         result[row.values['_field']] = row.get_value()
    #
    #     if result:
    #         if result.get('temperature'):
    #             result['value'] = result.pop('temperature')
    #
    #     return entities.ParamsSetpoint(**result)