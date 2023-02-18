from pydantic import BaseSettings


class Settings(BaseSettings):
    TOKEN: str
    ORGANIZATION: str
    URL: str
    BUCKET: str

    class Config:
        env_prefix = 'INFLUXDB_'
