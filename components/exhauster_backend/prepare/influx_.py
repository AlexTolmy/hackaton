import datetime
import os
import time

import influxdb_client
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS

token = os.environ.get("INFLUXDB_TOKEN")
org = "hackaton"
url = "http://159.65.113.87:8086"

client = InfluxDBClient(url=url, token=token, org=org)
write_api = client.write_api(write_options=SYNCHRONOUS)
query_api = client.query_api()

bucket = "test_load_1"

points = (
    # Point("my_measurement_2").tag('location', 'moscow').field("temperature", 26.6),
    # Point("my_measurement_1").tag('location',
    #                               'moscow').field("temperature",
    #                                               21.3).field("temp", 1)
)
# import ipdb;ipdb.set_trace()
# write_api.write(bucket=bucket, org=org, record=points)
# write_api.write()

# print("Complete. Return to the InfluxDB UI.")

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
tabels = query_api.query(
    f'from(bucket:"{bucket}")'
    f' |> range(start: -100d)'
    f' |> filter(fn: (r) => r._measurement == "vibration")'
    f' |> filter(fn: (r) => r._field == "warning_max")'
    f' |> filter(fn: (r) => r.breading == "8")'
    f' |> filter(fn: (r) => r.vibration_type == "axis")'
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

import csv

import signals


def create_point(signal, value_, time_):
    # import ipdb;ipdb.set_trace()
    point = Point(signal['measurement_name']
                  ).field(signal['field_name'], value_).time(time_)
    return point


points_prepare = []
with open('data.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        time_stemp = row['moment']

        for kafka_key in [i for i in row.keys()][1:]:
            current_value = row[kafka_key]
            signal_ = signals.signals.get(kafka_key)

            if signal_:
                save = {
                    "measurement": signal_['measurement'],
                    "tags": signal_['tags'],
                    "fields": {
                        signal_['field_name']: current_value
                    },
                    "time": time_stemp,
                }
                points_prepare.append(save)

print('asdasd')
write_api.write(bucket, org, points_prepare)
