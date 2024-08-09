/** aca se hace la llamada al backend, en este caso usaremos una api */
const baseUrl =' https://rickandmortyapi.com/api/'

const characterUrl = baseUrl + 'character/'

export const getMorty = () => {
    return fetch(characterUrl + '2').then(res => res.json())
}
