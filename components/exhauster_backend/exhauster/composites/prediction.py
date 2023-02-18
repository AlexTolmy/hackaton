import logging

from classic.sql_storage import TransactionContext
from sqlalchemy import create_engine

from exhauster.adapters import database, log, sensor_storage
from exhauster.application.predictor import service

logging.basicConfig(level=logging.INFO)


class Settings:
    storage = sensor_storage.Settings()
    db = database.Settings()
    log = log.Settings()


class Logger:
    log.configure(Settings.log.LOGGING_CONFIG, Settings.db.LOGGING_CONFIG)


class DB:
    engine = create_engine(Settings.db.DATABASE_URL)
    context = TransactionContext(bind=engine, expire_on_commit=False)
    rotor_repo = ...
    predictions_repo = ...


class Storage:
    influx = sensor_storage.InfluxClient(
        token=Settings.storage.TOKEN,
        url=Settings.storage.URL,
        org=Settings.storage.ORGANIZATION,
        buket=Settings.storage.BUCKET,
    )
    storage_db = sensor_storage.StorageDB(influxdb_client=influx)


class Application:
    predictor = service.Predictor(
        DB.rotor_repo,
        DB.predictions_repo,
        Storage.storage_db,
    )
