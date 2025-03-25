import { CardsEpisodios, CardsPersonajes, CardsUbicaciones } from '@components/cards/Cards'
import { DefaultNotFound, FilterCollection } from "@/services/filtrado"
import { sections, widthClases } from "@/const/constantes"
import MainArea from '@components/sections/MainArea'

import type { Collections, FiltroSelected, RequestFilter } from "@/types/Filtros"
import { useEffect, useState } from "react"
import type { Result, ResultEpisode, ResultLocation } from '@/types/Api'

const { person, episode, ubi, all } = sections

export default function VistaFiltro({ filtroSelected, searchFilterInitial, hijosInitial }: { filtroSelected: FiltroSelected, searchFilterInitial: string, hijosInitial: RequestFilter }) {
    const { personajes, episodios, ubicaciones } = hijosInitial
    const [arraySorted, setArraySorted] = useState<Collections[]>([])
    // const [hijosState, setHijosState] = useState<RequestFilter>()

    const viewFilter = {
        personajes: (
            <MainArea key={person} title={person} widthGrid={widthClases.grande}>
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
            <MainArea key={episode} title={episode} widthGrid={widthClases.mediano}>
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
            <MainArea key={ubi} title={ubi} widthGrid={widthClases.pequeño}>
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

    useEffect(() => {
        const hijosFiltered = { ...hijosInitial }
        const arraySon: Collections[] = Object.values(hijosFiltered)
        const arrayKeys: string[] = Object.keys(hijosFiltered)
        const sorted = (ar: Collections[]) => ar.sort((a, b) => a.length - b.length)

        for (const hijo in hijosFiltered) {
            hijosFiltered[hijo as keyof typeof hijosFiltered] = FilterCollection(hijosFiltered[hijo as keyof typeof hijosFiltered], searchFilterInitial) as unknown as Result[] & ResultEpisode[] & ResultLocation[]
        }

        arraySon.forEach((_, i) => arraySon[i].context = arrayKeys[i]); // poniéndoles contexto

        setArraySorted(() => {
            return arraySon[0]?.length >= 1 && arraySon[0]?.context === person
                ? sorted(arraySon?.slice(0, 1).concat(arraySon?.slice(1, 3)))
                : sorted(arraySon)
        })
    }, [searchFilterInitial])

    useEffect(() => {

    }, [])

    if (filtroSelected === all) return arraySorted.map((section) => (viewFilter[section.context as keyof typeof viewFilter]))
    return viewFilter[filtroSelected as keyof typeof viewFilter]
}