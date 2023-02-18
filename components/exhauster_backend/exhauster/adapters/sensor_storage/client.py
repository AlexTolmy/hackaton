import datetime
import os
import time

import influxdb_client
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS

token = os.environ.get("INFLUXDB_TOKEN")
org = "dev"
url = "https://eu-central-1-1.aws.cloud2.influxdata.com"

client = InfluxDBClient(url=url, token=token, org=org)
write_api = client.write_api(write_options=SYNCHRONOUS)
query_api = client.query_api()

bucket = "test"

points = (
    Point("my_measurement_2").tag('location', 'moscow').field("temperature", 25.3),
    Point("my_measurement_2").tag('location', 'moscow').field("temperature", 21.3),
)
    # import ipdb;ipdb.set_trace()
write_api.write(bucket=bucket, org=org, record=points)

print("Complete. Return to the InfluxDB UI.")

raws = query_api.query_stream(f'from(bucket:"{bucket}")'
                         f' |> range(start: -10m)'
                         f' |> filter(fn: (r) => r._measurement == "my_measurement_1")'
                         f' |> filter(fn: (r) => r._field == "temperature")'
                         # f' |> limit(n: 2)'


                         )

for raw in raws:
    print(raw.get_time())
    # import ipdb;ipdb.set_trace()
    # for row in table.records:
    #     # import ipdb;ipdb.set_trace()
    #     print(row.get_value())
    #     print(row.get_field())
    #     # print(row.values)
    #     print('=' * 10)
