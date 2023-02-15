from classic.messaging_kombu import BrokerScheme
from kombu import Exchange, Queue

broker_scheme = BrokerScheme(
    Queue('Signal', Exchange('ETL'), )
)
