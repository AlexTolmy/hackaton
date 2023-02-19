import logging
from time import sleep

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
    rotor_repo = database.repositories.RotorRepo(context=context)
    predictions_repo = database.repositories.PredictionsRepo(context=context)


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
        rotor_repo=DB.rotor_repo,
        predictions_repo=DB.predictions_repo,
        vibration_repo=Storage.storage_db,
    )


if __name__ == '__main__':
    while True:
        for i in ['1', '2', '3', '4', '5', '6']:
            Application.predictor.predict(i)
        sleep(60 * 60)    # 1h
