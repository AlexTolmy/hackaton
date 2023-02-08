from pydantic import BaseSettings


class Settings(BaseSettings):
    BROKER_HOST: str = 'localhost'
    BROKER_PORT: str = '5672'
    BROKER_USER: str = 'rabbit'
    BROKER_PASS: str = 'rabbit'

    class Config:
        env_file_encoding = 'utf-8'

    @property
    def BROKER_URL(self) -> str:
        return (
            f'amqp://{self.BROKER_USER}:{self.BROKER_PASS}@'
            f'{self.BROKER_HOST}:{self.BROKER_PORT}/'
        )
