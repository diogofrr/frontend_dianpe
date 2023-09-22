(function () {
  const coursesHtmlList = document.getElementById("courses__list");
  const spinner = document.getElementById("courses-spinner");

  async function fetchSchools() {
    try {
      const result = await fetch("http://localhost:3000/cursos/");
      return result.json();
    } catch (error) {
      console.error("Erro ao buscar escolas:", error);
      return [];
    }
  }

  function schoolCardTemplate(id, schoolName, schoolImg, schoolImgAlt) {
    return (`
      <li class="schoolsCardSection__school">
        <a href="school.html?id=${id}" class="schoolsCardSection__schoolLink">
          <img class="schoolsCardSection__img" src="${schoolImg}" alt="${schoolImgAlt}" />
          <p class="schoolsCardSection__schoolDesc">
            <b>${schoolName}</b>
          </p>
        </a>
      </li>
    `);
  }

  async function renderSchools() {
    const { CURSOS_POR_CATEGORIA } = await fetchSchools();

    console.log(CURSOS_POR_CATEGORIA)
  }

  renderSchools();
})();
