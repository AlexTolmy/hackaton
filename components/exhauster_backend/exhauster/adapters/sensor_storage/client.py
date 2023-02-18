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
    # Point("my_measurement_2").tag('location', 'moscow').field("temperature", 26.6),
    Point("my_measurement_1").tag('location', 'moscow').field("temperature", 21.3).field("temp",  1)
)
    # import ipdb;ipdb.set_trace()
# write_api.write(bucket=bucket, org=org, record=points)

print("Complete. Return to the InfluxDB UI.")

# raws = query_api.query_stream(f'from(bucket:"{bucket}")'
#                          f' |> range(start: -5m)'
#                          f' |> filter(fn: (r) => r._measurement == "my_measurement_2")'
#                          # f' |> filter(fn: (r) => r.location == "stprt")'
#                          # f' |> group(columns: ["location", "_measurement"])'
#                          f' |> limit(n: 1)'
#
#
#                          )
#  надо задвать условия по всем тегам
tabels = query_api.query(f'from(bucket:"{bucket}")'
                         f' |> range(start: -10h)'
                         # f' |> filter(fn: (r) => r._measurement == "my_measurement_2")'
                         # f' |> filter(fn: (r) => r._field == "temp")'
                         # f' |> filter(fn: (r) => r.location == "moscow")'
                         f' |> last()'
                         # f' |> sort(columns: ["location",], desc: false)'
                         # f' |> group(columns: ["location", "_measurement", ])'
                         # f' |> keep(columns: ["_field", "_value", "location"])'
                         # f' |> limit(n: 1)'
)
for table in tabels:
    for row in table.records:
        print(row)
        print('=' * 10)
# for raw in raws:
#     print(raw)
#     print('=' * 10)
