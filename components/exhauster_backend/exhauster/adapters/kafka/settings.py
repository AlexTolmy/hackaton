from pydantic import BaseSettings


class Settings(BaseSettings):
    SERVERS: str
    TOPIC: str
    GROUP_ID: str
    PASSWORD: str
    SSL_PATH_CERTIFICATE: str
    USER: str

    LOGGING_LEVEL: str = 'INFO'

    @property
    def LOGGING_CONFIG(self):
        return {
            'loggers': {
                'kafka': {
                    'handlers': ['default'],
                    'level': self.LOGGING_LEVEL,
                    'propagate': False
                }
            }
        }

    class Config:
        env_prefix = 'KAFKA_'
