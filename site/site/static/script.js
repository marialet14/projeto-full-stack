const apiURL = 'http://127.0.0.1:5000/produtos';

async function cadastrarProduto() {
  const nome = document.getElementById('nomeProduto').value;
  const preco = document.getElementById('precoProduto').value;

  if (!nome || !preco) {
    alert('Por favor, preencha todos os campos');
    return;
  }

  await fetch(apiURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, preco })
  });

  document.getElementById('nomeProduto').value = '';
  document.getElementById('precoProduto').value = '';
  listarProdutos();
}

async function listarProdutos() {
  const resposta = await fetch(apiURL);
  const produtos = await resposta.json();

  const lista = document.getElementById('listaProdutos');
  lista.innerHTML = '';

  produtos.forEach((produto) => {
    lista.innerHTML += `
      <li>${produto.nome} - R$ ${produto.preco}
        <button onclick="editarProduto(${produto.id})">Editar</button>
        <button onclick="excluirProduto(${produto.id})">Excluir</button>
      </li>
    `;
  });
}

async function editarProduto(id) {
  const nome = prompt('Novo nome:');
  const preco = prompt('Novo preço:');

  if (nome && preco) {
    await fetch(`${apiURL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, preco })
    });
    listarProdutos();
  }
}

async function excluirProduto(id) {
  if (confirm('Deseja excluir este produto?')) {
    await fetch(`${apiURL}/${id}`, {
      method: 'DELETE'
    });
    listarProdutos();
  }
}

listarProdutos();
