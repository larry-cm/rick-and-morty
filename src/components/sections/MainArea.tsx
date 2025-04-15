import { BrokenHeart, IcoHeart, IcoTodos } from '@/assets/Icons'
import type React from 'react'

export function AreaTitle({ title, updateFavorites, numElements }: { title: string, updateFavorites?: () => void, numElements?: number }) {
  function removeFavorites() {
    if (localStorage.getItem('favorito')) {
      localStorage.removeItem('favorito'); // en ves de quitarlo todo hago un set quitándole lo que quiera
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
    <article className='flex space-x-2 sm:space-x-4 space-y-2 sm:space-y-4 mb-8 text-nowrap flex-wrap'>
      <h2 className='font-bold text-white text-3xl'>{title ?? 'Personajes de ejemplo'}</h2>

      <Buttons>
        <i><IcoTodos className='size-5' /></i>
        <span>Ver todos</span>
      </Buttons>
      <Buttons onC={removeFavorites}>
        <i><BrokenHeart className='size-5' /></i>
        <span>Dejar de seguir todas </span>
      </Buttons>
      <Buttons>
        <i><IcoHeart className='size-5' /></i>
        <span>Numero de favoritos :  <div className='ps-.5 inline-block'>{numElements ?? 0}</div></span>
      </Buttons>
    </article>
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
