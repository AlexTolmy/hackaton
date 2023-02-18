import logging
from typing import Dict, List, Optional, Tuple

from classic.app import DTO, validate_with_dto
from classic.aspects import PointCut
from classic.components import component
from classic.messaging import Message, Publisher
from pydantic import validate_arguments

from .interfaces import InfluxClient
from .signals import signals_mapper

join_points = PointCut()
join_point = join_points.join_point


@component
class ETL:
    influx_client: InfluxClient

    def __attrs_post_init__(self):
        self._logger = logging.getLogger(__name__)

    def run(self, message: Dict):
        """
        data_element = {
            "measurement": signal_['measurement'],
            "tags": signal_['tags'],
            "fields": {
                signal_['field_name']: current_value
            },
            "time": time_stemp,
        }
        """
        self._logger.info('start processing message')
        time_ = message.pop('moment')
        result = []
        for key, value in message.items():
            wrap = signals_mapper.get(key)
            if wrap:
                result.append(
                    {
                        'measurement': wrap['measurement'],
                        'tags': wrap['tags'],
                        'fields': {
                            wrap['field_name']: value,
                        },
                        'time': time_
                    }
                )
        self._logger.info('end processing message')

        if result:
            self.influx_client.load_raws(result)
        # self._logger.info(result)
        return None
