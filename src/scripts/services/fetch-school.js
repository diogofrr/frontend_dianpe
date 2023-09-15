(function () {
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");

  // Tratativas
  const coursesSpinner = document.getElementById('courses-spinner');
  const coursesProfile = document.getElementById('school-profile');
  const notFound = document.getElementById('not-found')

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

  function courseTemplate(id, schoolName, schoolImg, schoolImgAlt) {
    return `

        `;
  }

  function renderData(response) {
    // Dados
    const schoolBackground = document.getElementById('school-profile-background');
    const schoolPicture = document.getElementById('school-profile-picture');
    const schoolName = document.getElementById('school-profile-name');
    const schoolAddress = document.getElementById('school-address');
    const schoolTel = document.getElementById('school-tel');
    const schoolEmail = document.getElementById('school-email');
    const schoolSite = document.getElementById('school-site');

    schoolName.innerText = response.NOME_INSTITUICAO;
    schoolTel.innerText = response.TELEFONE.replace(/\D/g, "").replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
    schoolAddress.innerText = `${response.RUA}, ${response.NUM}, ${response.COMPLEMENTO !== null ? (`${response.COMPLEMENTO},`) : ''} ${response.BAIRRO}, ${response.CIDADE}, ${response.UF} - ${response.CEP}`
    schoolEmail.innerText = response.EMAIL
  }

  async function main() {
    const response = await fetchSchoolData();
    console.log(response)

    if (!response || response.error) {
      notFound.classList.remove('hidden');
      coursesSpinner.classList.add('hidden');
    } else {
      coursesProfile.classList.remove('hidden');
      coursesSpinner.classList.add('hidden');
      renderData(response);
    }
  }

  main()
})()