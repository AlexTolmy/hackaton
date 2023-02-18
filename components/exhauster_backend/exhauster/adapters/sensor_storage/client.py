import logging
from typing import Dict, List

from classic.components import component
from influxdb_client import InfluxDBClient
from influxdb_client.client.write_api import SYNCHRONOUS

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

    def create_reader(self):
        client = InfluxDBClient(url=self.url, token=self.token, org=self.org)
        query_api = client.query_api()
        return query_api, self.buket
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
        writer.write(self.buket, self.org, data)
        self._logger.info('end loading data')
