(function () {
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");

  // Tratativas
  const courseSpinner = document.getElementById('courses-spinner');
  const mainContent = document.getElementById('main-content');
  const notFound = document.getElementById('not-found');
  const schoolsListHtml= document.getElementById('schools-list');
  const footer = document.getElementById('footer');

  if (!id) {
    notFound.classList.remove('hidden');
  } else {
    courseSpinner.classList.remove('hidden');
  }

  async function fetchSchoolData() {
    try {
      const result = await fetch(`https://api-dianpe.onrender.com/cursos/${id}`);
      return result.json();
    } catch (error) {
      console.error("Erro ao buscar curso:", error);
      courseSpinner.classList.remove('hidden');
      return null;
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

  function renderData(response) {
    const courseBreadcrumb = document.getElementById('breadcrumb-course');
    const courseName = document.getElementById('course-name');
    const courseDescription = document.getElementById('course-description');
    const courseImg = document.getElementById('course-img');
    const schoolsList = document.getElementById('schools-list');

    courseBreadcrumb.innerHTML = response.NOME;
    courseName.innerHTML = response.NOME;
    courseDescription.innerHTML = response.DESCRICAO;
    courseImg.setAttribute('src', response.IMG_URL);
    courseImg.setAttribute('alt', `Imagem ilustrativa do curso ${response.NOME}`);
  }

  async function main() {
    const { CURSO, ESCOLAS } = await fetchSchoolData();
    console.log(CURSO, ESCOLAS)
    if (!CURSO) {
      notFound.classList.remove('hidden');
      courseSpinner.classList.add('hidden');
    } else {
      renderData(CURSO);      
      courseSpinner.classList.add('hidden');
      mainContent.classList.remove('hidden');
      footer.classList.remove('hidden');
      const schoolList = ESCOLAS.map((school) => schoolCardTemplate(school.ID, school.NOME_INSTITUICAO, school.IMG_LOGO_URL, `Imagem ilustrativa do curso ${school.NOME_INSTITUICAO}`));
      schoolList.forEach((school) => {
        schoolsListHtml.innerHTML += school;
      });
    }
  }

  main()
})()