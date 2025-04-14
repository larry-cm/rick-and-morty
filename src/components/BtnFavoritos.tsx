import { IcoHeart } from '@/assets/Icons'
import { useEffect, useState } from 'react'
export type FullF = { character: string[]; episode: string[]; location: string[] }
export function BtnFavoritos({ id, labelId, widthClase, getDataFavoriteInitial }: { id: number, labelId: string, widthClase?: string, getDataFavoriteInitial: () => void }) {

  const [favoriteState, setFavoriteState] = useState<FullF | null>(null)
  const [error, setError] = useState(false)

  function sendFavorite(event: React.MouseEvent<HTMLDivElement>) {
    // Obtiene el elemento `<input>` anterior al `<div>` presionado
    const target = event.currentTarget.previousElementSibling as HTMLInputElement
    if (target) {
      // Actualiza el estado de favoritos
      setFavoriteState(() => {
        // Obtiene el `id` del elemento `<input>`
        const idEvent = target.id

        // Recupera los datos de favoritos almacenados en `localStorage`
        const favoritos = localStorage.getItem('favorito')

        // Estructura inicial de favoritos
        const FullFavorites: FullF = {
          character: [],
          episode: [],
          location: []
        }

        // Función para dividir el `id` y obtener partes específicas
        const [_, sectionId, numberId] = idEvent.split('-')

        // Obtiene la clave principal (character, episode, location) del `id`
        const firstKey = sectionId as keyof typeof FullFavorites

        if (favoritos) {
          // Si hay datos en `localStorage`, los analiza como JSON
          const parsedFavorites = JSON.parse(favoritos) as typeof FullFavorites

          // Obtiene la sección correspondiente (character, episode, location)
          const arraySection = parsedFavorites[firstKey]

          // Verifica si el elemento ya está en la lista de favoritos
          if (arraySection.includes(numberId)) {
            // Si está, lo elimina de la lista
            parsedFavorites[firstKey] = arraySection.filter(item => item !== numberId)
          } else if (arraySection.length < 10) {
            // Si no está y hay menos de 10 elementos, lo agrega
            arraySection.push(numberId)
          } else {
            // Si ya hay 10 elementos, guarda un error en `localStorage`
            // localStorage.setItem('ErrorFavorito', 'true')
            setError(p => !p)
          }

          // Actualiza los datos de favoritos en `localStorage`
          localStorage.setItem('favorito', JSON.stringify(parsedFavorites))
          // Retorna los datos actualizados
          return parsedFavorites
        } else {
          // Si no hay datos previos en `localStorage`, inicializa la estructura
          FullFavorites[firstKey].push(numberId)

          // Guarda los datos inicializados en `localStorage`
          localStorage.setItem('favorito', JSON.stringify(FullFavorites))

          // Retorna los datos inicializados
          return FullFavorites
        }
      })
    }
  }
  // function sendFavorite(event: React.MouseEvent<HTMLDivElement>) {
  //   const target = event.currentTarget.previousElementSibling as HTMLInputElement // seleccionamos el elemento anterior al div
  //   if (target) {
  //     setFavoriteState(() => {
  //       const idEvent = target.id
  //       const favoritos = localStorage.getItem('favorito')
  //       const FullFavorites: FullF = {
  //         character: [],
  //         episode: [],
  //         location: []
  //       }
  //       const idSeparate = (index?: number) => (idEvent.split('-')[index ?? 1])
  //       const firstKey = idSeparate() as keyof typeof FullFavorites
  //       if (favoritos) {
  //         const parsedFavorites = JSON.parse(favoritos) as typeof FullFavorites
  //         const arraySection = parsedFavorites[firstKey]

  //         if (arraySection.includes(idSeparate(2))) {
  //           parsedFavorites[firstKey] = arraySection.filter(item => item !== idSeparate(2))
  //         } else if (arraySection.length < 10) {
  //           arraySection.push(idSeparate(2))
  //         } else {
  //           localStorage.setItem('ErrorFavorito', `${idSeparate()}-${idSeparate(2)}`)
  //         }

  //         localStorage.setItem('favorito', JSON.stringify(parsedFavorites))

  //         return parsedFavorites
  //       } else {
  //         FullFavorites[firstKey].push(idSeparate(2))
  //         localStorage.setItem('favorito', JSON.stringify(FullFavorites))
  //         return FullFavorites
  //       }
  //     })
  //   }
  // }

  useEffect(() => {
    setFavoriteState(() => {
      const favoritos = localStorage.getItem('favorito')
      return favoritos && JSON.parse(favoritos)
    })


  }, [])

  useEffect(() => {
    getDataFavoriteInitial && getDataFavoriteInitial() // llamo a la función que trae los datos favoritos del local storage

    console.log(error);

  }, [favoriteState])

  return (
    <label
      htmlFor={`favorito-${labelId}-${id}`}
      className={`flex ${widthClase ?? 'w-1/4'} flex-row-reverse pt-0 h-fit `}
    >
      <input
        id={`favorito-${labelId}-${id}`}
        type='checkbox'
        name={`favorito-id-#`}
        className='sr-only peer'
      />
      <div
        className={` h-fit bg-black/40 hover:bg-slate-800/80 py-2 px-2 rounded-full cursor-pointer`}
        onClick={sendFavorite}>
        <span className='sr-only'>icono de favorito</span>
        <IcoHeart
          className='text-sky-400 size-5'
        /> 
      </div>
      {
        error && <div>
          {
            error && 'mira tu error'
          }
        </div>
      }
    </label>
  )
}
