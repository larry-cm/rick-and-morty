import { IcoHeart } from '@/assets/Icons'
import { useEffect, useState } from 'react'
export type FullF = { character: string[]; episode: string[]; location: string[] }
export function BtnFavoritos({ id, labelId, getDataFavoriteInitial }: { id: number, labelId: string, getDataFavoriteInitial: () => void }) {

  const [favoriteState, setFavoriteState] = useState<FullF | null>(null)
  const [error, setError] = useState(false)

  function sendFavorite(event: React.MouseEvent<HTMLButtonElement>) {
    // Obtiene el elemento `<input>` anterior al `<div>` presionado
    const target = event.currentTarget as HTMLInputElement
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
            // Si había error y ya no hay 10 elementos, limpia el error
            if (arraySection.length <= 10) {
              setError(false);
            }
          } else if (arraySection.length < 10) {
            // Si no está y hay menos de 10 elementos, lo agrega
            arraySection.push(numberId)
            setError(false);
          } else {
            // Si ya hay 10 elementos, guarda un error en `localStorage`
            setError(true);
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
          setError(false);
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
  function requestFormModal(event: React.MouseEvent<HTMLDialogElement>) {
    const dialogElement = event.currentTarget
    const subsEvent = () => {
      dialogElement.returnValue && console.log('ir a ', dialogElement.returnValue);
      dialogElement.removeEventListener('close', subsEvent)
    }
    dialogElement.addEventListener('close', subsEvent)
  }
  function includeFavoriteCard(labelId: string, id: string | number, favoriteStateInitial: FullF | null) {
    return favoriteState && favoriteState[labelId as keyof typeof favoriteState].includes(id.toLocaleString())
  }
  useEffect(() => {
    // Sincroniza favoritos al montar
    setFavoriteState(() => {
      const favoritos = localStorage.getItem('favorito')
      return favoritos && JSON.parse(favoritos)
    })
    // Al montar, sincroniza el error con localStorage
  }, [])

  useEffect(() => {
    if (getDataFavoriteInitial) {
      getDataFavoriteInitial()
    } // llamo a la función que trae los datos favoritos del local storage
  }, [favoriteState])

  return (
    <>
      <button
        commandfor={error ? 'view-modal' : 'none'}
        command='show-modal'
        id={`favorito-${labelId}-${id}`}
        className={`${includeFavoriteCard(labelId, id, favoriteState) && '*:text-red-500'} h-fit bg-black/40 hover:bg-slate-800/80 py-2 px-2 rounded-full cursor-pointer`}
        onClick={sendFavorite}>
        <span className='sr-only'>icono de favorito</span>
        <IcoHeart
          className='text-sky-400 size-5'
        /> 
      </button>

      <dialog id='view-modal' closedby='any' onClick={requestFormModal}>
        <p className='flex flex-col'>
          No puedes suscribirte a mas de 10 favoritos si no tienes una cuenta.
          <span>¡Que esperas regístrate con nosotros!</span>

        </p>
        <form method="dialog" className='flex space-x-24 pt-4'>
          <button>close</button>
          <button value='registrar'>registrarme ahora</button>
        </form>
      </dialog>
    </>
  )
}
