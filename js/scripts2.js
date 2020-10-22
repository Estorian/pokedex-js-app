let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

//Verifies pokemon as an object before adding to pokemonList
  function isPokemon(pokemon) {
    if (typeof(pokemon) === 'object') {
      pokemonList.push(pokemon);
    } else {
      console.error('Invalid attempt to add non-object to pokemonList')
    };

//returns pokemonList
  function getAll() {
    return pokemonList;
  }

//searches for a specific pokemon by name and returns that pokemon object.
  function lookUp(queryName) {
    let pokeMatch = pokemonList.filter(pokemon => pokemon.name === queryName);
    return pokeMatch;
  }

//adds a single pokemon to the DOM list
  function addListItem(pokemon) {
      let list = $('.pokemon-list');
      let li = $('<button type="button"')
  }

  }
