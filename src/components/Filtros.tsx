import { IcoEpisodios, IcoPersonaje, IcoLupa, IcoPlaneta, IcoTodos } from '@/assets/Icons'
import { sections } from '@/const/constantes'
import Labels from '@components/sections/Labels'
import React, { Children, use, useEffect, useState, type JSX } from 'react'
import type { CollectionContexts, FiltroSelected, FullF, RequestFilter } from '@/types/Filtros'
import RenderFilter from '@/components/RenderFilter'
import { fetchApi, fetchForOne } from '@/services/fetch'
import { FilterElements, SortedElements } from '@/services/filtrado'
import type { APICharacter, APIEpisode, APILocation, Result, ResultEpisode, ResultLocation } from '@/types/Api'

const { person, episode, ubi, all } = sections
const promisePersonajes = fetchApi("character")
const promiseEpisodios = fetchApi("episode")
const promiseUbicaciones = fetchApi("location")

export default function Filtros({ isFavorite }: { isFavorite?: boolean }): JSX.Element {
  const [filtroSelected, setFiltroSelected] = useState<FiltroSelected>(all as FiltroSelected)
  const [searchFilter, setSearchFilter] = useState<string>('')

  const [arrayInitial, setArrayInitial] = useState<FullF | null>(null)
  const [hijosFavoritos, setHijosFavoritos] = useState<RequestFilter | null>(null)
  const [hijosState, setHijosState] = useState<RequestFilter>()
  const [arraySorted, setArraySorted] = useState<CollectionContexts[]>([])

  // pidiendo los datos con api use
  const { results: personajes } = use(promisePersonajes) as APICharacter
  const { results: episodios } = use(promiseEpisodios) as APIEpisode
  const { results: ubicaciones } = use(promiseUbicaciones) as APILocation
  const hijosFor = { personajes, episodios, ubicaciones }
  //  pidiendo datos favoritos en local storage
  function getDataFavorite() {
    const favoritos = localStorage.getItem('favorito')
    const favParse: FullF = JSON.parse(favoritos ?? '{"character":[], "episode": [],"location": []}')

    setArrayInitial(prevArray => {
      if (JSON.stringify(prevArray) !== JSON.stringify(favParse)) {
        return favParse
      }
      return prevArray
    })
  }

  function filterButton(event: React.MouseEvent<HTMLButtonElement | HTMLLIElement>) {
    const target = event?.target as HTMLButtonElement
    const dataTitle = target.getAttribute('data-title')
    const dataValue = target.getAttribute('data-value')
    if (target && dataTitle && dataValue) {
      setHijosState(prev => {
        const dataBase = isFavorite ? hijosFavoritos : hijosFor
        if (dataBase) {
          const filtrado = FilterElements(dataBase, searchFilter)
          const key = dataTitle as keyof typeof filtrado
          const sec = filtrado[key]


          const useForSec = {
            personajes: sec.filter((item) => {
              if ('status' in item) {
                if (dataValue === 'todos') return true
                return (item as Result).status.match(dataValue)
              }
              return false
            }),
            episodios: sec.filter((item) => {
              if ('air_date' in item) {
                return (item as ResultEpisode).air_date === 'December 20, 2017'
              }
              return false
            }),
            ubicaciones: sec.filter((item) => {
              if ('dimension' in item) {
                return (item as ResultLocation).name.match('Earth') ||
                  (item as ResultLocation).name.match('Citadel')
              }
              return false
            })
          }

          const newFiltrado = {
            ...filtrado,
            [key]: useForSec[key]
          }

          return newFiltrado
        }
        return prev
      })
    }
  }

  function handlerLocalStates(event: React.ChangeEvent<HTMLInputElement>) {
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

  //  pidiendo datos favoritos en local storage la primera vez que se entra y cada vez que den click a botón de favoritos
  useEffect(() => {
    getDataFavorite()
  }, [])

  useEffect(() => {
    if (!arrayInitial) return
    fetchForOne(arrayInitial)
      .then(data => {
        const nuevo = {
          personajes: data[0],
          episodios: data[1],
          ubicaciones: data[2]
        } as RequestFilter
        setHijosFavoritos(prev => {
          // Solo actualiza si realmente cambió
          if (JSON.stringify(prev) !== JSON.stringify(nuevo)) {
            return nuevo
          }
          return prev
        })
      })
      .catch(error => console.error(error))

  }, [arrayInitial])

  // Filtrando los datos solo si cambian los datos base
  useEffect(() => {
    if (isFavorite) {
      if (hijosFavoritos) {
        setHijosState(prev => {
          const filtrado = FilterElements(hijosFavoritos, searchFilter)
          if (JSON.stringify(prev) !== JSON.stringify(filtrado)) {
            return filtrado
          }
          return prev
        })
      }
    } else {
      setHijosState(prev => {
        const filtrado = FilterElements(hijosFor, searchFilter)
        if (JSON.stringify(prev) !== JSON.stringify(filtrado)) {
          return filtrado
        }
        return prev
      })
    }
  }, [searchFilter, hijosFavoritos, isFavorite])

  // organizando los datos a mi manera solo si hijosState cambia
  useEffect(() => {
    setArraySorted(prev => {
      const ordenado = SortedElements(hijosState)
      if (JSON.stringify(prev) !== JSON.stringify(ordenado)) {
        return ordenado
      }
      return prev
    })
  }, [hijosState])

  return (
    <> 
      <form className='flex flex-col sm:flex-row sticky top-0 z-50 space-y-4 gap-4 py-4 bg-black/75 backdrop-blur-xs lg:gap-y-0'>
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

      <RenderFilter filtroSelected={filtroSelected} searchFilterInitial={searchFilter} filterButton={filterButton} getDataFavorite={getDataFavorite} hijosState={hijosState} arraySorted={arraySorted} arrayInitial={arrayInitial} />
    </>
  )
}
