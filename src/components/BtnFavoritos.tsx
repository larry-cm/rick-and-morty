import { IcoHeart } from '@/assets/Icons'
import { useEffect, useState } from 'react'

export function BtnFavoritos({ id, labelId, widthClase, getDataFavoriteInitial }: { id: number, labelId: string, widthClase?: string, getDataFavoriteInitial: () => void }) {

  const [favoriteState, setFavoriteState] = useState<string>()

  function sendFavorite(event: React.MouseEvent<HTMLDivElement>) {
    const target = event.currentTarget.previousElementSibling as HTMLInputElement // seleccionamos el elemento anterior al div
    setFavoriteState(() => {
      if (target) {
        const idEvent = target.id // id de la card seleccionada
        const favoritos = localStorage.getItem('favorito')

        if (favoritos) {
          const arrayFavoritos = JSON.parse(favoritos)
          if (arrayFavoritos.includes(idEvent)) { // si en mi local storage ya existe el id lo elimino
            const newArray = arrayFavoritos.filter((item: string) => item !== idEvent)
            localStorage.setItem('favorito', JSON.stringify(newArray))
            return newArray
          }
          else { // si no existe lo agrego al local storage
            const newArray = arrayFavoritos.concat(idEvent)
            localStorage.setItem('favorito', JSON.stringify(newArray))
            return newArray
          }
        }
        else { // si mi local storage no tiene nada, lo inicializo con el ud de la card seleccionada
          localStorage.setItem('favorito', JSON.stringify([idEvent]))
          return [idEvent]
        }
      }
    })
  }

  useEffect(() => {
    const favoritos = localStorage.getItem('favorito')
    if (favoritos) {
      setFavoriteState(favoritos)
      getDataFavoriteInitial && getDataFavoriteInitial() // llamo a la función que trae los datos favoritos del local storage
    }
  }, [])

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
        className={`${favoriteState?.includes(`favorito-${labelId}-${id}`) && '*:text-red-600'} h-fit bg-black/40 hover:bg-slate-800/80 py-2 px-2 rounded-full cursor-pointer`}
        onClick={sendFavorite}>
        <span className='sr-only'>icono de favorito</span>
        <IcoHeart
          className='text-sky-400 size-5'
        />
      </div>
    </label>
  )
}
