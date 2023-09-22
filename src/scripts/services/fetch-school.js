(function () {
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
  const colors = ['#5CE1E6', '#FF8BD2', '#FFDE59','#FFBD59', '#4DB854'];

  // Tratativas
  const coursesSpinner = document.getElementById('courses-spinner');
  const coursesProfile = document.getElementById('school-profile');
  const notFound = document.getElementById('not-found');
  const courseListHtml= document.getElementById('courses__list');

  if (!id) {
    notFound.classList.remove('hidden');
  } else {
    coursesSpinner.classList.remove('hidden');
  }

  async function fetchSchoolData() {
    try {
      const result = await fetch(`https://api-dianpe.onrender.com/escolas/${id}`);
      return result.json();
    } catch (error) {
      console.error("Erro ao buscar escolas:", error);
      coursesSpinner.classList.remove('hidden');
      return null;
    }
  }

  function courseTemplate(id, courseName, courseImg, courseImgAlt) {
    return `
      <li class="schoolCourses__course">
        <a href="${id}" class="schoolCourses__link">
          <img class="schoolCourses__img" src="${courseImg}" alt="${courseImgAlt}" />
          <p class="schoolCourses__name">
            ${courseName}
          </p>
        </a>
      </li>
    `;
  }

  function changeBackgroundColor() {
    const courses = document.querySelectorAll('.schoolCourses__course');
    courses.forEach((course) => {
      const random = Math.floor(Math.random() * colors.length);
      course.style.backgroundColor = colors[random];
    })
  }

  function renderData(response) {
    const schoolBackground = document.getElementById('school-profile-background');
    const schoolPicture = document.getElementById('school-profile-picture');
    const schoolName = document.getElementById('school-profile-name');
    const schoolAddress = document.getElementById('school-address');
    const schoolTel = document.getElementById('school-tel');
    const schoolEmail = document.getElementById('school-email');
    const schoolSite = document.getElementById('school-site');

    schoolName.innerText = response.NOME_INSTITUICAO;
    schoolTel.innerText = response.TELEFONE.replace(/\D/g, "").replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{1})(\d{4})(\d)/, "$1 $2-$3");
    schoolAddress.innerText = `${response.RUA}, ${response.NUM}, ${response.COMPLEMENTO !== null ? (`${response.COMPLEMENTO},`) : ''} ${response.BAIRRO}, ${response.CIDADE}, ${response.UF} - ${response.CEP}`;
    schoolEmail.innerText = response.EMAIL;
    schoolSite.innerText = response.SITE;
    schoolPicture.style.backgroundImage = `url(${response.FOTO_PERFIL})`
    schoolBackground.style.backgroundImage = `url(${response.PLANO_DE_FUNDO})`
  }

  async function main() {
    const response = await fetchSchoolData();

    if (!response || response.error) {
      notFound.classList.remove('hidden');
      coursesSpinner.classList.add('hidden');
    } else {
      renderData(response);      
      const courseList = response.CURSOS.map((curso) => courseTemplate(curso.ID, curso.NOME, curso.IMG_URL, `Imagem ilustrativa do curso ${curso.NOME}`));
      courseList.forEach((course) => {
        courseListHtml.innerHTML += course;
      });
      changeBackgroundColor()
      coursesProfile.classList.remove('hidden');
      coursesSpinner.classList.add('hidden');
    }
  }

  main()
})()