from classic.sql_storage import TransactionContext
from sqlalchemy import create_engine

from exhauster.adapters import database, log, sensor_storage, settings, web_api
from exhauster.adapters.database import dashboard as dashboard_repos
from exhauster.application.dashboard import services


class Settings:
    db = database.Settings()
    common_settings = settings.Settings()
    web_api = web_api.Settings()
    influx = sensor_storage.Settings()


class Logger:
    log.configure(
        Settings.db.LOGGING_CONFIG,
        Settings.web_api.LOGGING_CONFIG,
    )


class DB:
    engine = create_engine(Settings.db.DATABASE_URL)
    context = TransactionContext(bind=engine, expire_on_commit=False)
    exhausters_repo = database.repositories.ExhausterRepo(context=context)
    rotor_repo = dashboard_repos.RotorRepo(context=context)


class Storage:
    influx = sensor_storage.InfluxClient(
        token=Settings.influx.TOKEN,
        url=Settings.influx.URL,
        org=Settings.influx.ORGANIZATION,
        buket=Settings.influx.BUCKET,
    )
    storage_db = sensor_storage.StorageDB(influxdb_client=influx)


class Application:
    exhausers_service = services.ExhausterService(
        exhausters_repo=DB.exhausters_repo,
        storage=Storage.storage_db,
        rotor_repo=DB.rotor_repo
    )
    graphic_service = services.GraphicService(
        exhausters_repo=DB.exhausters_repo, storage=Storage.storage_db
    )


class Aspects:
    services.join_points.join(DB.context)
    web_api.join_points.join(DB.context)


app = web_api.create_app(
    swagger_settings=Settings.web_api.SWAGGER,
    allow_origins=Settings.web_api.ALLOW_ORIGINS,
    exhauster_service=Application.exhausers_service,
    graphic_service=Application.graphic_service
)