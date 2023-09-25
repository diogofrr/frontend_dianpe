(function(){
  const searchBar = document.getElementById('search-bar');
  const searchBarFilter = document.getElementById('search-bar-filter');
  const searchBarContainer = document.getElementById('search-bar-container');
  let timeoutId;

  async function searchInAPI(inputValue, filter) {
    try {
      const url = `http://localhost:3000/${filter}/pesquisa?query=${inputValue}`;

      if (inputValue.length >= 3 && filter) {
        const result = await fetch(url);
        const parsedValue = await result.json()
        console.log(parsedValue)
      } else {
        console.log('Valor pequeno')
      }
    } catch (e) {
      console.error('Houve um erro ao pesquisar dados')
    }
  }

  function searchValue(event) {
    clearTimeout(timeoutId);
    // Inicia um novo setTimeout para exibir o valor após 1 segundo
    timeoutId = setTimeout(() => {
      searchInAPI(event.target.value, searchBarFilter.value)
    }, 500); // 500 milissegundos = 0,5 segundos
  }

  searchBar.addEventListener('focusin', () => searchBarContainer.style.outline = '2px solid black')
  searchBar.addEventListener('focusout', () => searchBarContainer.style.outline = '')
  searchBar.addEventListener('input', searchValue)
}())