
let produtos = [];

function cadastrarProduto() {
  const nome = document.getElementById('nomeProduto').value;
  const preco = document.getElementById('precoProduto').value;

  if (!nome || !preco) {
    alert('Por favor, preencha todos os campos');
    return;
  }


  const produto = { nome, preco };
  produtos.push(produto);


  document.getElementById('nomeProduto').value = '';
  document.getElementById('precoProduto').value = '';


  listarProdutos();
}


function editarProduto(index) {
  const nome = prompt('Novo nome:', produtos[index].nome);
  const preco = prompt('Novo preço:', produtos[index].preco);

  if (nome && preco) {
    produtos[index].nome = nome;
    produtos[index].preco = preco;
    listarProdutos();
  }
}


function excluirProduto(index) {
  if (confirm('Tem certeza que deseja excluir este produto?')) {
    produtos.splice(index, 1); 
    listarProdutos();
  }
}

function listarProdutos() {
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
