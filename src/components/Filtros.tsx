import { IcoEpisodios, IcoPersonaje, IcoLupa, IcoPlaneta, IcoTodos } from '@/assets/Icons'
import { sections } from '@/const/constantes'
import Labels from '@components/sections/Labels'
import React, { useEffect, useState, type JSX } from 'react'
import type { FiltroSelected } from '@/types/Filtros'
import RenderFilter from '@/components/RenderFilter'

const { person, episode, ubi, all } = sections

export default function Filtros({ isFavorite, resetFilterLocal }: { isFavorite?: boolean, resetFilterLocal?: boolean }): JSX.Element {
  const [filtroSelected, setFiltroSelected] = useState<FiltroSelected>(all as FiltroSelected)
  const [searchFilter, setSearchFilter] = useState<string>('')

  useEffect(() => {
    const search = localStorage.getItem('search')
    const filtro = localStorage.getItem('filtrado')

    if (resetFilterLocal && (search || filtro)) {
      localStorage.removeItem('search')
      localStorage.removeItem('filtrado')
      setSearchFilter('')
      setFiltroSelected('todos')
    } else {
      if (search) setSearchFilter(search)
      if (filtro) setFiltroSelected(filtro as FiltroSelected)
    }


  }, [])

  const handlerLocalStates = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'filtrado') {
      setFiltroSelected(() => {
        localStorage.setItem('filtrado', event.target.value)
        return event.target.value as FiltroSelected
      })
    } else {
      setSearchFilter(() => {
        localStorage.setItem('search', event.target.value.trim())
        return event.target.value.trim()
      })
    }
  }

  return (
    <> 
      <form className='flex sticky top-0 z-50 space-y-4 gap-4 py-4 bg-black/75 backdrop-blur-xs lg:gap-y-0'>
        {/* barra de búsqueda */}
        <div className='flex relative h-9 rounded-3xl group ps-0 w-full lg:w-4/12 focus-within:shadow-xs focus-within:shadow-sky-400 focus-within:ring-1 focus-within:ring-sky-400'>
          <input
            type='search'
            name='search'
            value={searchFilter}
            autoComplete='off'
            onChange={handlerLocalStates}
            id='search'
            placeholder='Búsqueda...'
            style={{}}
            className='w-full h-9 rounded-tl-3xl rounded-bl-3xl border-none transition-all appearance-none outline-none ps-4 text-slate-100 bg-slate-500/50 group-hover:bg-slate-500/80 focus-visible:bg-slate-500/80 group-hover:text-slate-300 group-hover:placeholder:text-slate-300 placeholder:text-slate-100/90 placeholder:font-medium group-focus-within:bg-slate-500/80'
          />
          {searchFilter &&
            <button
              type='button'
              onClick={() => setSearchFilter('')}
              className='absolute group-hover:text-slate-300 transition-all text-slate-100 cursor-pointer top-2 left-[88%] lg:left-9/12'>
              ✖
            </button>}
          <label
            htmlFor='search'
            className='w-1/12 h-9 cursor-pointer flex items-center justify-center rounded-tr-3xl rounded-br-3xl  text-slate-100 bg-slate-500/50 group-hover:bg-slate-500/80 focus-visible:bg-slate-500/80 group-hover:text-slate-300 group-focus-within:bg-slate-500/80 p-1.5 6px-2 lg:px-5 transition-all'
          >
            <span className='sr-only'>Lupa de búsqueda de los filtros</span>
            <IcoLupa className='size-5 min-w-5' />
          </label>
        </div>
        {/* secciones */}

        <fieldset
          className='flex flex-wrap gap-4 md:items-start items-start icons-cards *:*:cursor-pointer *:*:transition-all'
          id='filtros'
        >
          {/* <b className='inline-block text-nowrap text-xl py-1.5 text-slate-100/90'> Filtrar por :</b> */}
          <Labels id={all} manejoEstado={{ filtroSelected, handlerLocalStates }}>
                <i><IcoTodos className='size-5' /></i>
            <span>Todos</span>
            </Labels>
          <Labels id={person} manejoEstado={{ filtroSelected, handlerLocalStates }}>
                <i><IcoPersonaje className='size-5' /></i>
            <span>Personajes</span>
            </Labels>
          <Labels id={episode} manejoEstado={{ filtroSelected, handlerLocalStates }}>
                <i><IcoEpisodios className='size-5' /></i>
            <span>Episodios</span>
            </Labels>
          <Labels id={ubi} manejoEstado={{ filtroSelected, handlerLocalStates }}>
                <i><IcoPlaneta className='size-5' /></i>
            <span>Localizaciones</span>
            </Labels>
        </fieldset>
      </form>
      <RenderFilter filtroSelected={filtroSelected} searchFilterInitial={searchFilter} isFavorite={isFavorite} />
    </>
  )
}
