import { IcoEpisodios, IcoPersonaje, IcoLupa, IcoPlaneta, IcoTodos } from '@/assets/Icons'
import { sections } from '@/const/constantes'
import Labels from '@components/sections/Labels'
import React, { useEffect, useState, type JSX } from 'react'
import type { FiltroSelected, RequestFilter } from '@/types/Filtros'
import VistaFiltro from '@/components/VistaFiltro'

const { person, episode, ubi, all } = sections

export default function Filtros({ personajes, episodios, ubicaciones }: RequestFilter): JSX.Element {
  const [filtroSelected, setFiltroSelected] = useState<FiltroSelected>(all)
  const [searchFilter, setSearchFilter] = useState<string>('')

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltroSelected(event.target.value)
  }

  const handlerSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(() => {
      if (event.target.value.trim() !== undefined) return event.target.value
      return ''
    })
  }


  useEffect(() => {
    console.log(searchFilter)

  }, [searchFilter])

  return (
    <>
      <form className='flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-14'>
        <div className='ps-0 flex w-full group lg:w-3/4'>
          <input
            type='text'
            name='search'
            autoComplete='on'
            onChange={handlerSearch}
            id='search'
            placeholder='Personajes. localizaciones, episodios y mucho más...'
            className='border-none rounded-tl-3xl ps-4 h-9 rounded-bl-3xl transition-all bg-slate-500/50 group-hover:bg-slate-500/80 outline-none focus-visible:bg-slate-500/80 group-hover:placeholder:text-slate-300 peer w-[90%] placeholder:text-slate-100/90 placeholder:font-medium'
          />
          <label
            htmlFor='search'
            className='w-[10%] cursor-pointer flex items-center justify-center rounded-tr-3xl rounded-br-3xl bg-slate-500/50 group-hover:bg-slate-500/80 group-hover:text-slate-300 peer-focus:bg-slate-500/80 p-1.5 6px-2 lg:px-5 transition-all'
          >
            <span className='sr-only'>Lupa de búsqueda de los filtros</span>
            <IcoLupa className='size-5 min-w-5' />
          </label>
        </div>
        <div
          id='filtros'
          className='flex flex-col md:flex-row md:items-center lg:justify-end lg:space-x-2 gap-y-2 md:gap-y-0 md:space-x-1 relative w-full'
        >
          <legend className='text-nowrap text-slate-200/80 relative top-1/2'> Filtrar por :</legend>
          <fieldset
            className='flex flex-wrap lg:flex-nowrap gap-3 icons-cards *:*:cursor-pointer *:*:transition-all'
          >
            <Labels valor='todos' id='todas-opciones' manejoEstado={{ filtroSelected, handleFilter }}>
              <>
                <i><IcoTodos className='size-5' /></i>
                <span>Todos</span>
              </>
            </Labels>
            <Labels valor={person} id={person} manejoEstado={{ filtroSelected, handleFilter }}>
              <>
                <i><IcoPersonaje className='size-5' /></i>
                <span>Personajes</span>
              </>
            </Labels>
            <Labels valor={episode} id={episode} manejoEstado={{ filtroSelected, handleFilter }}>
              <>
                <i><IcoEpisodios className='size-5' /></i>
                <span>Episodios</span>
              </>
            </Labels>
            <Labels valor={ubi} id={ubi} manejoEstado={{ filtroSelected, handleFilter }}>
              <>
                <i><IcoPlaneta className='size-5' /></i>
                <span>Localizaciones</span>
              </>
            </Labels>
          </fieldset>
        </div>
      </form>
      <VistaFiltro
        filtroSelected={filtroSelected}
        searchFilterInitial={searchFilter}
        hijosInitial={{
          personajes,
          episodios,
          ubicaciones
        }} />
    </>
  )
}
