from pydantic import BaseSettings


class Settings(BaseSettings):
    TOKEN: str = 'localhost'
    ORGANIZATION: str = '5672'
    URL: str = 'rabbit'

    class Config:
        env_prefix = 'INFLUXDB'
