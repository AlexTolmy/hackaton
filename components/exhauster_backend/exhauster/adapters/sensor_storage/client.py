import datetime
import logging
import os
import time
from typing import Dict, List

import influxdb_client
from classic.components import component
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import ASYNCHRONOUS, SYNCHRONOUS

from exhauster.application.etl import interfaces


@component
class InfluxClient(interfaces.InfluxClient):
    token: str
    url: str
    org: str
    buket: str

    def __attrs_post_init__(self):
        self._logger = logging.getLogger(__name__)

    def _create_writer(self):
        client = InfluxDBClient(url=self.url, token=self.token, org=self.org)
        return client.write_api(write_options=SYNCHRONOUS)

    def _create_reader(self):
        client = InfluxDBClient(url=self.url, token=self.token, org=self.org)
        query_api = client.query_api()

        # query_api.query - табличный вид
        # query_api.query_stream - поток

    def load_raws(self, data: List[Dict]):
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
        self._logger.info('start loading data')
        writer = self._create_writer()
        import ipdb;ipdb.set_trace()
        writer.write(self.buket, self.org, data)
        self._logger.info('end loading data')
