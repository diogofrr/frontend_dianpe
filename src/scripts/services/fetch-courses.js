(function () {
  const coursesHtmlList = document.getElementById("courses__list");
  const spinner = document.getElementById("courses-spinner");

  async function fetchCourses() {
    try {
      const result = await fetch("https://api-dianpe.onrender.com/cursos/");
      return result.json();
    } catch (error) {
      console.error("Erro ao buscar escolas:", error);
      return [];
    }
  }

  function courseSectionTemplate(categoryName, courseList) {
    return (`
    <div class="typeCoursesCategory">
      <p class="typeCoursesCategory__categoryTitle">${categoryName}</p>
      <ul class="typeCoursesCategory__courses main-carousel" id="courses__list"  data-flickity='{ "cellAlign": "left", "contain": true }'>
        ${courseList.map((course) => coursesCardTemplate())}
      </ul>
    <div>
    `)
  }

  function coursesCardTemplate(id, courseImg, courseName, courseImgAlt) {
    return (`
      <li class="carousel-cell">
        <a href="${id}" class="courses__link">
          <img class="courses__img" src="${courseImg}" alt="${courseImgAlt}" />
          <p class="courses__name">
            ${courseName}
          </p>
        </a>
      </li>
    `);
  }

  async function renderCourses() {
    const categorias = await fetchCourses();

    console.log(categorias)
  }

  renderCourses();
})();
