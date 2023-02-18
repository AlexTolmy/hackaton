from typing import List
from classic.components import component
from spectree import Response
from spectree.models import Tag

from exhauster.application.dashboard import services
from exhauster.application import entities

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
                'name': 'Эксгаустер Ф-172',
                'rotor_name': 'Ротор № 24',
                'rotor_last_change': '2023-02-13T10:00:00.00',
                'rotor_next_change': '2023-02-23T10:00:00.00',
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
