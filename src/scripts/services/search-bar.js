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
  
  let searchBarActive = false;
  let timeoutId;


  function changeColor() {
    const colors = ['#5CE1E6', '#FF8BD2', '#FFDE59','#FFBD59', '#4DB854'];
    const random = Math.floor(Math.random() * colors.length);

    return colors[random];
  }

  async function searchInAPI(inputValue, filter) {
    try {
      const url = `https://api-dianpe.onrender.com/${filter}/pesquisa?query=${inputValue}`;

      if (inputValue.length >= 3 && filter) {
        const result = await fetch(url);
        const parsedValue = await result.json();
        console.log(parsedValue)
      } else {
        console.log('Valor pequeno');
      }
    } catch (e) {
      console.error('Houve um erro ao pesquisar dados');
    }
  }

  function searchValue(event) {
    clearTimeout(timeoutId);
    // Inicia um novo setTimeout para exibir o valor após 1 segundo
    timeoutId = setTimeout(() => {
      searchInAPI(event.target.value, searchBarFilter.value);
    }, 500); // 500 milissegundos = 0,5 segundos
  }

  function openResult() {
    searchBarContent.classList.remove('hidden');
  }

  function closeResult() {

  }

  function focusSearchBar() {
    searchBarContainer.style.outline = '2px solid black';
  }

  function focusOutSearchBar() {
    searchBarContainer.style.outline = '';
  }

  searchBar.addEventListener('focusin', focusSearchBar );
  searchBar.addEventListener('focusout', focusOutSearchBar);
  searchBar.addEventListener('input', searchValue);
}())