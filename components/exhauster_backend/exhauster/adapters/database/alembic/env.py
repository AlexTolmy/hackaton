from functools import partial
from logging.config import fileConfig

from alembic import context
from sqlalchemy import engine_from_config, pool

from exhauster.adapters.database import metadata

config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = metadata


def run_migrations_offline():
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        version_table_schema=target_metadata.schema,
        target_metadata=target_metadata,
        literal_binds=True,
        include_schemas=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    def check_schema(object, name, type_, reflected, compare_to, db_schema):
        return type_ == 'table' and object.schema == db_schema

    def include_name(name, type_, parent_names):
        if type_ == "schema":
            return name in [
                target_metadata.schema,
            ]
        else:
            return True

    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            include_schemas=True,
            include_object=partial(
                check_schema, db_schema=target_metadata.schema
            ),
            version_table_schema=target_metadata.schema,
            include_name=include_name,
            compare_type=True,
        )

        with context.begin_transaction():
            schema_exists = connection.execute(
                "select exists (select schema_name "
                "from information_schema.schemata "
                "where schema_name = 'app');"
            ).scalar()
            if not schema_exists:
                # TODO: сменить имя группы если нужно
                connection.execute(
                    'create schema app;'
                    'grant all privileges on schema app '
                    'to group "backend";'
                )
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
