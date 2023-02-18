from classic.messaging_kombu import KombuPublisher
from kombu import Connection

from exhauster.adapters import kafka, log, message_bus, sensor_storage
from exhauster.adapters.message_bus import broker_scheme
from exhauster.application.etl import services


class Settings:
    log = log.Settings()
    kafka = kafka.Settings()
    influx = sensor_storage.Settings()
    bus = message_bus.Settings()


class MessageBus:
    connection = Connection(Settings.bus.BROKER_URL)
    publisher = KombuPublisher(connection=connection, scheme=broker_scheme)
    broker_scheme.declare(connection)


class Logger:
    log.configure(Settings.log.LOGGING_CONFIG, Settings.kafka.LOGGING_CONFIG)


class DB:
    influx = sensor_storage.InfluxClient(
        token=Settings.influx.TOKEN,
        url=Settings.influx.URL,
        org=Settings.influx.ORGANIZATION,
        buket=Settings.influx.BUCKET,
    )
    storage = sensor_storage.StorageDB(influxdb_client=influx)


class Application:
    etl = services.ETL(influx_client=DB.influx, publisher=MessageBus.publisher)


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
