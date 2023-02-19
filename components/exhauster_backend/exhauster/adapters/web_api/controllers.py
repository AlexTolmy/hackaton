from typing import List

from classic.components import component
from spectree import Response
from spectree.models import Tag

from exhauster.application import entities
from exhauster.application.dashboard import services

from .models import ExhausterRequest, LinesRequest
from .join_points import join_point
from .spec import spectree

tags = (Tag(name='заголовок'), )


@component
class Dashboard:

    service: services.ExhausterService

    @spectree.validate(tags=tags)
    def on_get_exhausters(self, request, response):

        exhausters: List[entities.Exhauster] = self.service.get_all()

        response.media = [
            {
                'number': exhauster.number,
                'aglomachine': exhauster.aglomachine.value,
                'name': exhauster.name,
                'is_active': exhauster.is_active,
                'rotor_name': exhauster.rotor.name,
                'rotor_last_change': exhauster.rotor.installed_at.isoformat(),
                'rotor_next_change': exhauster.rotor.stop_at.isoformat()
                if exhauster.rotor.stop_at else None,
                'sensors': list(self._sensors(exhauster))
            } for exhauster in exhausters
        ]

    @spectree.validate(query=ExhausterRequest, tags=tags)
    def on_get_exhauster(self, request, response):

        query: ExhausterRequest = request.context.query

        exhauster = self.service.get(number=query.number)

        response.media = {
            'name': exhauster.name,
            'psSensors': [
                self._one_sensor(bearing)
                for bearing in exhauster.bearing
                if self._one_sensor(bearing)
            ],
            'oreInput': {
                'gasTemp': {
                    'value': exhauster.gas_collector.temperature_before,
                    'state': 'default'
                },
                'discharge': exhauster.gas_collector.under_pressure_before,
                'dustLevel': '',
            },
            'smokePipeState': '',
            'oilTank': {
                'value': exhauster.oil_system.level,
                'state': 'default'
            },
            'cooler': {
                'oilTankTemp': exhauster.cooler.oil.after,
                'inputTemp': exhauster.cooler.oil.before,
                'outputTemp': exhauster.cooler.water.after,
                'mainDriveTemp': exhauster.cooler.water.before,
            },
            'mainDrive': {
                'oilPressure': {
                    'value': '',
                    'state': 'default'
                },
                'amperage': '',
                'engineAmperage': '',
                'rotorVoltage': '',
                'starterVoltage': '',
            },
        }

    def _one_sensor(self, bearing: entities.Bearing):

        res = {}
        if bearing.temperature_sensor:
            res['T'] = {
                'value': bearing.temperature_sensor.value,
                'state': bearing.temperature_sensor.state.value
            },
        if bearing.vibration_vertical:
            res['B'] = {
                'value': bearing.vibration_vertical.value,
                'state': bearing.vibration_vertical.state.value
            },
        if bearing.vibration_horizontal:
            res['G'] = {
                'value': bearing.vibration_horizontal.value,
                'state': bearing.vibration_horizontal.state.value
            },
        if bearing.vibration_axis:
            res['O'] = {
                'value': bearing.vibration_axis.value,
                'state': bearing.vibration_axis.state.value
            },

        return res

    def _sensors(self, exhauster: entities.Exhauster):

        for sensor in exhauster.sensors:
            yield {
                'name': sensor.name,
                'indicators': [
                    {
                        'variant': indicator.variant.value,
                        'state': indicator.state.value
                    } for indicator in sensor.indicators
                ]
            }


@component
class Graphics:
    service: services.GraphicService

    @join_point
    @spectree.validate(tags=tags)
    def on_get_sensors(self, request, response):
        self.service.get_sensors()
        return

    @join_point
    @spectree.validate(
        query=LinesRequest,
        tags=tags,
    )
    def on_post_lines(self, request, response):
        json_body: LinesRequest = request.context.json
        self.service.get_lines(**json_body.dict(exclude_none=False))

        return
