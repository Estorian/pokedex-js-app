let pokemonRepository = (function () {
  let pokemonList = [
    {name: 'Bulbasaur', height:0.7, types:['grass', 'poison']},
    {name: 'Ivysaur', height:1, types:['grass', 'poison']},
    {name: 'Venusaur', height:2, types:['grass', 'poison']},
    {name: 'Charamander', height:0.6, types:['fire']},
    {name: 'Charmeleon', height:1.1, types:['fire']},
    {name: 'Charizard', height:1.7, types:['fire', 'flying']},
    {name: 'Squirtle', height:0.5, types:['water']},
    {name: 'Wartortle', height:1, types:['water']},
    {name: 'Blastoise', height:1.6, types:['water']}
  ];

  function add(pokemon) {
    if (typeof(pokemon) === 'object') {
      pokemonList.push(pokemon);
    }
    else {console.error('Invalid attempt to add non-object to pokemonList')};
  }

  function getAll() {
    return pokemonList;
  }

  function lookUp(queryName) {
    let pokeMatch = pokemonList.filter(pokemon => pokemon.name === queryName);
    return pokeMatch;
  }

  function addListItem(pokemon) {
    let list = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokeName');
    listItem.appendChild(button);
    list.appendChild(listItem);
  }

  return {
    add: add,
    getAll: getAll,
    lookUp: lookUp,
    addListItem: addListItem
  };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});


console.log(pokemonRepository.lookUp("Squirtle"));
