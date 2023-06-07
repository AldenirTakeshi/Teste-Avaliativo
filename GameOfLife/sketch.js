const largura = 10;
const altura = 10;
const tamanhoCelula = 40;

let tabuleiroAtual;
let tabuleiroProximo;
let isJogando = false;
let intervalo;

function setup() {
  createCanvas(largura * tamanhoCelula, altura * tamanhoCelula);
  frameRate(10);

  tabuleiroAtual = criarTabuleiro();
  tabuleiroProximo = criarTabuleiro();
}

function draw() {
  background(255);
  desenharTabuleiro();

  if (isJogando && frameCount % 10 === 0) {
    atualizarTabuleiro();
  }
}

function mousePressed() {
  const coluna = Math.floor(mouseX / tamanhoCelula);
  const linha = Math.floor(mouseY / tamanhoCelula);

  if (coluna >= 0 && coluna < largura && linha >= 0 && linha < altura) {
    tabuleiroAtual[coluna][linha] = 1 - tabuleiroAtual[coluna][linha];
  }
}

function keyPressed() {
  if (key === " " || key) {
    if (isJogando) {
      clearInterval(intervalo);
    } else {
      intervalo = setInterval(atualizarTabuleiro, 100);
    }
    isJogando = !isJogando;
  }
}

function criarTabuleiro() {
  const tabuleiro = new Array(largura);
  for (let i = 0; i < largura; i++) {
    tabuleiro[i] = new Array(altura).fill(0);
  }
  return tabuleiro;
}

function desenharTabuleiro() {
  for (let i = 0; i < largura; i++) {
    for (let j = 0; j < altura; j++) {
      if (tabuleiroAtual[i][j] === 1) {
        fill(0);
      } else {
        fill(255);
      }
      rect(i * tamanhoCelula, j * tamanhoCelula, tamanhoCelula, tamanhoCelula);
    }
  }
}

function atualizarTabuleiro() {
  for (let i = 0; i < largura; i++) {
    for (let j = 0; j < altura; j++) {
      const estadoAtual = tabuleiroAtual[i][j];
      const vizinhos = contarVizinhos(i, j);

      if (estadoAtual === 1 && (vizinhos < 2 || vizinhos > 3)) {
        tabuleiroProximo[i][j] = 0;
      } else if (estadoAtual === 0 && vizinhos === 3) {
        tabuleiroProximo[i][j] = 1;
      } else {
        tabuleiroProximo[i][j] = estadoAtual;
      }
    }
  }

  const temp = tabuleiroAtual;
  tabuleiroAtual = tabuleiroProximo;
  tabuleiroProximo = temp;
}

function contarVizinhos(coluna, linha) {
  let totalVizinhos = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;

      const vizinhoColuna = (coluna + i + largura) % largura;
      const vizinhoLinha = (linha + j + altura) % altura;
      totalVizinhos += tabuleiroAtual[vizinhoColuna][vizinhoLinha];
    }
  }
  return totalVizinhos;
}
