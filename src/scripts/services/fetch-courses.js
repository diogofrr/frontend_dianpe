import loadCarouselDOM from '../carousel.js'

(function () {
  const coursesHtmlList = document.getElementById("courses__list");
  const spinner = document.getElementById("courses-spinner");

  function getRandomColor() {
    const colors = ['#5CE1E6', '#FF8BD2', '#FFDE59','#FFBD59', '#4DB854'];
    const random = Math.floor(Math.random() * colors.length);

    return colors[random]
  }

  function startCarousel() {
    const rightButton = document.getElementById('rightButton');
    const leftButton = document.getElementById('leftButton');
  
    let currentItem = 0;
    const items = document.querySelectorAll('.carousel-cell');
    const maxItems = items.length;
  
    rightButton.addEventListener('click', () => console.log('direita'))
    leftButton.addEventListener('click', () => console.log('esquerda'))
  }

  function startLoading() {
    spinner.style.display = 'block'
  }

  function stopLoading() {
    spinner.style.display = 'none'
  }

  function showList() {
    coursesHtmlList.style.display = 'flex'
  }

  function hideList() {
    coursesHtmlList.style.display = 'none'
  }

  async function fetchCourses() {
    try {
      const result = await fetch("https://api-dianpe.onrender.com/cursos/");
      return result.json();
    } catch (error) {
      console.error("Erro ao buscar escolas:", error);
      return [];
    }
  }

  function createCategoryElement(categoryName, courseList) {

    
    // Left Arrow Icon
    const leftArrowIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    leftArrowIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    leftArrowIcon.setAttribute("fill", "none");
    leftArrowIcon.setAttribute("viewBox", "0 0 24 24");
    leftArrowIcon.setAttribute("stroke-width", "1.5");
    leftArrowIcon.setAttribute("stroke", "currentColor");
    leftArrowIcon.classList.add('arrow-icon');

    const leftArrowPathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
    leftArrowPathElement.setAttribute("stroke-linecap", "round");
    leftArrowPathElement.setAttribute("stroke-linejoin", "round");
    leftArrowPathElement.setAttribute("d", "M15.75 19.5L8.25 12l7.5-7.5");

    leftArrowIcon.appendChild(leftArrowPathElement);

    // Right Arrow Icon
    const rightArrowIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    rightArrowIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    rightArrowIcon.setAttribute("fill", "none");
    rightArrowIcon.setAttribute("viewBox", "0 0 24 24");
    rightArrowIcon.setAttribute("stroke-width", "1.5");
    rightArrowIcon.setAttribute("stroke", "currentColor");
    rightArrowIcon.classList.add('arrow-icon')
    
    const rightArrowPathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
    rightArrowPathElement.setAttribute("stroke-linecap", "round");
    rightArrowPathElement.setAttribute("stroke-linejoin", "round");
    rightArrowPathElement.setAttribute("d", "M8.25 4.5l7.5 7.5-7.5 7.5");

    rightArrowIcon.appendChild(rightArrowPathElement);

    // Right Button
    const rightButton = document.createElement('button');
    rightButton.classList.add('carousel-btn');
    rightButton.classList.add('rightButton');
    rightButton.appendChild(rightArrowIcon);

    // Left Button
    const leftButton = document.createElement('button');
    leftButton.classList.add('carousel-btn');
    leftButton.classList.add('leftButton');
    leftButton.appendChild(leftArrowIcon);

    // Carousel controls
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('carousel-controls')

    // Container
    const categoryElement = document.createElement('div');
    categoryElement.classList.add('typeCoursesCategory');
  
    // Category Title
    const categoryTitleElement = document.createElement('p');
    categoryTitleElement.classList.add('typeCoursesCategory__categoryTitle');
    categoryTitleElement.textContent = `${categoryName} - (${courseList.length})`;
  
    // Category List
    const coursesListElement = document.createElement('ul');
    coursesListElement.classList.add('typeCoursesCategory__courses', 'main-carousel');
    coursesListElement.setAttribute('data-active', 0);
  
    courseList.forEach((course) => {
      const courseCardElement = createCourseCardElement(course.ID, course.NOME, course.IMG_URL);
      coursesListElement.appendChild(courseCardElement);
    });
  
    categoryElement.appendChild(categoryTitleElement);
    categoryElement.appendChild(coursesListElement);
    buttonsContainer.appendChild(leftButton);
    buttonsContainer.appendChild(rightButton);
    coursesListElement.appendChild(buttonsContainer)

    return categoryElement;
  }
  
  function createCourseCardElement(id, courseName, courseImg) {
    const randomColor = getRandomColor();

    // Card Element
    const cardElement = document.createElement('li');
    cardElement.classList.add('carousel-cell');
    cardElement.style.backgroundColor = randomColor;
  
    // Link Element
    const linkElement = document.createElement('a');
    linkElement.href = `course.html?id=${id}`;
    linkElement.classList.add('courses__link');
  
    // Image Element
    const imgElement = document.createElement('img');
    imgElement.classList.add('courses__img');
    imgElement.src = courseImg;
    imgElement.alt = `Imagem ilustrativa do curso ${courseName}`;
  
    // Name Element
    const nameElement = document.createElement('p');
    nameElement.classList.add('courses__name');
    nameElement.textContent = courseName;
  
    linkElement.appendChild(imgElement);
    linkElement.appendChild(nameElement);
    cardElement.appendChild(linkElement);
  
    return cardElement;
  }

  async function renderCourses() {
    const categories = await fetchCourses();
  
    categories.CURSOS_POR_CATEGORIA.forEach((category) => {
      const categoryElement = createCategoryElement(category.NOME_CATEGORIA_F, category.CURSOS);
      coursesHtmlList.appendChild(categoryElement);
    });
  
    stopLoading();
    showList();
    loadCarouselDOM()
  }

  renderCourses();
})();
