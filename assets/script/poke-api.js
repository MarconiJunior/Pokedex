
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

function convertPokeApiToClickedPokemon(clickedPokemon) {
    const pokemon = new ClickedPokemon()
    pokemon.number = clickedPokemon.id
    pokemon.name = clickedPokemon.name

    const types = clickedPokemon.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = clickedPokemon.sprites.other.dream_world.front_default

    pokemon.abilities = clickedPokemon.abilities.map((abilitySlot) => abilitySlot.ability.name)
    pokemon.weight = clickedPokemon.weight

    return pokemon
}

pokeApi.getPokemonDetail = async (pokemon) => {
    const response = await fetch(pokemon.url)
    const pokeDetail = await response.json()
    return convertPokeApiDetailToPokemon(pokeDetail)
}

pokeApi.getPokemons = async (offset = 0, limit = 9) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    const response = await fetch(url)
    const jsonBody = await response.json()
    const pokemons = jsonBody.results
    const detailRequests = pokemons.map(pokeApi.getPokemonDetail)
    const pokemonsDetails = await Promise.all(detailRequests)
    return pokemonsDetails
}

pokeApi.getClickedPokemons = async (pokemonNumber) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`
    const response = await fetch(url)
    const clickedPokemon = await response.json()
    return convertPokeApiToClickedPokemon(clickedPokemon)
}