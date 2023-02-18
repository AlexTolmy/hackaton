from pydantic import BaseSettings


class Settings(BaseSettings):
    SERVERS: str
    TOPIC: str
    GROUP_ID: str
    PASSWORD: str
    SSL_PATH_CERTIFICATE: str

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

host = 'rc1a-b5e65f36lm3an1d5.mdb.yandexcloud.net:9091'
topic = 'zsmk-9433-dev-01'
user = '9433_reader'
password = 'eUIpgWu0PWTJaTrjhjQD3.hoyhntiK'