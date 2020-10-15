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
      let title = pokemon.name;
      let text = 'Height: ' + pokemon.height + '<br>';
      let typesList = 'Type(s): ' + pokemon.types[0].type.name;
      for (let i = 1; i < pokemon.types.length; i++) {
        typesList += ', ' + pokemon.types[i].type.name;
      }
      text += typesList;
      let img = pokemon.imageUrl;
      console.log(pokemon);
      showModal(title, text, img);
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
          name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
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

//loads the details of a pokemon and assigns them to the right variables.
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

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  window.addEventListener('click', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.target === modalContainer) {
      hideModal();
    }
  })

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

  //This is actually to create and fill the modal.
  function showModal(title, text, img) {
    let modalContainer = document.querySelector('#modal-container');
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close-button');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let contentElement = document.createElement('p');
    contentElement.innerHTML = text;

    let imgElement = document.createElement('img');
    imgElement.src = img;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imgElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }



  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
    modalContainer.removeChild(document.querySelector('.modal'));
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
