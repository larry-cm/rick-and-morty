import { CardsEpisodios, CardsPersonajes, CardsUbicaciones } from '@components/cards/Cards'
import { FilterCollection } from "@/services/filtrado"
import { NotFound } from '@components/NotFound'
import { sections, widthClases } from "@/const/constantes"
import MainArea from '@components/sections/MainArea'

import type { FiltroSelected, GroupResult, RequestFilter } from "@/types/Filtros"
import type { JSX } from "react"
import type { Result, ResultEpisode, ResultLocation } from '@/types/Api'

const { person, episode, ubi, all } = sections

function Orden({ hijosInitial, searchFilterInitial, viewFilterInitial }: { hijosInitial: RequestFilter, searchFilterInitial: string, viewFilterInitial: { personajes: JSX.Element, episodios: JSX.Element, ubicaciones: JSX.Element } }) {
    for (const x in hijosInitial) {
        hijosInitial[x as keyof typeof hijosInitial] = FilterCollection(hijosInitial[x as keyof typeof hijosInitial], searchFilterInitial)
    }

    const arraySon = Object.values(hijosInitial)
    const arrayKeys = Object.keys(hijosInitial)

    arraySon.forEach((_, i) => {
        arraySon[i]['context'] = arrayKeys[i]
        if (arraySon[i]['context'] === person && arraySon[i].length > 4) {
            console.log('deberían estar las imágenes arriba')
        }
    })
    const arraySorted = arraySon.sort((a, b) => b.length - a.length)

    return arraySorted.map((section: { context: string }) => (viewFilterInitial[section.context as keyof typeof viewFilterInitial]))
}

const DefaultNotFound = (collection: Result[] | ResultLocation[] | ResultEpisode[], searchFilterInitial: string, code: (collection: GroupResult[]) => JSX.Element[], fallback = <NotFound />) => FilterCollection(collection, searchFilterInitial).length !== 0 ? code(FilterCollection(collection, searchFilterInitial)) : fallback

export default function VistaFiltro({ filtroSelected, searchFilterInitial, hijosInitial }: { filtroSelected: FiltroSelected, searchFilterInitial: string, hijosInitial: RequestFilter }) {
    const { personajes, episodios, ubicaciones } = hijosInitial
    const viewFilter = {
        personajes: (
            <MainArea title={person} widthGrid={widthClases.grande}>
                {DefaultNotFound(personajes, searchFilterInitial, (personajes) => personajes
                    .map(
                        ({
                            id, name, status, species, origin, image

                        }) => (
                            <CardsPersonajes
                                id={id}
                                key={id}
                                name={name}
                                status={status}
                                species={species}
                                origin={origin}
                                image={image} />
                        )
                    ))}
            </MainArea>
        ),
        episodios: (
            <MainArea title={episode} widthGrid={widthClases.mediano}>
                {DefaultNotFound(episodios, searchFilterInitial, (episodios) => episodios
                    .map(({ id, name, episode }) => (
                        <CardsEpisodios
                            id={id}
                            key={id}
                            name={name}
                            episode={episode.toString()} />
                    )))}
            </MainArea>
        ),
        ubicaciones: (
            <MainArea title={ubi} widthGrid={widthClases.pequeño}>
                {DefaultNotFound(ubicaciones, searchFilterInitial, (ubicaciones) => ubicaciones.map(({ id, name, dimension }) => (
                    <CardsUbicaciones
                        id={id}
                        key={id}
                        name={name}
                        dimension={dimension} />
                )))}
            </MainArea>
        )
    }

    if (filtroSelected === all) return (
        < Orden
            searchFilterInitial={searchFilterInitial}
            viewFilterInitial={viewFilter}
            hijosInitial={{
                personajes,
                episodios,
                ubicaciones
            }} />
    )
    return viewFilter[filtroSelected as keyof typeof viewFilter]
}