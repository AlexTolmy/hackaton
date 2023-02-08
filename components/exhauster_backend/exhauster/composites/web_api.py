from sqlalchemy import create_engine

from classic.sql_storage import TransactionContext
from classic.messaging_kombu import KombuPublisher
from kombu import Connection

from exhauster.adapters import log, settings
from exhauster.application.dashboard import services
from exhauster.adapters import database, message_bus, shop_api, mail_sending

class Settings:
    db = database.Settings()
    common_settings = settings.Settings()


class Logger:
    log.configure(
        Settings.db.LOGGING_CONFIG,
    )

class DB:
    db = database

    settings = db.Settings()
    # import ipdb;ipdb.set_trace()
    engine = create_engine(settings.DB_URL)
    db.metadata.create_all(engine)

    context = TransactionContext(bind=engine, expire_on_commit=False)

    customers_repo = db.repositories.CustomersRepo(context=context)
    products_repo = db.repositories.ProductsRepo(context=context)
    carts_repo = db.repositories.CartsRepo(context=context)
    orders_repo = db.repositories.OrdersRepo(context=context)


class MessageBus:
    settings = message_bus.Settings()
    connection = Connection(settings.BROKER_URL)
    message_bus.broker_scheme.declare(connection)

    publisher = KombuPublisher(
        connection=connection,
        scheme=message_bus.broker_scheme,
    )


class MailSending:
    sender = mail_sending.FileMailSender()


class Application:
    catalog = services.Catalog(products_repo=DB.products_repo)
    checkout = services.Checkout(
        customers_repo=DB.customers_repo,
        products_repo=DB.products_repo,
        carts_repo=DB.carts_repo,
        orders_repo=DB.orders_repo,
        publisher=MessageBus.publisher,
    )
    orders = services.Orders(
        orders_repo=DB.orders_repo,
        mail_sender=MailSending.sender,
    )
    customers = services.Customers(
        customers_repo=DB.customers_repo
    )


class Aspects:
    services.join_points.join(DB.context)
    shop_api.join_points.join(MessageBus.publisher, DB.context)


app = shop_api.create_app(
    catalog=Application.catalog,
    checkout=Application.checkout,
    orders=Application.orders,
    customers=Application.customers,
)
