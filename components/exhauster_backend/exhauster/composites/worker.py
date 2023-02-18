import logging

from classic.sql_storage import TransactionContext
from exhauster.adapters import database, message_bus
from exhauster.application.dashboard import services
from kombu import Connection
from sqlalchemy import create_engine

logging.basicConfig(level=logging.INFO)


class DB:
    db = database

    settings = db.Settings()

    engine = create_engine(settings.DB_URL)
    db.metadata.create_all(engine)

    context = TransactionContext(bind=engine, expire_on_commit=False)

    orders_repo = db.repositories.OrdersRepo(context=context)


class Application:
    orders = services.Orders(orders_repo=DB.orders_repo, )


class MessageBus:
    settings = message_bus.Settings()
    connection = Connection(settings.BROKER_URL)
    message_bus.broker_scheme.declare(connection)

    consumer = message_bus.create_consumer(connection, Application.orders)


MessageBus.consumer.run()
