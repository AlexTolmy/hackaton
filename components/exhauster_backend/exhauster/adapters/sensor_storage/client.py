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

bucket = "test_alextolmy"

data = {
    "point1": {
        "location": "Klamath",
        "species": "bees",
        "count": 23,
    },
    "point2": {
        "location": "Portland",
        "species": "ants",
        "count": 30,
    },
    "point3": {
        "location": "Klamath",
        "species": "bees",
        "count": 28,
    },
    "point4": {
        "location": "Portland",
        "species": "ants",
        "count": 32,
    },
    "point5": {
        "location": "Klamath",
        "species": "bees",
        "count": 29,
    },
    "point6": {
        "location": "Portland",
        "species": "ants",
        "count": 40,
    },
}

for key in data:
    point = (
        Point("census").tag("location", data[key]["location"]
                            ).field(data[key]["species"], data[key]["count"]).field('sad', 1)
    )
    # import ipdb;ipdb.set_trace()
    write_api.write(bucket=bucket, org=org, record=point)

print("Complete. Return to the InfluxDB UI.")

tables = query_api.query(f'from(bucket:"{bucket}") |> range(start: -10m)')
# import ipdb;ipdb.set_trace()
for table in tables:
    print(table)
    for row in table.records:
        # import ipdb;ipdb.set_trace()
        print(row.get_value())
        print(row.get_field())
        print(row.values)
        print('='*10)
