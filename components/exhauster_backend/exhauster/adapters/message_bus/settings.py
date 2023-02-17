from pydantic import BaseSettings


class Settings(BaseSettings):
    HOST: str = 'localhost'
    PORT: str = '5672'
    USER: str = 'rabbit'
    PASS: str = 'rabbit'

    class Config:
        env_file_encoding = 'utf-8'
        env_prefix = 'BROKER_'

    @property
    def BROKER_URL(self) -> str:
        return (f'amqp://{self.USER}:{self.PASS}@'
                f'{self.HOST}:{self.PORT}/')
