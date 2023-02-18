from classic.components import component

from exhauster.application import entities, sensors
from exhauster.application.predictor.dto import VibrationValue

from .client import InfluxClient


@component
class StorageDB:
    influxdb_client: InfluxClient

    def get_vibrations(self, exhauster_id: str, bearing_id: str, start):
        query_api, bucket = self.influxdb_client.create_reader()

        exhauster_field_name = sensors.ExhausterTag.exhauster_1.value[0]
        vibration_type_name = sensors.VibrationTypeTag.axis.value[0]
        bearing_field_name = sensors.BearingTag.BEARING_1.value[0]

        rows = query_api.query_stream(
            f'from(bucket:"{bucket}")'
            f' |> range(start: {start})'
            f' |> filter(fn: (r) => r._measurement == "vibration")'
            f' |> filter(fn: (r) => r.{exhauster_field_name} == "{exhauster_id}")'
            f' |> filter(fn: (r) => r.{bearing_field_name} == "{bearing_id}")'
            f' |> last()'
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
            f' |> range(start: -10d)'
            f' |> filter(fn: (r) => r._measurement == "vibration")'
            f' |> filter(fn: (r) => r.{exhauster_field_name} == "{exhauster_id}")'
            f' |> filter(fn: (r) => r.{vibration_type_name} == "{vibration_type}")'
            f' |> filter(fn: (r) => r.{bearing_field_name} == "{bearing_id}")'
            f' |> last()'
        )

        prepare = {}
        for row in rows:
            prepare[row.values['_field']] = row.get_value()

        prepare['value'] = prepare.pop('vibration')

        return entities.ParamsSetpoint(**prepare)

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
            f' |> range(start: -10d)'
            f' |> filter(fn: (r) => r._measurement == "heating_temperature")'
            f' |> filter(fn: (r) => r.{exhauster_field_name} == "{exhauster_id}")'
            f' |> filter(fn: (r) => r.{bearing_field_name} == "{bearing_id}")'
            f' |> last()'
        )

        prepare = {}
        for row in rows:
            prepare[row.values['_field']] = row.get_value()

        prepare['value'] = prepare.pop('temperature')
        return entities.ParamsSetpoint(**prepare)
