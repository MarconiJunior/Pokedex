const pokemonModal = document.getElementById('pokemonModal');
const modalBody = document.getElementById('modalBody');
const modal = document.querySelector('.modal-content')

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

pokemonList.addEventListener('click', (event) => {
    const pokemonNumber = event.target.closest('.pokemon').querySelector('.number').textContent.replace('#', '');
    const clickedPokemon = event.target.closest('.pokemon');
    if (clickedPokemon) {
        pokeApi.getClickedPokemons(pokemonNumber).then((pokemon) => {
            openModal(pokemon);
        })
    }
});

