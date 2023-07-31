const loadMoreButton = document.getElementById("loadMore")
const limit = 10
let offset = 0
const maxRecors = 151

const converPokeToLI = (poke) => {
    return `<li class="pokemon ${poke.type}-1">
                <span class="number">#${poke.pokeNumber}</span>
                <span class="name"><a href="/poke-info.html?id=${poke.pokeNumber}">${poke.name}</a></span>
                <div class="detail">
                    <ol class="types">
                        ${poke.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${poke.photo}"
                        alt="${poke.name}">
                </div>

            </li> `
}

const loadMorePoke = (offset,limit) => {
    pokeAPI.getPokemons(offset,limit).then((pokeList = []) => {
        document.getElementById("pokeList").innerHTML += pokeList.map(converPokeToLI).join('')
    })
}
loadMorePoke(offset,limit)
loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit
    if(qtdRecordNextPage >= maxRecors) {
        const newLimit = qtdRecordNextPage - maxRecors
        loadMorePoke(offset, newLimit)


        loadMoreButton.parentElement.removeChild(loadMoreButton)

    } else {
        loadMorePoke(offset, limit)
    }
    
})
