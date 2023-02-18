from classic.sql_storage import TransactionContext

# from kombu import Connection
from sqlalchemy import create_engine

from exhauster.adapters import kafka, log, sensor_storage
from exhauster.application.etl import services


class Settings:
    log = log.Settings()
    kafka = kafka.Settings()
    influx = sensor_storage.Settings()


class Logger:
    log.configure(Settings.log.LOGGING_CONFIG, Settings.kafka.LOGGING_CONFIG)


class Storage:
    influx = sensor_storage.InfluxClient(
        token=Settings.influx.TOKEN,
        url=Settings.influx.URL,
        org=Settings.influx.ORGANIZATION,
        buket=Settings.influx.BUCKET,
    )


class Application:
    etl = services.ETL(influx_client=Storage.influx)


consumer = kafka.create_consumer(
    topic=Settings.kafka.TOPIC,
    servers=[
        Settings.kafka.SERVERS,
    ],
    service=Application.etl,
    group_id=Settings.kafka.GROUP_ID,
    ssl_path_certificate=Settings.kafka.SSL_PATH_CERTIFICATE,
    user=Settings.kafka.USER,
    password=Settings.kafka.PASSWORD,
)

consumer()
