let pokemonRepository = (function () {
  let pokemonList = [];

  return {
    add: function(pokemon) {
      pokemonList.push(pokemon);
    },
    getAll: function() {
      return pokemonList;
    }
  }
})();


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

pokemonList.forEach(function(pokemon) {
  message = '<p>' + pokemon.name + ' (height: ' + pokemon.height + 'm)';
  if (pokemon.height > 1) {
    message += ' That\'s a big boy!';
  }
  message += '</p>';
  document.write(message);
})

/*for (let i = 0; i < pokemonList.length; i++) {
  message = pokemonList[i].name + ' (height: ' + pokemonList[i].height + 'm)';
//Check for height over 1m and add to message if it is.
  if (pokemonList[i].height > 1) {
    message = message + ' - That\'s a big boy!';
  }
  message = message + '<br>' //Adds a line break after each entry.
  document.write(message);
}
*/
function divide(dividend, divisor) {
  if (divisor == 0) {
    return "Dividing by zero will break the universe. Don't do that.";
  }
  else {
    return (dividend / divisor);
  }
}

console.log(divide(4, 2));
console.log(divide(7, 0));
console.log(divide(1, 4));
console.log(divide(12, -3));
