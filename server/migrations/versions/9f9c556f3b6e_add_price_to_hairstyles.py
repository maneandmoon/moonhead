"""Add price to hairstyles

Revision ID: 9f9c556f3b6e
Revises: 0b9cd94ebdaf
Create Date: 2024-09-27 14:43:51.549468

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9f9c556f3b6e'
down_revision = '0b9cd94ebdaf'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('hairstyles', schema=None) as batch_op:
        batch_op.add_column(sa.Column('price', sa.Float(), nullable=True))

    with op.batch_alter_table('moonphases', schema=None) as batch_op:
        batch_op.alter_column('image',
               existing_type=sa.VARCHAR(),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('moonphases', schema=None) as batch_op:
        batch_op.alter_column('image',
               existing_type=sa.VARCHAR(),
               nullable=True)

    with op.batch_alter_table('hairstyles', schema=None) as batch_op:
        batch_op.drop_column('price')

    # ### end Alembic commands ###
