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
    return `
            <a href="school.html?id=${id}" class="schoolsCardSection__schoolLink">
                <li class="schoolsCardSection__school">
                    <img class="schoolsCardSection__img" href="${schoolImg}" alt="${schoolImgAlt}" />
                    <p class="schoolsCardSection__schoolDesc">
                        <b>${schoolName}</b>
                    </p>
                </li>
            </a>
        `;
  }

  async function renderSchools() {
    const { schools } = await fetchSchools();

    setTimeout(() => {
      if (schools.length > 0) {
        schoolsList = schools.map((school) =>
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
