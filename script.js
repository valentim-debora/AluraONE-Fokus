const html = document.querySelector('html')
const btnFoco = document.querySelector('.app__card-button--foco')
const btnCurto = document.querySelector('.app__card-button--curto')
const btnLongo = document.querySelector('.app__card-button--longo')
const img = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPausabt = document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const startPausaBtIcon = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')

const musica = new Audio('sons/luna-rise-part-one.mp3')
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3')
musica.loop = true

let tempoDecorridoEmSegundos = 1500
let intervaloId = null


musicaFocoInput.addEventListener('change', () => {
  if (musica.paused) {
    musica.play()
  } else {
    musica.pause()
  }
})

btnFoco.addEventListener('click', () => {
  tempoDecorridoEmSegundos = 1500
  alterarContexto('foco')
  btnFoco.classList.add('active')
})

btnCurto.addEventListener('click', () => {
  tempoDecorridoEmSegundos = 300
  alterarContexto('descanso-curto')
  btnCurto.classList.add('active')
})

btnLongo.addEventListener('click', () => {
  tempoDecorridoEmSegundos = 900
  alterarContexto('descanso-longo')
  btnLongo.classList.add('active')
})

function alterarContexto(contexto) {
  mostrarTempo()
  botoes.forEach(function (contexto) {
    contexto.classList.remove('active')
  })
  html.setAttribute('data-contexto', contexto)
  img.setAttribute('src', `/imagens/${contexto}.png`)
  switch (contexto) {
    case "foco":
      titulo.innerHTML = `
      Otimize sua produtividade,<br>
      <strong class="app__title-strong">mergulhe no que importa.</strong>
      `
      break;
    case "descanso-curto":
      titulo.innerHTML = `
      Que tal dar uma respirada?<br>
      <strong class="app__title-strong">Faça uma pausa curta!</strong>
      `
      break;
    case "descanso-longo":
      titulo.innerHTML = `
      Hora de voltar à superfície.<br>
      <strong class="app__title-strong">Faça uma pausa longa.</strong>
      `
      break;
    default:
      break;
  }
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    //audioTempoFinalizado.play()
    console.log('Tempo finalizado!')
    zerar()
    return
  }
  tempoDecorridoEmSegundos -= 1;
  // console.log('Temporizador: ' + tempoDecorridoEmSegundos)
  // console.log('Id: ' + intervaloId)
  mostrarTempo()
}

startPausabt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
  if (intervaloId) {
      audioPausa.play()
      zerar()
      return // early return -- circuit breaker
  }
  startPausaBtIcon.setAttribute('src', 'Imagens/pause.png')
  audioPlay.play()
  intervaloId = setInterval(contagemRegressiva, 1000)
  iniciarOuPausarBt.textContent = "Pausar"
}

function zerar() {
  clearInterval(intervaloId)
  startPausaBtIcon.setAttribute('src', 'Imagens/play_arrow.png')
  iniciarOuPausarBt.textContent = "Começar"
  intervaloId = null
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000)
  const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
  tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()