(function () {
  const schoolsHtmlList = document.getElementById("schools__list");
  const spinner = document.getElementById("schools-spinner");

  async function fetchSchools() {
    try {
      const result = await fetch("https://api-dianpe.onrender.com/escolas/");
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
    const { ESCOLAS } = await fetchSchools();

    setTimeout(() => {
      if (ESCOLAS.length > 0) {
        schoolsList = ESCOLAS.map((school) =>
          schoolCardTemplate(
            school.ID,
            school.NOME_INSTITUICAO,
            school.IMG_LOGO_URL,
            school.NOME_INSTITUICAO
          )
        );

        schoolsList.forEach((school) => {
          schoolsHtmlList.innerHTML += school;
        });
        schoolsHtmlList.style.display = "flex";
        spinner.style.display = "none";
      } else {
        spinner.style.display = "none";
      }
    }, 500);
  }

  renderSchools();
})();
