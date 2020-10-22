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
    let list = $('.pokemon-list');
    let buttonDetails = {
      type:' type="button"',
      classes:' class=" pokeName group-list-item group-list-item-action"',
      dataToggle:' data-toggle="modal"',
      dataTarget:' data-target="#pokeDetails"',
      dataPokeName:' data-name="' + pokemon.name + '"',
      dataDetailsUrl:' data-detailsurl="' + pokemon.detailsUrl + '"'
    }
    let button = $('<button' + buttonDetails.type + buttonDetails.classes + buttonDetails.dataToggle + buttonDetails.dataTarget + buttonDetails.dataPokeName + buttonDetails.dataDetailsUrl + '>' + pokemon.name + '</button>');
    list.append(button);
  }

//Loads the list of 150 pokemon from pokeapi.
  function loadList() {
    loading();
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
      loading();
    }).catch(function (e) {
      console.error(e);
      loading();
    })
  }

//loads the details of a pokemon and assigns them to the right variables.
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  $('#pokeDetails').on('show.bs.modal', function(event) {
    loading();
    let button = $(event.relatedTarget);
    let pokemon = {
      name:button.data('name'),
      detailsUrl:button.data('detailsurl')
    };
    let modal = $(this);
    modal.find('.modal-title').text('');
    modal.find('.modal-title').text(pokemon.name);
    let content = modal.find('.modal-body');
    content.empty();
    loadDetails(pokemon).then(function (){
      console.log(pokemon);
      let img = $('<img src="' + pokemon.imageUrl + '" class="img-fluid">');
      console.log(img);
      let text = '<p>Height: ' + pokemon.height + '</p>';
      let typesList = '<p>Type(s): ' + pokemon.types[0].type.name;
      for (let i = 1; i < pokemon.types.length; i++) {
        typesList += ', ' + pokemon.types[i].type.name;
      }
      typesList += '</p>'
      text += typesList;
      content.append(img);
      content.append(text);
    })
    loading();
  });

  function loading() {
    let spinner = $('.spinner-border');
    spinner.toggleClass('invisible');
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
