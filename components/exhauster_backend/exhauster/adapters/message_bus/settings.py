from pydantic import BaseSettings


class Settings(BaseSettings):
    HOST: str
    PORT: str
    USER: str
    PASS: str

    class Config:
        env_file_encoding = 'utf-8'
        env_prefix = 'BROKER_'

    @property
    def BROKER_URL(self) -> str:
        return (f'amqp://{self.USER}:{self.PASS}@'
                f'{self.HOST}:{self.PORT}/')
