import sqlalchemy as db
import os

database_file = 'produtos.db'
engine = db.create_engine(f'sqlite:///{database_file}')
conn = engine.connect()
metadata = db.MetaData()


produtos = db.Table(
    'produtos', metadata,
    db.Column('id', db.Integer, primary_key=True, autoincrement=True),
    db.Column('nome', db.String(100), nullable=False),
    db.Column('preco', db.String(50), nullable=False)
)


metadata.create_all(engine)
