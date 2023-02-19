"""initial_data

Revision ID: ffe1d1d6afab
Revises: 0b1b1e0625cf
Create Date: 2023-02-18 20:56:09.305446+00:00

"""
import csv
import os

import sqlalchemy as sa
from alembic import op
from sqlalchemy import Column, Integer, MetaData, String, Table
from sqlalchemy.sql import select

# revision identifiers, used by Alembic.
revision = 'ffe1d1d6afab'
down_revision = '0b1b1e0625cf'
branch_labels = None
depends_on = None
APP_SCHEMA = 'app'

metadata = MetaData(schema=APP_SCHEMA)

data_path = os.path.dirname(__file__)
exghauser_path = os.path.join(data_path, 'exhausters.csv')
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


def upgrade():

    with open(exghauser_path) as f:
        reader = csv.DictReader(f)

        values = list(reader)

        op.bulk_insert(exhausters_table, values)


def downgrade():

    op.execute(exhausters_table.delete())
