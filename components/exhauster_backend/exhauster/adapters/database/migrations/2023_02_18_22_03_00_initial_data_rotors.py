"""initial_data_rotors

Revision ID: 18f540a9566c
Revises: ffe1d1d6afab
Create Date: 2023-02-18 22:03:00.762656+00:00

"""
import csv
import os
from datetime import datetime

import sqlalchemy as sa
from alembic import op
from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    MetaData,
    String,
    Table,
)
from sqlalchemy.sql import select

# revision identifiers, used by Alembic.
revision = '18f540a9566c'
down_revision = 'ffe1d1d6afab'
branch_labels = None
depends_on = None

APP_SCHEMA = 'app'

metadata = MetaData(schema=APP_SCHEMA)

data_path = os.path.dirname(__file__)
rotors_path = os.path.join(data_path, 'rotors.csv')

exhausters_table = Table(
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

rotors_table = Table(
    'rotors', metadata, Column('id', Integer, primary_key=True),
    Column('created_at', DateTime, nullable=False, default=datetime.utcnow),
    Column('installed_at', DateTime, nullable=False, ),
    Column(
        'name',
        String(length=150),
        nullable=False,
        unique=True,
    ), Column('exhauster_id', ForeignKey('exhausters.id'))
)


def upgrade():
    with open(rotors_path) as f:

        reader = csv.DictReader(f)
        conn = op.get_bind()
        rotor_values = []
        for rotor in reader:

            stmt = select(exhausters_table.c.id).where(
                exhausters_table.c.number == int(rotor['exhauster_number'])
            )
            exghauser_id = conn.execute(stmt).one().id
            rotor_values.append(
                {
                    'created_at': datetime.fromisoformat(rotor['created_at']),
                    'name': rotor['name'],
                    'exhauster_id': exghauser_id
                }
            )

        op.bulk_insert(rotors_table, rotor_values)


def downgrade():
    op.execute(rotors_table.delete())
