from typing import Optional

from pydantic import BaseSettings


class Settings(BaseSettings):
    DATABASE_USER: str
    DATABASE_PASSWORD: str
    DATABASE_HOST: str
    DATABASE_NAME: str
    DATABASE_PORT: Optional[int] = None

    ALEMBIC_SCRIPT_LOCATION: str = 'exhauster.adapters.database:alembic'
    ALEMBIC_VERSION_LOCATIONS: str = 'exhauster.adapters.database:migrations'

    ALEMBIC_MIGRATION_FILENAME_TEMPLATE: str = (
        '%%(year)d_'
        '%%(month).2d_'
        '%%(day).2d_'
        '%%(hour).2d_'
        '%%(minute).2d_'
        '%%(second).2d_'
        '%%(slug)s'
    )

    LOGGING_LEVEL: str = 'INFO'
    SA_LOGS: bool = False

    @property
    def DATABASE_URL(self):
        port_url = (
            'postgresql+psycopg2://{db_user}:{db_password}'
            '@{db_host}:{db_port}/{db_name}'
        )

        instance_url = (
            'postgresql+psycopg2://{db_user}:{db_password}'
            '@{db_host}/{db_name}'
        )
        url = port_url if self.DATABASE_PORT else instance_url

        return url.format(
            db_user=self.DATABASE_USER,
            db_password=self.DATABASE_PASSWORD,
            db_host=self.DATABASE_HOST,
            db_port=self.DATABASE_PORT,
            db_name=self.DATABASE_NAME
        )

    @property
    def LOGGING_CONFIG(self):
        config = {
            'loggers': {
                'alembic': {
                    'handlers': ['default'],
                    'level': self.LOGGING_LEVEL,
                    'propagate': False
                }
            }
        }

        if self.SA_LOGS:
            config['loggers']['sqlalchemy'] = {
                'handlers': ['default'],
                'level': self.LOGGING_LEVEL,
                'propagate': False
            }

        return config
