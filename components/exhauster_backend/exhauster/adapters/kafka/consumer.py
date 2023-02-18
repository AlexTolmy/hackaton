import json
import logging
from typing import Any, Callable, List, Dict

from kafka import KafkaConsumer

def deserializer(value: bytes) -> Dict[str, Any]:
    return json.loads(value.decode('utf-8'))


API_VERSION_AUTO_TIMEOUT_MS = 20000
MAX_POLL_INTERVAL_MS = 86400000
SASL_MECHANISM: str = 'SCRAM-SHA-512'
SASL_SSL: str = 'SASL_SSL'

logger = logging.getLogger()


def create_consumer(
    topic: str,
    servers: List[str],
    service: Callable,
    group_id,
    ssl_path_certificate: str,
    user: str,
    password: str,
):

    def consume():
        consumer = KafkaConsumer(
            bootstrap_servers=servers,
            value_deserializer=deserializer,
            auto_offset_reset='earliest',
            api_version_auto_timeout_ms=API_VERSION_AUTO_TIMEOUT_MS,
            max_poll_interval_ms=MAX_POLL_INTERVAL_MS,
            security_protocol=SASL_SSL,
            sasl_mechanism=SASL_MECHANISM,
            ssl_check_hostname=False,
            ssl_cafile=ssl_path_certificate,
            sasl_plain_username=user,
            sasl_plain_password=password,
            group_id=group_id,
        )

        consumer.subscribe([topic])
        try:
            for record in consumer:
                if record.value:
                    service.run(record.value)
                    consumer.commit()
        except Exception:
            logger.exception('Unexpected error occurred')
        finally:
            consumer.close()

    return consume

