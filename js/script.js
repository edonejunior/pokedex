const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = '1'; // Default search

const fetchPokemon = async (pokemon) => {
const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if(apiResponse.status === 200){
        const data = await apiResponse.json();
        return data;
    }

}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    pokemonImage.src = '';

    const data = await fetchPokemon(pokemon);
    if(data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.style.display = 'block';
        pokemonImage.src = data.sprites.versions['generation-v']['black-white'].animated.front_default;
        searchPokemon = data.id; // Update searchPokemon to the current pokemon id
    } else {
        pokemonName.innerHTML = 'Not found :(';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none';
    }
   
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    input.value = '';
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) { // Prevent going below 1
        searchPokemon -= 1; // Decrement searchPokemon
        renderPokemon(searchPokemon);
    }
});
buttonNext.addEventListener('click', () => {
    searchPokemon += 1; // Increment searchPokemon
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon); // Initial render

