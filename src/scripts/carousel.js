function loadCarouselDOM() {
  const carouselList = document.querySelectorAll('.main-carousel');

  carouselList.forEach((carousel) => {
    const childs = carousel.querySelectorAll('.carousel-cell');
    const rightButton = carousel.querySelector('.rightButton');
    const leftButton = carousel.querySelector('.leftButton');

    rightButton.addEventListener('click', () => {
      changeElement(carousel, 'right', childs.length, Number(carousel.dataset.active), childs, rightButton, leftButton)
    })

    leftButton.addEventListener('click', (e) => {
      changeElement(carousel, 'left', childs.length, Number(carousel.dataset.active), childs, rightButton, leftButton)
    })
  })
}

function changeElement(carouselRef, direction, maxItems, currentItem, childs) {
  let visibleItems;
  const width = document.body.clientWidth;
  let updatedCurrentItem = currentItem

  // DEFINE A QUANTIDADE DE ELEMENTOS VISÍVEIS NA TELA
  if (width >= 1800) {
    visibleItems = 5;
  } else if (width >= 1440) {
    visibleItems = 4;
  } else if (width >= 1148) {
    visibleItems = 3;
  } else if (width >= 800) {
    visibleItems = 2;
  } else {
    visibleItems = 1;
  }

  // Atualiza o índice do elemento com base na direção
  if (direction === 'left') {
    updatedCurrentItem -= visibleItems;
  } else {
    updatedCurrentItem += visibleItems;
  }
  
  // Lida com os casos de ultrapassagem dos limites do carrossel
  if (updatedCurrentItem >= maxItems) {
    updatedCurrentItem = 0;
  }
  
  if (updatedCurrentItem < 0) {
    if (visibleItems >= 4) {
      updatedCurrentItem = visibleItems;
    } else {
      updatedCurrentItem = maxItems - 1;
    }
  }

  carouselRef.setAttribute('data-active', updatedCurrentItem)
  childs[updatedCurrentItem].scrollIntoView({
    inline: 'start',
    block: 'nearest',
    behavior: 'smooth'
  });
  // DEBUG
  // console.log(`
  //   Direction: ${direction}
  //   MaxItems: ${maxItems}
  //   CurrentItem: ${currentItem}
  //   UpdatedCurrentItem: ${updatedCurrentItem}
  //   CarouselRef: ${carouselRef}
  //   Childs: ${childs}
  //   Width: ${width}
  // `)
}

export default loadCarouselDOM;