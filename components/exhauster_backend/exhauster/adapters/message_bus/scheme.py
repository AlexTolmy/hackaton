from classic.messaging_kombu import BrokerScheme
from kombu import Exchange, Queue

ui_exchange = Exchange('ui_exchange')
broker_scheme = BrokerScheme(
    Queue(
        '',
        ui_exchange,
        no_declare=True,
    ),
)
