import type { FullF } from '@/components/BtnFavoritos'
import type { Result, ResultEpisode, ResultLocation } from '@/types/Api'
export async function fetchApi(option?: 'character' | 'location' | 'episode', id?: number) {
  try {
    const data = await fetch(`https://rickandmortyapi.com/api/${option}/${id ?? ''}`)
    if (!data.ok) {
      console.error(new Error(`Error al obtener los datos ${data.statusText}`))
      return Promise.resolve([])
    }
    return await data.json()
  } catch (error) {
    // throw new Error(`Error de conexión ${error}`)
    return Promise.reject(`Error de conexión ${error}`)
  }
}

export function fetchForOne(favParse: FullF | null): Promise<(Result | ResultEpisode | ResultLocation)[][]> {
  try {
    // por cada sección se hace un fetch para cada uno de los ids 
    return favParse ?
      Promise.all(Object.values(favParse)
      .map((section, i) =>
        Promise.all(section?.map(async (id) => {
          const typeFetch = Object.keys(favParse) as Array<'character' | 'location' | 'episode'>
          return await fetchApi(typeFetch[i], parseInt(id)) //as Result | ResultEpisode | ResultLocation
        })) 
      )):
      Promise.resolve([])
  } catch (er) {
    return Promise.reject(er)
  }

}
