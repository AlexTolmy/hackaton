"""Added initial table

Revision ID: 510ad9936a96
Revises: 
Create Date: 2023-02-18 07:40:10.738737+00:00

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = '510ad9936a96'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        'exhausters',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('number', sa.Integer(), nullable=False),
        sa.Column(
            'name',
            sa.String(length=255),
            nullable=False,
            comment='Имя эксгаустера.'
        ),
        sa.Column('is_active', sa.Boolean(), nullable=False),
        sa.PrimaryKeyConstraint('id', name=op.f('pk_exhausters')),
        sa.UniqueConstraint('name', name=op.f('uq_exhausters_name')),
        schema='app'
    )
    op.create_table(
        'rotors',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('name', sa.String(length=150), nullable=False),
        sa.PrimaryKeyConstraint('id', name=op.f('pk_rotors')),
        sa.UniqueConstraint('name', name=op.f('uq_rotors_name')),
        schema='app'
    )
    op.create_table(
        'rotors_prediction',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('stop_at', sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint('id', name=op.f('pk_rotors_prediction')),
        schema='app'
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('rotors_prediction', schema='app')
    op.drop_table('rotors', schema='app')
    op.drop_table('exhausters', schema='app')
    # ### end Alembic commands ###
