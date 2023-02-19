from typing import List

from classic.components import component
from spectree import Response
from spectree.models import Tag

from exhauster.application import entities
from exhauster.application.dashboard import services

from .join_points import join_point
from .models import TestRequest, TestResponse
from .spec import spectree

tags = (Tag(name='заголовок'), )


@component
class Dashboard:

    service: services.ExhausterService

    @join_point
    @spectree.validate(tags=tags)
    def on_get_exshausters(self, request, response):

        exhausters: List[entities.Exhauster] = self.service.get_all()

        response.media = [
            {
                'number': exhauster.number,
                'aglomachine': exhauster.aglomachine.value,
                'name': exhauster.name,
                'is_active': exhauster.is_active,
                'rotor_name': exhauster.rotor.name,
                'rotor_last_change': exhauster.rotor.installed_at.isoformat(),
                'rotor_next_change': exhauster.rotor.stop_at.isoformat() if exhauster.rotor.stop_at else None,
                'sensors': list(self._sensors(exhauster))
            } for exhauster in exhausters
        ]

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

    @join_point
    @spectree.validate(
        query=TestRequest, resp=Response(HTTP_200=TestResponse), tags=tags
    )
    def on_post_error(self, request, response):
        self.information.get_error(**request.media)
