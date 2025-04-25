import { IconBrokenHeart, IcoHeart, IcoTodos } from '@/assets/Icons'
import React, { useEffect, useState } from 'react'
import { type FullF } from '@/types/Filtros'
import { reformatSections, sections } from '@/const/constantes'

export function AreaTitle({ title, updateFavorites, numElements, btnFilter }: { title: string, btnFilter: (e: React.MouseEvent<HTMLButtonElement | HTMLLIElement>) => void, updateFavorites?: () => void, numElements?: number }) {
  function removeFavorites() {
    const favoritos = localStorage.getItem('favorito')
    if (favoritos) {
      const favoritosParse = JSON.parse(favoritos) as FullF
      const key = reformatSections[title as keyof typeof reformatSections]
      if (favoritosParse[key as keyof typeof favoritosParse].length) {
        favoritosParse[key as keyof typeof favoritosParse] = []
        localStorage.removeItem('favorito')
        localStorage.setItem('favorito', JSON.stringify(favoritosParse))
      }
    }
    updateFavorites && updateFavorites()
  }

  function closeClick() {
    setOptions({ personajes: false, episodios: false, ubicaciones: false })
  }

  function Buttons({ children, notColorBtn, onC }: { children: React.ReactNode, notColorBtn?: boolean, onC?: (() => void) | ((e: any) => void) }) {
    return <button
      onClick={onC}
      type='button'
      data-title={title}
      id={`btn-filter-${title}`}
      className={`flex ease-in-out transition-colors items-center space-x-2 px-4 py-1.5 rounded-3xl shadow-md shadow-slate-500/25 text-slate-100/85 hover:text-slate-50  hover:backdrop-brightness-150 h-9 
  ${notColorBtn ? 'bg-sky-400/80 *:hover:cursor-text' : 'bg-slate-500/50 hover:bg-slate-500/80 hover:shadow-slate-500/60 cursor-pointer'}`}
    >
      {children}
    </button>
  }


  const [option, setOptions] = useState<{ personajes: boolean, episodios: boolean, ubicaciones: boolean }>({ personajes: false, episodios: false, ubicaciones: false })
  const OptionPerson = () => {
    return (
      <>
        <details className='details' name={`detalle-${title}`}>
          <summary>Estado</summary>
          <ul>
            <li onClick={btnFilter} data-title={title} data-value={'Alive'} className='cursor-pointer rounded-full hover:bg-sky-500/80'>Alive</li>
            <li onClick={btnFilter} data-title={title} data-value={'Dead'} className='cursor-pointer rounded-full hover:bg-sky-500/80'>Death</li>
            <li onClick={btnFilter} data-title={title} data-value={sections.all} className='cursor-pointer rounded-full hover:bg-sky-500/80'>All</li>
          </ul>
        </details>
        <details className='details' name={`detalle-${title}`}>
          <summary>Especie</summary>
          <ul>
            <li>h </li>
            <li>e</li>
            <li>32</li>

          </ul>
        </details>
        <details className='details' name={`detalle-${title}`}>
          <summary>Origen</summary>
          <ul>
            <li>a</li>
            <li>o </li>
            <li>33</li>
          </ul>
        </details>
      </>
    )

  }

  const listaOptions = {
    personajes: (
      <>
        <OptionPerson />

      </>
    ),
    episodios: (
      <>
        <li onClick={closeClick} className='cursor-pointer rounded-full hover:bg-sky-500/80'>Capitulo</li>
        <li onClick={closeClick} className='cursor-pointer rounded-full hover:bg-sky-500/80'>Temporada</li>
      </>
    ),
    ubicaciones: (
      <>
        <li onClick={(e) => {
          btnFilter(e)
          closeClick()
        }}
          data-title={title} data-value='dimension'
          className='cursor-pointer rounded-full hover:bg-sky-500/80'>Dimension</li>
        <li onClick={closeClick} className='cursor-pointer rounded-full hover:bg-sky-500/80'>Futuro</li>
      </>
    )
  }


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const button = document.getElementById(`btn-filter-${title}`);
      const menu = button?.nextElementSibling as HTMLElement;

      if (button && menu && !button.contains(event.target as Node) && !menu.contains(event.target as Node)) {
        closeClick()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    };
  }, [title])

  return (
    <>
      <fieldset className='flex flex-wrap mb-8 space-x-4 space-y-4 sm:space-x-4 sm:space-y-4 text-nowrap'>
        <h2 className='text-3xl font-bold text-slate-100/90'>{title ?? 'Personajes de ejemplo'}</h2>
        <a
          className='flex cursor-pointer ease-in-out transition-colors items-center space-x-2 px-4 py-1.5 rounded-3xl shadow-md shadow-slate-500/25 bg-slate-500/50 text-slate-100/85 hover:text-slate-50 hover:shadow-slate-500/60 hover:bg-slate-500/80  hover:backdrop-brightness-150 h-9'
          href={reformatSections[title as keyof typeof reformatSections]?.concat('s')}>
          <i><IcoTodos className='size-5' /></i>
          <span>Ver todos</span>
        </a>
        <div className='relative'>
          <Buttons onC={() => setOptions((prev) => ({ ...prev, [title as keyof typeof prev]: !prev[title as keyof typeof prev] }))}>
            <i data-title={title} className='bg-[url(filter.svg)] object-cover bg-position-[0rem_-0.1rem] size-6 bg-no-repeat'></i>
            <span data-title={title}>Ordenar por </span>
          </Buttons>
          {
            option[title as keyof typeof option] && (
            <ul
                onMouseLeave={closeClick}
                className='absolute min-w-40 z-20 -left-8 top-14 flex flex-col drop-shadow-slate-950 drop-shadow-xl text-slate-100/90 bg-slate-600/70 gap-2 rounded-lg py-2 px-4 *:bg-slate-700/50 *:px-4 *:py-1.5 *:transition-colors'>
              {listaOptions[title as keyof typeof listaOptions]}
              </ul>
            )
          }
        </div>
        <Buttons onC={removeFavorites}>
          <i><IconBrokenHeart className='size-5' /></i>
          <span>Dejar de seguir la sección </span>
        </Buttons>
        <Buttons notColorBtn>
          <i><IcoHeart className={`size-5 ${numElements && 'text-red-500 drop-shadow drop-shadow-red-400/50'}`} /></i>
          <span>Numero de favoritos :  <div className='ps-.5 inline-block'>{numElements ?? 0}</div></span>
        </Buttons>
      </fieldset>


    </>
  )
}

export default function MainArea({ title, widthGrid, children, updateFavorites, numElements, btnFilter }: { title: string, widthGrid: string, children: React.ReactNode, btnFilter: (e: React.MouseEvent<HTMLButtonElement | HTMLLIElement>) => void, updateFavorites?: () => void, numElements?: number }) {

  return (
    <section id={title}>
      <AreaTitle title={title} numElements={numElements} updateFavorites={updateFavorites} btnFilter={btnFilter} />
      <div className={`grid ${widthGrid ?? "grid-cols-[repeat(auto-fill,minmax(200px,1fr))]"} gap-4`}>
        {
          children
        }
      </div>
    </section>
  )
}



