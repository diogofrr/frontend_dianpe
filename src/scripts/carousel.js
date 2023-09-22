(function(){
  // Variável que rastreia o índice atual do elemento no carrossel
  let currentItem = 0;

  // Adiciona um ouvinte de evento de clique ao documento
  document.addEventListener('click', (e) => {
    // Se o clique foi no botão de seta direita, avance para o próximo elemento
    if (rightArrow){
      changeElement('right');
    }
    // Se o clique foi no botão de seta esquerda, volte para o elemento anterior
    else if (leftArrow) {
      changeElement('left');
    }
  });

  // Função para alterar o elemento atual com base na direção
  function changeElement(direction) {
    // Obtém todos os elementos do carrossel
    const items = document.querySelectorAll('.main-carousel');
    // Obtém o número total de elementos no carrossel
    const maxItems = items.length;

    console.log('currentItem: ' + currentItem + '- maxItems: ' + maxItems);

    // Atualiza o índice do elemento com base na direção
    if (direction === 'left') {
      currentItem--;
    } else {
      currentItem++;
    }

    // Lida com os casos de ultrapassagem dos limites do carrossel
    if (currentItem >= maxItems) {
      currentItem = 0;
    }

    if (currentItem < 0) {
      currentItem = maxItems - 1;
    }
  }

}())