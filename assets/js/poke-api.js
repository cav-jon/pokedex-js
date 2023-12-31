const pokeAPI = {}
const convertPokeAPIDetailToPoke = (pokeDetail) => {
    const pokemon = new Pokemon()
    pokemon.pokeNumber = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}
pokeAPI.getPokeDetail = (poke) => {
    return fetch(poke.url)
    .then((res) => res.json())
    .then(convertPokeAPIDetailToPoke)
}
pokeAPI.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`

    return fetch(url)
        .then((res) => res.json())
        .then((JsonRes) => JsonRes.results)
        .then((pokes) => pokes.map(pokeAPI.getPokeDetail))
        .then(detailReq => Promise.all(detailReq))
        .then((pokeDetails) => pokeDetails)
        .catch((err) => console.log(err))
        debugger
}

