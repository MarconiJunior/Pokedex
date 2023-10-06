const pokemonModal = document.getElementById('pokemonModal');
const modalBody = document.getElementById('modalBody');
const modal = document.querySelector('.modal-content')
const searchInput = document.getElementById('search_input')
const searchButton = document.getElementById('search_icon')

function openModal(pokemon) {
    modal.classList.remove(`${pokemon.type}`)
    modal.classList.add(`${pokemon.type}`)
    const modalContent = `
    <div class="modalBody"> 
        <span class="close">&times;</span>
        <div class="modal-column">
            <h1 class="pokemon-modal-title">${capitalizeFirstLetter(pokemon.name)}</h1>
            <p>Abilities: ${capitalizeFirstLetter(pokemon.abilities.join(', '))}</p>
            <p>Weight: ${pokemon.weight / 10} Kg</p>
            <ol class="modal-types">
                        ${pokemon.types.map((type) => `<li class="modal-type ${type}">${capitalizeFirstLetter(type)}</li>`).join('')}
                    </ol>
        </div>
        <img class="poke-image" src="${pokemon.photo}" alt="${pokemon.name}">
    </div>
  `;
    modal.innerHTML = modalContent;

    const closeModalButton = document.querySelector('.close');

    closeModalButton.addEventListener('click', () => {
        pokemonModal.style.display = 'none';
        modal.classList.remove(`${pokemon.type}`)
    });

    window.addEventListener('click', (event) => {
        if (event.target === pokemonModal) {
            pokemonModal.style.display = 'none';
            modal.classList.remove(`${pokemon.type}`)
        }
    });

    pokemonModal.style.display = 'block';
}

function capitalizeFirstLetter(string) {
    const words = string.split(' ');
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(' ');
}

pokemonList.addEventListener('click', async (event) => {
    const pokemonNumber = event.target.closest('.pokemon').querySelector('.number').textContent.replace('#', '');
    const clickedPokemon = event.target.closest('.pokemon');
    if (clickedPokemon) {
        await pokeApi.getClickedPokemons(pokemonNumber).then((pokemon) => {
            openModal(pokemon);
        })
    }
});


searchButton.addEventListener('click', async () => {
    await searchPokemon()
})

searchInput.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        await searchPokemon()
    }
})

async function searchPokemon() {
    const searchValue = searchInput.value
    const regex = /^[A-Za-z]+$/;
    if (regex.test(searchValue)) {
        const pokemonNumber = await pokeApi.getPokemonByName(searchInput.value.trim())
        console.log(pokemonNumber)
        pokeApi.getClickedPokemons(pokemonNumber)
            .then((pokemon) => {
                openModal(pokemon);
            })
            .catch((error) => {
                console.error('Erro ao buscar e exibir o Pokémon:', error);
            })
        searchInput.value = "";
        searchInput.placeholder = "Digite o Pokémon";
    } else {
        alert('Dígite apenas letras')
    }
}

