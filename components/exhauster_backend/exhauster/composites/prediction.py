import logging

from classic.sql_storage import TransactionContext
from sqlalchemy import create_engine

from exhauster.adapters import sensor_storage
from exhauster.application.predictor import service

logging.basicConfig(level=logging.INFO)


class Settings:
    db = sensor_storage.Settings()
    influx = sensor_storage.Settings()


class DB:

    engine = create_engine(Settings.db.DATABASE_URL)
    context = TransactionContext(bind=engine, expire_on_commit=False)
    rotor_repo = ...
    predictions_repo = ...

class Storage:
    influx = sensor_storage.InfluxClient(
        token=Settings.influx.TOKEN,
        url=Settings.influx.URL,
        org=Settings.influx.ORGANIZATION,
        buket=Settings.influx.BUCKET,
    )
    storage_db = sensor_storage.StorageDB(influxdb_client=influx)


class Application:
    predictor = service.Predictor(
        DB.rotor_repo, DB.predictions_repo, Storage.storage_db,
    )
