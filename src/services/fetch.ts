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

export function fetchForOne(favParse:string[]): Promise<(Result | ResultEpisode | ResultLocation)[][]> {
  try {
    if (favParse.length) {
      const sectionTypes: { character: number[]; episode: number[]; location: number[] } = {
      character: [],
      episode: [],
      location: []
      }
      const errorsForSection = ['']

    // metiendo los datos a los favoritos
      favParse.forEach((fav) => {
        const positionSplit = fav.split('-')
        // dándole el limite a los favoritos
        const sectionTurn = sectionTypes[positionSplit[1] as keyof typeof sectionTypes]
        if (positionSplit[1]) {
          if (sectionTurn?.length < 10) {
            return sectionTurn?.push(parseInt(positionSplit[2]))
          }
          else {
            console.error(errorsForSection)
            return errorsForSection.push(`${positionSplit[1]}-${positionSplit[2]}`)
          }

        }
      })
    // por cada sección se hace un fetch para cada uno de los ids 
      return favParse.length ?
     Promise.all(Object.values(sectionTypes)
      .map((section, i) =>
        Promise.all(section.map(async (id) => {
          const typeFetch = Object.keys(sectionTypes)
          return await fetchApi(typeFetch[i] as keyof typeof sectionTypes, id) as Result | ResultEpisode | ResultLocation
        })) 
      )):
      Promise.resolve([])
    }
    return Promise.resolve([])
  } catch (er) {
    return Promise.reject(er)
  }

}
