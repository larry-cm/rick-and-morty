import type { Result, ResultEpisode, ResultLocation } from '@/types/Api'
export async function fetchApi(option?: 'character' | 'location' | 'episode', id?: number) {
  try {
    const data = await fetch(`https://rickandmortyapi.com/api/${option}/${id ?? ''}`)
    if (!data.ok) throw new Error(`Error al obtener los datos ${data.statusText}`)
    return await data.json()
  } catch (error) {
    throw new Error(`Error de conexión ${error}`)
  }
}

export function fetchForOne(): Promise<(Result | ResultEpisode | ResultLocation)[][]> {
  try {
    const favoritos = localStorage.getItem('favorito')
    const favParse: string[] = JSON.parse(favoritos ?? '')
    const sectionTypes: { character: number[]; episode: number[]; location: number[] } = {
      character: [],
      episode: [],
      location: []
    }
    // metiendo los datos a los favoritos
    favParse.forEach((fav) => sectionTypes[fav.split('-')[1] as keyof typeof sectionTypes]
      ?.push(parseInt(fav.split('-')[2])))
    // por cada sección se hace un fetch para cada uno de los ids 
    return Promise.all(Object.values(sectionTypes)
      .map((section, i) =>
        Promise.all(section.map(async (id) => {
          const typeFetch = Object.keys(sectionTypes)
          return await fetchApi(typeFetch[i] as keyof typeof sectionTypes, id) as Result | ResultEpisode | ResultLocation
        }))
      ))
  } catch (er) {
    return Promise.reject(er)
  }

}