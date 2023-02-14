import logging

from classic.sql_storage import TransactionContext
from kombu import Connection
from simple_shop.adapters import database, mail_sending, message_bus
from simple_shop.application import services
from sqlalchemy import create_engine

logging.basicConfig(level=logging.INFO)


class DB:
    db = database

    settings = db.Settings()

    engine = create_engine(settings.DB_URL)
    db.metadata.create_all(engine)

    context = TransactionContext(bind=engine, expire_on_commit=False)

    orders_repo = db.repositories.OrdersRepo(context=context)


class MailSending:
    sender = mail_sending.FileMailSender()


class Application:
    orders = services.Orders(
        orders_repo=DB.orders_repo,
        mail_sender=MailSending.sender,
    )


class MessageBus:
    settings = message_bus.Settings()
    connection = Connection(settings.BROKER_URL)
    message_bus.broker_scheme.declare(connection)

    consumer = message_bus.create_consumer(connection, Application.orders)


MessageBus.consumer.run()
