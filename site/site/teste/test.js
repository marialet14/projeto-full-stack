function cadastrarProduto() {
  const nome = document.getElementById('nomeProduto').value;
  const preco = document.getElementById('precoProduto').value;

  if (!nome || !preco) {
    alert('Por favor, preencha todos os campos');
    return;
  }

  let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
  const produto = { nome, preco };
  produtos.push(produto);
  localStorage.setItem('produtos', JSON.stringify(produtos));

  document.getElementById('nomeProduto').value = '';
  document.getElementById('precoProduto').value = '';
  listarProdutos();
}

function editarProduto(index) {
  let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
  const nome = prompt('Novo nome:', produtos[index].nome);
  const preco = prompt('Novo preço:', produtos[index].preco);

  if (nome && preco) {
    produtos[index].nome = nome;
    produtos[index].preco = preco;
    localStorage.setItem('produtos', JSON.stringify(produtos));
    listarProdutos();
  }
}

function excluirProduto(index) {
  if (confirm('Tem certeza que deseja excluir este produto?')) {
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.splice(index, 1);
    localStorage.setItem('produtos', JSON.stringify(produtos));
    listarProdutos();
  }
}

function listarProdutos() {
  let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
  const lista = document.getElementById('listaProdutos');
  lista.innerHTML = '';

  produtos.forEach((produto, index) => {
    lista.innerHTML += `
      <li>${produto.nome} - R$ ${produto.preco}
        <button onclick="editarProduto(${index})">Editar</button>
        <button onclick="excluirProduto(${index})">Excluir</button>
      </li>
    `;
  });
}

listarProdutos();
