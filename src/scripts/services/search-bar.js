(function(){
  const searchBar = document.getElementById('search-bar');
  const searchBarFilter = document.getElementById('search-bar-filter');
  const searchBarContainer = document.getElementById('search-bar-container');
  
  const searchBarContent = document.getElementById('search-bar-content');

  const searchBarNotFound = document.getElementById('search-bar-not-found');
  const searchBarResult = document.getElementById('search-bar-result');
  const searchBarSpinner = document.getElementById('search-bar-spinner');

  const searchIcon = document.getElementById('search-icon');
  const closeIcon = document.getElementById('close-icon');

  const clearBtn = document.getElementById('clear-btn');
  
  let timeoutId;

  const colors = ['#5CE1E6', '#FF8BD2', '#FFDE59','#FFBD59', '#4DB854'];

  async function searchInAPI(inputValue, filter) {
    try {
      startLoading()
      const url = `https://api-dianpe.onrender.com/${filter}/pesquisa?query=${inputValue}`;

      if (inputValue.length >= 1 && filter) {
        const result = await fetch(url);
        const parsedValue = await result.json();

        if (parsedValue.length === 0) {
          stopLoading(true)
        } else {
          stopLoading(false)
          const elementsList = parsedValue.map((result) => {
            const href = filter === 'cursos' ? `course.html?id=${result.ID}` : `school.html?id=${result.ID}`
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const name = result.NOME ?? result.NOME_INSTITUICAO

            return createElementResult(href, randomColor, name)
          })
          elementsList.forEach((element) => searchBarResult.innerHTML += element)
        }
      } else {
        closeResult();
      }
    } catch (e) {
      console.error('Houve um erro ao pesquisar dados');
      stopLoading(true);
    }
  }

  function searchValue(event) {
    clearTimeout(timeoutId);
    // Inicia um novo setTimeout para exibir o valor após 1 segundo
    timeoutId = setTimeout(() => {
      searchInAPI(event.target.value, searchBarFilter.value);
    }, 500); // 500 milissegundos = 0,5 segundos
  }

  function startLoading() {
    // Esconde as possíveis respostas
    closeResult();
    searchBarNotFound.classList.add('hidden');
    searchIcon.classList.add('hidden');

    // Inicia o carregamento
    searchBarContent.classList.remove('hidden');
    searchBarSpinner.classList.remove('hidden');
    closeIcon.classList.remove('hidden');
  }

  function stopLoading(error) {
    searchBarSpinner.classList.add('hidden');
    if (error) {
      searchBarNotFound.classList.remove('hidden');
    } else {
      searchBarResult.classList.remove('hidden');
    }
  }

  function closeResult() {
    searchBarResult.innerHTML = '';
    searchIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
    searchBarContent.classList.add('hidden');
  }

  function focusSearchBar() {
    searchBarContainer.style.outline = '2px solid black';
  }

  function focusOutSearchBar() {
    searchBarContainer.style.outline = '';
  }

  function createElementResult(href, color, name) {
    return (`
      <li class="result__item">
        <a href="/src/pages/${href}" class="result__link">
          <span class="result__color" style="background-color: ${color};"></span>
          <p class="result__name">${name}</p>
        </a>
      </li>
    `)
  }

  searchBar.addEventListener('focusin', focusSearchBar );
  searchBar.addEventListener('focusout', focusOutSearchBar);
  searchBar.addEventListener('input', searchValue);
  clearBtn.addEventListener('click', () => {
    searchBar.value = ''
    closeResult()
  })
  searchBarFilter.addEventListener('change', () => {
    searchBar.value = ''
    closeResult()
  })
}())