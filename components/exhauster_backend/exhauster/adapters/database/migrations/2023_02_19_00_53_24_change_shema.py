"""change shema

Revision ID: e3b42ee43ead
Revises: 18f540a9566c
Create Date: 2023-02-19 00:53:24.334213+00:00

"""
import sqlalchemy as sa
from alembic import op

revision = 'e3b42ee43ead'
down_revision = '18f540a9566c'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column(
        'rotors',
        sa.Column('installed_at', sa.DateTime(), nullable=False),
        schema='app'
    )


def downgrade():
    op.drop_column('rotors', 'installed_at', schema='app')
