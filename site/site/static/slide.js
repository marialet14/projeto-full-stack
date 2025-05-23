let prislide = 0;
const listaslide = document.querySelectorAll('.slide');
const bol = document.querySelectorAll('.bol');

function mostraslide(numslide) {
  listaslide.forEach(slide => slide.classList.remove('ativo'));
  bol.forEach(bolinha => bolinha.classList.remove('ativo'));


  listaslide[numslide].classList.add('ativo');
  bol[numslide].classList.add('ativo');
  prislide = numslide;
}

function proxslide() {
  let numslide = (prislide + 1) % listaslide.length;
  mostraslide(numslide);
}

setInterval(proxslide, 5000);

function mudaslide(numslide) {
  mostraslide(numslide);
}



//crud, conectar com o backend, mandar salvar 
//localStorage - listar tarefas - pegar os dados no backend