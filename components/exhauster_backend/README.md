
запуск миграций
python -m exhauster.composites.alembic_runner upgrade head

Создание заготовка миграции 
python -m exhauster.composites.alembic_runner revision -m "create account table"

Автогенерация миграции
python -m exhauster.composites.alembic_runner revision --autogenerate -m "Added initial table"

Добавить пользователя в группу БД postgres
ALTER GROUP backend ADD USER username;

### Все необходимые переменные окружения находятся в файле .env.example


Установка зависимостей

pip install -e ".[dev]"
pip install python_libs/spectree-1.0.3.tar.gz

#### Путь до документации:
`/apidoc/swagger`

Запуск проекта, проект моно запустить используюя deployment/docker-compose.yml

так же команды для локального запуска проекта:
python -m exhauster.composites.etl - etl
gunicorn -b 127.0.0.1:8001 exhauster.composites.web_api:app - api
python -m exhauster.composites.prediction - prediction service

так же для проекта требуется поднять rabbit и influx, бд postgress 

примеры переменных окружения лежат в .env.exaples