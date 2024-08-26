/**
 * @description Armazena os IDs das cartas abertas durante o jogo. Inicialmente, é um array vazio.
 */
let cardsOpen = [];

/**
 * @description Função principal para manipulação de cliques no documento. 
 * É executada quando o documento é carregado.
 */
$(document).ready(function () {
  /**
   * @description Adiciona um evento de clique a cada elemento com a classe 'card'. 
   * Quando uma carta é clicada, a lógica a seguir é executada.
   */
  $(".card").click(function () {
    let CardId = $(this).attr("id"); // Obtém o ID da carta clicada
    const cardsNone = []; // Array vazio usado para redefinir o estado das cartas abertas

    /**
     * @description Limita o array 'cardsOpen' a um máximo de duas cartas abertas. 
     * Se o array tiver mais de duas cartas, remove a última carta adicionada.
     */
    if (cardsOpen.length > 2) {
      cardsOpen.pop();
    }

    /**
     * @description Se o número de cartas abertas for menor ou igual a 1, 
     * adiciona o ID da carta clicada ao array 'cardsOpen' e altera o estado da carta para 'virado'.
     */
    if (cardsOpen.length <= 1) {
      cardsOpen.push(CardId); // Adiciona o ID da carta clicada ao array 'cardsOpen'
      
      // Substitui a carta clicada por um novo div que representa a carta virada
      $(this).replaceWith(
        `<div card open${cardsOpen.length} class="virado" id="${CardId}" style="background-color:${
          deckId[CardId - 1].color
        }"><img src="src/${deckId[CardId - 1].imagem}" alt="card" width="100px" height="100px"></div>`
      );
    } else if (cardsOpen[1] != undefined) { // Verifica se há duas cartas abertas
      /**
       * @description Verifica se as duas cartas abertas são iguais. Se forem, 
       * remove as cartas abertas da interface.
       */
      if (cardsOpen[0] == cardsOpen[1]) {
        console.log("entrou");

        // Substitui as cartas viradas por um novo div que representa uma carta vazia (nenhuma carta)
        $(".virado").replaceWith(
          `<div nada class="no-card"><img src="src/nada.svg" alt="card" width="100px" height="100px"></div>`
        );
        cardsOpen = cardsNone; // Redefine o array de cartas abertas
      } else if (cardsOpen.length <= 2) { // Se as cartas abertas não forem iguais
        let cardsOpen2 = cardsOpen; // Armazena uma cópia do array 'cardsOpen'

        // Aguarda 1 segundo (1000 milissegundos) antes de desvirar as cartas
        $("[open1]")
          .delay(1000)
          .replaceWith(
            `<div card class="card" id="${cardsOpen2[0]}"><img src="src/nada.svg" alt="card" width="100px" height="100px"></div>`
          );
        $("[open2]")
          .delay(1000)
          .replaceWith(
            `<div card class="card" id="${cardsOpen2[1]}"><img src="src/nada.svg" alt="card" width="100px" height="100px"></div>`
          );

        cardsOpen = cardsNone; // Redefine o array de cartas abertas
        console.log(cardsOpen);
      }
    }

    // Exibe no console os IDs das cartas abertas e o comprimento atual do array 'cardsOpen'
    console.log(
      `CO1 = ${cardsOpen[0]}, CO2 = ${cardsOpen[1]}, length=${cardsOpen.length}`
    );
    console.log(cardsOpen);
  });
});
