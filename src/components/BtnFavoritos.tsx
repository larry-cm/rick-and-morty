import { IcoHeart } from '@/assets/Icons'
import { useEffect, useState } from 'react'

export function BtnFavoritos ({ id, labelId, widthClase }: { id: number, labelId: string, widthClase?: string }) {
  const [favoriteState, setFavoriteState] = useState()

  useEffect(() => {
    const favoritos = localStorage.getItem('favorito')
    if (favoritos) console.log(favoritos)
  }, [])
  function handleFavorite(event: React.MouseEvent<HTMLDivElement>) {

  }

  return (
    <label
      htmlFor={`favorito-${labelId}-${id}`}
      className={`flex ${widthClase ?? 'w-1/4'} flex-row-reverse pt-0 h-fit `}
    >
      <input
        type='checkbox'
        name={`favorito-id-#`}
        className='sr-only peer'
        id={`favorito-${labelId}-${id}`}
      />
      <div className='peer-checked:*:text-red-600 h-fit bg-black/40 hover:bg-slate-800/80 py-2 px-2 rounded-full cursor-pointer'
        onClick={handleFavorite}>
        <span className='sr-only'>icono de favorito</span>
        <IcoHeart
          className='text-sky-400 size-5'
        />
      </div>
    </label>
  )
}
