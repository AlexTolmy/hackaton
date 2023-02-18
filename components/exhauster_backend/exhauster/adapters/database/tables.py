from datetime import datetime
from exhauster.application import entities
from sqlalchemy import (
    Boolean, Column, DateTime, Float, ForeignKey, Integer, MetaData, String,
    Table, Enum
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

rotors = Table(
    'rotors', metadata, Column('id', Integer, primary_key=True),
    Column('created_at', DateTime, nullable=False, default=datetime.utcnow),
    Column(
        'name',
        String(length=150),
        nullable=False,
        unique=True,
    ), Column('exhauster_id', ForeignKey('exhausters.id'))
)

exhausters = Table(
    'exhausters', metadata, Column('id', Integer, primary_key=True),
    Column(
        'number',
        Integer,
        nullable=False,
    ),
    Column(
        'name',
        String(length=255),
        nullable=False,
        unique=True,
        comment='Имя эксгаустера.'
    ), Column('aglomachine', String(255))
)

rotors_prediction = Table(
    'rotors_prediction', metadata, Column('id', Integer, primary_key=True),
    Column(
        'created_at',
        DateTime,
        nullable=False,
        default=datetime.utcnow,
    ), Column(
        'stop_at',
        DateTime,
    ), Column('exhauster_id', ForeignKey('exhausters.id'))
)
