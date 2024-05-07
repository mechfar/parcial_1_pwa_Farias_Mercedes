const app = Vue.createApp({
    data() {
        return {
            verModal: false,
            pokemonElegido: null,
            pokemones: [],
            historialPokemones: [] 
        };
    },
methods: {
        abrirModal() {
            this.verModal = true;
        },
        cerrarModal() {
            this.verModal = false;
        },
        async verPokemon(url) {
            try {
                const response = await fetch(url);
                const data = await response.json();
                const { weight, sprites, name } = data;
                const { front_default } = sprites.other['official-artwork'];

                this.pokemonElegido = { weight, front_default, name};
                this.abrirModal();
            } catch (error) {
                console.error('Error al obtener información del Pokémon:', error);
            }
        },
        capitalize(value) {
            if (!value) return '';
            return value.toString().charAt(0).toUpperCase() + value.toString().slice(1);
        },
    },


    mounted() { fetch("https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0")
        .then(response => response.json())
        .then(data => {
            this.pokemones = data.results;
            console.log('Datos obtenidos:', data);
        })
        .catch(error => {
            console.error('Error al obtener la lista de Pokémon:', error);
        });
}


});

app.mount('#app');


