import { BrokenHeart, IcoHeart, IcoTodos } from '@/assets/Icons'
import type React from 'react'
import { type FullF } from '@/types/Filtros'
import { sectionToFavoriteMap } from '@/const/constantes'

export function AreaTitle({ title, updateFavorites, numElements }: { title: string, updateFavorites?: () => void, numElements?: number }) {
  function removeFavorites() {
    const favoritos = localStorage.getItem('favorito')
    if (favoritos) {
      const favoritosParse = JSON.parse(favoritos) as FullF
      const key = sectionToFavoriteMap[title as keyof typeof sectionToFavoriteMap]
      favoritosParse[key as keyof typeof favoritosParse] = []
      localStorage.removeItem('favorito')
      localStorage.setItem('favorito', JSON.stringify(favoritosParse))
    }
    updateFavorites && updateFavorites()
  }

  function Buttons({ children, onC }: { children: React.ReactNode, onC?: () => void }) {
    return <button
      onClick={onC}
      className='flex cursor-pointer ease-in-out transition-colors items-center space-x-2 px-4 py-1.5 rounded-3xl shadow-md shadow-slate-500/25 bg-slate-500/50 text-slate-100/85 hover:text-slate-50 hover:shadow-slate-500/60 hover:bg-slate-500/80  hover:backdrop-brightness-150 h-9'
      type='button'
    >
      {children}
    </button>
  }

  return (
    <fieldset className='flex space-x-4 sm:space-x-4 space-y-4 sm:space-y-4 mb-8 text-nowrap flex-wrap'>
      <h2 className='font-bold text-slate-100/90 text-3xl'>{title ?? 'Personajes de ejemplo'}</h2>

      <a
        className='flex cursor-pointer ease-in-out transition-colors items-center space-x-2 px-4 py-1.5 rounded-3xl shadow-md shadow-slate-500/25 bg-slate-500/50 text-slate-100/85 hover:text-slate-50 hover:shadow-slate-500/60 hover:bg-slate-500/80  hover:backdrop-brightness-150 h-9'
        href={sectionToFavoriteMap[title as keyof typeof sectionToFavoriteMap]?.concat('s')}>
        <i><IcoTodos className='size-5' /></i>
        <span>Ver todos</span>
      </a>
      <Buttons onC={removeFavorites}>
        <i><BrokenHeart className='size-5' /></i>
        <span>Dejar de seguir la sección </span>
      </Buttons>
      <Buttons>
        <i><IcoHeart className='size-5' /></i>
        <span>Numero de favoritos :  <div className='ps-.5 inline-block'>{numElements ?? 0}</div></span>
      </Buttons>
    </fieldset>
  )
}

export default function MainArea({ title, widthGrid, children, updateFavorites, numElements }: { title: string, widthGrid: string, children: React.ReactNode, updateFavorites?: () => void, numElements?: number }) {
  return (
    <section id={title}>
      <AreaTitle title={title} numElements={numElements} updateFavorites={updateFavorites} />
      <div className={`grid ${widthGrid ?? 'grid-cols-[repeat(auto-fill,minmax(200px,1fr))]'} gap-4`}>
        {
          children
        }
      </div>
    </section>
  )
}
