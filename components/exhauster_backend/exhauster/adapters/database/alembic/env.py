from functools import partial

from alembic import context
from sqlalchemy import engine_from_config, pool

from exhauster.adapters.database import metadata, APP_SCHEMA

config = context.config
target_metadata = metadata


def run_migrations_online():

    def check_schema(object, name, type_, reflected, compare_to, db_schema):
        return type_ == 'table' and object.schema == db_schema

    def include_name(name, type_, parent_names):
        if type_ == "schema":
            return name in [target_metadata.schema]
        else:
            return True

    connectable = config.attributes.get('connection', None)
    if connectable is None:
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
                f"where schema_name = '{APP_SCHEMA}');"
            ).scalar()
            group_pg = 'backend'
            if not schema_exists:
                # TODO: сменить имя группы если нужно
                connection.execute(
                    'create schema app;'
                    'grant all privileges on schema app '
                    f'to group "{group_pg}";'
                )
            group_exist = connection.execute(
                f"select exists "
                f"(select pg_roles.rolname from pg_roles "
                f"where pg_roles.rolname = '{group_pg}');"
            )
            if not group_exist:
                connection.execute(
                    f'CREATE GROUP {group_pg} WITH USER postgres;'
                )
            context.run_migrations()


run_migrations_online()
