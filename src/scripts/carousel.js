function loadCarouselDOM() {
  const carouselList = document.querySelectorAll('.main-carousel');

  carouselList.forEach((carousel) => {
    const childs = carousel.querySelectorAll('.carousel-cell');
    const rightButton = carousel.querySelector('.rightButton');
    const leftButton = carousel.querySelector('.leftButton');

    rightButton.addEventListener('click', () => {
      changeElement(carousel, 'right', childs.length, Number(carousel.dataset.active), childs)
    })

    leftButton.addEventListener('click', (e) => {
      changeElement(carousel, 'left', childs.length, Number(carousel.dataset.active), childs)
    })
  })
}

function changeElement(carouselRef, direction, maxItems, currentItem, childs) {
  let visibleItems;
  const width = document.body.clientWidth;
  let updatedCurrentItem = currentItem

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
    const backValue = updatedCurrentItem -= visibleItems;
    
    if (backValue <= maxItems) {
      visibleItems = maxItems - 1 
    } else {
      visibleItems = 0
    }
  } else {
    updatedCurrentItem += visibleItems;
  }
  
  // Lida com os casos de ultrapassagem dos limites do carrossel
  if (updatedCurrentItem >= maxItems) {
    updatedCurrentItem = 0;
  }
  
  if (updatedCurrentItem < 0) {
    updatedCurrentItem = maxItems - 1;
  }

  carouselRef.setAttribute('data-active', updatedCurrentItem)
  childs[updatedCurrentItem].scrollIntoView({
    inline: 'start',
    block: 'nearest',
    behavior: 'smooth'
  });

  console.log(`
    Direction: ${direction}
    MaxItems: ${maxItems}
    CurrentItem: ${currentItem}
    UpdatedCurrentItem: ${updatedCurrentItem}
    CarouselRef: ${carouselRef}
    Childs: ${childs}
    Width: ${width}
  `)
}

export default loadCarouselDOM;