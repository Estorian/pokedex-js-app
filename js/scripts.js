let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

//checks for an object, then pushes the pokemon into pokemonList.
  function add(pokemon) {
    if (typeof(pokemon) === 'object') {
      pokemonList.push(pokemon);
    }
    else {console.error('Invalid attempt to add non-object to pokemonList')};
  }

//returns pokemonList
  function getAll() {
    return pokemonList;
  }

//searches for a specific pokemon by name and returns that pokemon object.
  function lookUp(queryName) {
    let pokeMatch = pokemonList.filter(pokemon => pokemon.name === queryName);
    return pokeMatch;
  }

//adds a new pokemon in the list and creates a button for it.
  function addListItem(pokemon) {
    let list = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokeName');
    detailsButtonListener(button, pokemon);
    listItem.appendChild(button);
    list.appendChild(listItem);
  }

//Setup the event listener on the button using showDetails()
  function detailsButtonListener(button, pokemon) {
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    })
  }

//takes a pokemon as a parameter and displays its information
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

//Loads the list of 150 pokemon from pokeapi.
  function loadList() {
    showLoadingBar();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
      hideLoadingBar();
    }).catch(function (e) {
      console.error(e);
      hideLoadingBar();
    })
  }

  function loadDetails(item) {
    showLoadingBar();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      hideLoadingBar();
    }).catch(function (e) {
      console.error(e);
      hideLoadingBar();
    });
  }

  return {
    add: add,
    getAll: getAll,
    lookUp: lookUp,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();



pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

function showLoadingBar() {
  let loadingBar = document.createElement('img');
  loadingBar.src = 'img/loading.gif';
  loadingBar.classList.add('loading-bar');
  document.querySelector('body').appendChild(loadingBar);
}

function hideLoadingBar() {
  let loadingBar = document.querySelector('.loading-bar');
  loadingBar.parentElement.removeChild(loadingBar);
}

console.log(pokemonRepository.lookUp("Squirtle"));
