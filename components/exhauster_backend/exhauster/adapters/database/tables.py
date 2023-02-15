from sqlalchemy import (
    Column,
    Float,
    ForeignKey,
    Integer,
    MetaData,
    String,
    Table,
)

naming_convention = {
    'ix': 'ix_%(column_0_label)s',
    'uq': 'uq_%(table_name)s_%(column_0_name)s',
    'ck': 'ck_%(table_name)s_%(constraint_name)s',
    'fk': 'fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s',
    'pk': 'pk_%(table_name)s'
}

APP_SCHEMA = 'app'
metadata = MetaData(schema=APP_SCHEMA, naming_convention=naming_convention)

customers = Table(
    'customers',
    metadata,
    Column('id', Integer, primary_key=True),
    Column('email', String),
)