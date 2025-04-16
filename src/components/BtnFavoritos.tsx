import { IcoHeart } from '@/assets/Icons'
import { sections } from '@/const/constantes';
import type { RequestFilter } from '@/types/Filtros';
import { useEffect, useState } from 'react'
export type FullF = { character: string[]; episode: string[]; location: string[] }
export function BtnFavoritos({ id, labelId, getDataFavoriteInitial, numFavorites }: { id: number, labelId: string, getDataFavoriteInitial: () => void, numFavorites: RequestFilter | null }) {

  const [favoriteState, setFavoriteState] = useState<FullF | null>(null)
  const [error, setError] = useState(false)

  function sendFavorite(event: React.MouseEvent<HTMLButtonElement>) {
    // Obtiene el elemento `<input>` anterior al `<div>` presionado
    const target = event.currentTarget as HTMLInputElement
    const dialog = document.getElementById('view-modal') as HTMLDialogElement

    if (target) {
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
        let updatedFavorites; // creando la variable para guardar los datos actualizados
        if (favoritos) {
          // Si hay datos en `localStorage`, los analiza como JSON
          const parsedFavorites = JSON.parse(favoritos) as typeof FullFavorites
          // Obtiene la sección correspondiente (character, episode, location)
          const arraySection = parsedFavorites[firstKey]
          // Verifica si el elemento ya está en la lista de favoritos
          if (arraySection.includes(numberId)) {
            // Si está, lo elimina de la lista
            parsedFavorites[firstKey] = arraySection.filter(item => item !== numberId)
            localStorage.setItem('error', JSON.stringify(false))
            setError(false)
          } else if (arraySection.length < 10) {
            // Si no está y hay menos de 10 elementos, lo agrega
            arraySection.push(numberId)
            localStorage.setItem('error', JSON.stringify(false))
            setError(false)
          } else {
            // Si ya hay 10 elementos, muestra el diálogo y guarda el error
            dialog && dialog.showModal()
            localStorage.setItem('error', JSON.stringify(true))
            setError(true)
            return parsedFavorites // Return early to prevent updates when max limit reached
          }
          updatedFavorites = parsedFavorites
        } else {
          // Si no hay datos previos en `localStorage`, inicializa la estructura
          FullFavorites[firstKey].push(numberId)
          updatedFavorites = FullFavorites
          setError(false)
        }

        // Actualiza los datos de favoritos en `localStorage`
        localStorage.setItem('favorito', JSON.stringify(updatedFavorites))
        return updatedFavorites
      })
    }
  }

  function requestFormModal(event: React.MouseEvent<HTMLDialogElement>) {
    const dialogElement = event.currentTarget
    const subsEvent = () => {
      dialogElement.returnValue && console.log('ir a ', dialogElement.returnValue);
      dialogElement.removeEventListener('close', subsEvent)
    }
    dialogElement.addEventListener('close', subsEvent)
  }

  function includeFavoriteCard(labelId: string, idOject: number) {
    const { ubi, person, episode } = sections
    const newLabelId = { character: person, episode: episode, location: ubi }
    return numFavorites && numFavorites[newLabelId[labelId as keyof typeof newLabelId] as keyof typeof numFavorites]?.some(({ id }) => id === idOject)
  }

  useEffect(() => {
    // Sincroniza favoritos al montar
    setFavoriteState(() => {
      const favoritos = localStorage.getItem('favorito')
      return favoritos && JSON.parse(favoritos)
    })
    // Al montar, carga el estado de error si existe
    setError(() => {
      const error = localStorage.getItem('error')
      return error && JSON.parse(error)
    })
  }, [])

  useEffect(() => {
    if (getDataFavoriteInitial) {
      getDataFavoriteInitial()
    } // llamo a la función que trae los datos favoritos del local storage
  }, [favoriteState])

  return (
    <>
      <button
        id={`favorito-${labelId}-${id}`}
        className={`${includeFavoriteCard(labelId, id) ? '*:text-red-500' : ''} h-fit bg-black/40 hover:bg-slate-800/80 py-2 px-2 rounded-full cursor-pointer`}
        onClick={sendFavorite}>
        <span className='sr-only'>icono de favorito</span>
        <IcoHeart
          className='text-sky-400 size-5'
        /> 
      </button>

      <dialog id='view-modal' closedby='any' onClick={requestFormModal} className='min-w-xs'> {/* closedby sirve solo en unos navegadores */}
        <p className='flex flex-col text-pretty  font-semibold'>
          No puedes suscribirte a mas de 10 favoritos si no tienes una cuenta.
          <span className='pt-2 font-bold after:content-["!"] after:text-sky-400 after:ps-0.5 before:content-["¡"] before:text-sky-400 before:pe-0.5'>Que esperas regístrate con nosotros</span>

        </p>
        <form method="dialog" className='flex w-full justify-between pt-4  font-semibold '>
          <button className='min-w-[100px] text-nowrap flex items-center justify-center py-1.5 px-3 sm:px-4 w-fit rounded-3xl transition-colors hover:shadow-md shadow-slate-800 space-x-2 bg-black/40 hover:bg-sky-400 text-slate-300 hover:text-white group font-medium duration-150'>Cancelar</button>
          <button value='registrar' className=' min-w-[100px] text-nowrap flex items-center justify-center py-1.5 px-3 sm:px-4 w-fit rounded-3xl transition-colors hover:shadow-md shadow-slate-800 space-x-2 bg-black/40 hover:bg-sky-400 text-slate-300 hover:text-white group font-medium duration-150'>Registrarme ahora</button>
        </form>
      </dialog>
    </>
  )
}
