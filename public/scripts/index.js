/**
 * @description Array que representa o baralho de cartas. Cada carta é um objeto que contém 
 * propriedades como id, nome, cor, imagem e descrição.
 */
const deck = [
  { id: 1, name: "Sapo", color: "#84CFFA", imagem: "src/frog.png", descricao: ["descricao 1", "descricao 2", "descricao 3"] },
  { id: 2, name: "Vaca", color: "#FA8484", imagem: "src/cow.png", descricao: ["descricao 1", "descricao 2", "descricao 3"] },
  { id: 3, name: "Canguru", color: "#E984FA", imagem: "src/kangaroo.png", descricao: ["descricao 1", "descricao 2", "descricao 3"] },
  { id: 4, name: "Leão", color: "#84FAAC", imagem: "src/lion.png", descricao: ["descricao 1", "descricao 2", "descricao 3"] },
  { id: 5, name: "Pássaro", color: "#8684FA", imagem: "src/bird.png", descricao: ["descricao 1", "descricao 2", "descricao 3"] },
  { id: 6, name: "Elefante", color: "#F7FA84", imagem: "src/elephant.png", descricao: ["descricao 1", "descricao 2", "descricao 3"] }
];

/** 
 * @description Seleciona todas as cartas no DOM e as armazena na variável 'cards'.
 */
const cards = document.querySelectorAll('.card');

/**
 * @description Estado inicial do jogo e variáveis de controle.
 * hasFlippedCard: Booleano para verificar se uma carta foi virada.
 * lockBoard: Booleano para bloquear o tabuleiro durante a verificação de cartas.
 * firstCard, secondCard: Variáveis para armazenar as cartas selecionadas.
 * movements: Contador para o número de movimentos feitos pelo jogador.
 * winCounter: Contador para o número de pares encontrados.
 */
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let movements = 0;
let winCounter = 0;

/**
 * @function flipCard
 * @description Função de callback para o evento de clique em uma carta. 
 * Controla a lógica de virar a carta e verifica se houve um par.
 */
function flipCard() {
  if (lockBoard) return; // Impede ações enquanto o tabuleiro está bloqueado
  if (this === firstCard) return; // Impede o clique na mesma carta duas vezes

  this.classList.add('flip'); // Adiciona a classe para virar a carta

  if (!hasFlippedCard) { // Verifica se é a primeira carta virada
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this; // Define a segunda carta virada
  checkForMatch(); // Chama a função para verificar se as cartas são iguais
}

/**
 * @function checkForMatch
 * @description Verifica se as duas cartas viradas são um par. Se forem, desabilita as cartas;
 * caso contrário, desvira as cartas após um breve atraso.
 */
function checkForMatch() {
  if (firstCard.dataset.nome !== secondCard.dataset.nome) {
    movements++; // Incrementa o contador de movimentos se as cartas não forem um par
    updateMovementDisplay(); // Atualiza o contador de movimentos na interface
    unflipCards(); // Desvira as cartas se não forem um par
  } else {
    winCounter++; // Incrementa o contador de vitórias
    disableCards(); // Desabilita as cartas se forem um par
    updateMovementDisplay(); // Atualiza o contador de movimentos na interface
    checkForWin(); // Verifica se o jogador venceu o jogo
  }
}

/**
 * @function updateMovementDisplay
 * @description Atualiza o número de movimentos na interface do usuário.
 */
function updateMovementDisplay() {
  document.getElementById("movimentos").textContent = movements;
  document.getElementById("movimentos2").textContent = movements;
}

/**
 * @function disableCards
 * @description Desabilita as cartas quando elas formam um par. Remove os event listeners 
 * de clique e reseta o estado do tabuleiro.
 */
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard(); // Reseta o estado do tabuleiro
}

/**
 * @function unflipCards
 * @description Desvira as cartas após um breve atraso se não forem um par.
 * Bloqueia o tabuleiro durante o atraso para evitar cliques adicionais.
 */
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

/**
 * @function resetBoard
 * @description Reseta as variáveis de controle do jogo para o estado inicial.
 */
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

/**
 * @function checkForWin
 * @description Verifica se o jogador encontrou todos os pares. Se sim, exibe a tela de vitória.
 */
function checkForWin() {
  if (winCounter === deck.length / 2) { // Verifica se todos os pares foram encontrados
    setTimeout(() => {
      document.querySelector('#vitoria').style.display = 'block';
      document.querySelector('#movimentosvitoria').textContent = movements;
    }, 1000);
  }
}

/**
 * @function shuffle
 * @description Embaralha as cartas no início do jogo.
 * Usando Immediately Invoked Function Expression (IIFE) para embaralhar quando o script é carregado.
 */
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12); // Gera uma posição aleatória para cada carta
    card.style.order = randomPos; // Define a ordem das cartas no CSS
  });
})();

/**
 * @description Adiciona evento de clique a todas as cartas. Cada clique chama a função flipCard.
 */
cards.forEach(card => card.addEventListener('click', flipCard));
