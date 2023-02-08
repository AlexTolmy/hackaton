from pydantic import BaseSettings


class Settings(BaseSettings):
    DB_USER_NAME: str = 'postgres'
    DB_PASSWORD: str = '1234'
    DB_HOST: str = 'localhost'
    DB_NAME: str = 'classic_db'

    @property
    def DB_URL(self):
        return (f'postgresql+psycopg2://'
                f'{self.DB_USER_NAME}:'
                f'{self.DB_PASSWORD}@{self.DB_HOST}/{self.DB_NAME}')