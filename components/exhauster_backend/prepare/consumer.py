host = 'rc1a-b5e65f36lm3an1d5.mdb.yandexcloud.net:9091'
topic = 'zsmk-9433-dev-01'
user = '9433_reader'
password = 'eUIpgWu0PWTJaTrjhjQD3.hoyhntiK'

SASL_MECHANISM = 'SCRAM-SHA-512'
SASL_SSL = 'SASL_SSL'
from datetime import datetime
from typing import Any, Dict
from kafka import KafkaConsumer
import json
import pandas as pd

x = 0
start_time = datetime.now()


def deserializer(value: bytes) -> Dict[str, Any]:
    global x
    x += 1
    print('%d: %s' % (x, datetime.now() - start_time))
    return json.loads(value.decode('utf-8'))


consumer = KafkaConsumer(
    topic,
    bootstrap_servers=host,
    security_protocol=SASL_SSL,
    sasl_mechanism=SASL_MECHANISM,
    sasl_plain_username=user,
    sasl_plain_password=password,
    enable_auto_commit=False,
    auto_offset_reset='earliest',
    ssl_cafile="data/CA.pem",
    ssl_check_hostname=False,
    group_id='best_team_et',
    value_deserializer=deserializer,
    consumer_timeout_ms=10 * 1000
)

print('ready')

df = pd.DataFrame([message.value for message in consumer])

df.to_csv('data/data.csv', index=False)
