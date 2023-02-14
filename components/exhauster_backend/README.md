
запуск миграций
python -m exhauster.composites.alembic_runner upgrade head

Создать новую миграцию на основе изменений 

python -m exhauster.composites.alembic_runner upgrade head

Создание заготовка миграции 
python -m exhauster.composites.alembic_runner revision -m "create account table"

Автогенерация миграции
python -m exhauster.composites.alembic_runner revision --autogenerate -m "Added initial table"

Добавить пользователя в группу БД postgres
ALTER GROUP backend ADD USER username;

Запуск API 
gunicorn -b 127.0.0.1:8000 exhauster.composites.web_api:app --log-level='debug'

### Все необходимые переменные окружения находятся в файле .env.example