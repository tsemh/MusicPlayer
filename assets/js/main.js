let musicas = [
  {
    titulo:'Busy City',
    artista: 'TrackTribe',
    src: 'assets/music/Busy City - TrackTribe.mp3',
    img: 'assets/img/steven.jpg'
  },
  {
    titulo:'Commander Impulse',
    artista: 'DivKid',
    src: 'assets/music/Commander Impulse - DivKid.mp3',
    img: 'assets/img/jeremy.jpg'
  },
  {
    titulo:'Polymetric Juggling',
    artista: 'DivKid',
    src: 'assets/music/Polymetric Juggling - DivKid.mp3',
    img: 'assets/img/karl.jpg'
  },
  {
    titulo:'Rich in the 80s',
    artista: 'TDivKid',
    src: 'assets/music/Rich in the 80s - DivKid.mp3',
    img: 'assets/img/eberhard.jpg'
  },
];

let musica = document.querySelector('audio');
let indexMusica = 0;

let duracaoMusica = document.querySelector('.fim');
let imagem = document.querySelector('img');
let nomeMusica = document.querySelector('.description h2');
let nomeArtista = document.querySelector('.description i');

renderizarMusica(indexMusica);

// Eventos
document.querySelector('.botao-play').addEventListener('click', tocarMusica);

document.querySelector('.botao-pause').addEventListener('click', pausarMusica);

musica.addEventListener('timeupdate', atualizarBarra);

document.querySelector('.anterior').addEventListener('click', () => {
  indexMusica--;
  if (indexMusica < 0) {
      indexMusica = musicas.length;
  }
  renderizarMusica(indexMusica);
});

document.querySelector('.posterior').addEventListener('click', () => {
  indexMusica++;
  if (indexMusica > musicas.length){
      indexMusica = 0;
  }
  renderizarMusica(indexMusica);
});

// Funções
function renderizarMusica(index){
  musica.setAttribute('src', musicas[index].src);
  musica.addEventListener('loadeddata', () => {
      nomeMusica.textContent = musicas[index].titulo;
      nomeArtista.textContent = musicas[index].artista;
      imagem.src = musicas[index].img;
      duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
      tocarMusica();
  });
}

function tocarMusica(){
  musica.play();
  document.querySelector('.botao-pause').style.display = 'block';
  document.querySelector('.botao-play').style.display = 'none';
}

function pausarMusica(){
  musica.pause();
  document.querySelector('.botao-pause').style.display = 'none';
  document.querySelector('.botao-play').style.display = 'block';
}

function atualizarBarra(){
  let barra = document.querySelector('progress');
  barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
  let tempoDecorrido = document.querySelector('.inicio');
  tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}

function segundosParaMinutos(segundos){
  let campoMinutos = Math.floor(segundos / 60);
  let campoSegundos = segundos % 60;
  if (campoSegundos < 10){
      campoSegundos = '0' + campoSegundos;
  }

  return campoMinutos+':'+campoSegundos;
}
