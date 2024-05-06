
fetch("https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0")
.then(response => response.json())
.then(data => {
    this.pokemones = data.results;
    console.log('Datos obtenidos:', data);
})
.catch(error => {
    console.error('Error al obtener la lista de Pokémon:', error);
});