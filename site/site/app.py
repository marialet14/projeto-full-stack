from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from database import engine, conn, produtos 
import sqlalchemy as db

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')  

@app.route('/produtos-page')
def produtos_page():
    return render_template('produtos.html')

@app.route('/produtos', methods=['GET'])
def listar_produtos():
    query = db.select(produtos)
    result = conn.execute(query)
    lista = [
        {'id': row.id, 'nome': row.nome, 'preco': row.preco}
        for row in result.fetchall()
    ]
    return jsonify(lista)


@app.route('/produtos', methods=['POST'])
def cadastrar_produto():
    dados = request.get_json()
    stmt = db.insert(produtos).values(
        nome=dados['nome'], preco=dados['preco']
    )
    with engine.begin() as conn_exec:
        conn_exec.execute(stmt)
    return jsonify({'mensagem': 'Produto cadastrado com sucesso'})


@app.route('/produtos/<int:id>', methods=['PUT'])
def editar_produto(id):
    dados = request.get_json()
    stmt = (
        db.update(produtos)
        .where(produtos.c.id == id)
        .values(nome=dados['nome'], preco=dados['preco'])
    )
    with engine.begin() as conn_exec:
        conn_exec.execute(stmt)
    return jsonify({'mensagem': 'Produto atualizado'})


@app.route('/produtos/<int:id>', methods=['DELETE'])
def excluir_produto(id):
    stmt = db.delete(produtos).where(produtos.c.id == id)
    with engine.begin() as conn_exec:
        conn_exec.execute(stmt)
    return jsonify({'mensagem': 'Produto excluído'})


if __name__ == '__main__':
    app.run(debug=True)
