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

                // Acá obtengo información de la especie y el efecto llamando a otra url que está dentro de la primera
                const speciesResponse = await fetch(data.species.url);
                const speciesData = await speciesResponse.json();
                const effectEntries = speciesData.flavor_text_entries;
                const effect = effectEntries.find(entry => entry.language.name === 'es').flavor_text; 

                this.pokemonElegido = { weight, front_default, name, effect};
                this.abrirModal();
            } catch (error) {
                console.error('Error al obtener información del Pokémon:', error);
            }
        },
        capitalize(value) {
            if (!value) return '';
            return value.toString().charAt(0).toUpperCase() + value.toString().slice(1);
        },

        guardarPokemon() {
            if (this.pokemonElegido) {
                this.historialPokemones.push(this.pokemonElegido);
                localStorage.setItem('historialPokemones', JSON.stringify(this.historialPokemones));
                alert('El Pokémon ha sido guardado en el historial.');
            } else {
                alert('No hay Pokémon seleccionado para guardar.');
            }
        },
    },


    mounted() { 
        
        const historialGuardado = localStorage.getItem('historialPokemones');
        if (historialGuardado) {
            this.historialPokemones = JSON.parse(historialGuardado);
        }
        
        fetch("https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0")
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


