# from classic.messaging_kombu import KombuPublisher
from classic.sql_storage import TransactionContext

# from kombu import Connection
from sqlalchemy import create_engine

from exhauster.adapters import database, log, settings, web_api
from exhauster.application.dashboard import services


class Settings:
    db = database.Settings()
    common_settings = settings.Settings()
    web_api = web_api.Settings()


class Logger:
    log.configure(Settings.db.LOGGING_CONFIG, Settings.web_api.LOGGING_CONFIG)


class DB:

    engine = create_engine(Settings.db.DATABASE_URL)
    context = TransactionContext(bind=engine, expire_on_commit=False)
    # orders_repo = db.repositories.OrdersRepo(context=context)


# class MessageBus:
#     settings = message_bus.Settings()
#     connection = Connection(settings.BROKER_URL)
#     message_bus.broker_scheme.declare(connection)
#
#     publisher = KombuPublisher(
#         connection=connection,
#         scheme=message_bus.broker_scheme,
#     )


class Application:
    app_information = services.AppInformation()


class Aspects:
    services.join_points.join(DB.context)
    web_api.join_points.join(DB.context)


app = web_api.create_app(
    swagger_settings=Settings.web_api.SWAGGER,
    allow_origins=Settings.web_api.ALLOW_ORIGINS,
    app_information=Application.app_information,
)
