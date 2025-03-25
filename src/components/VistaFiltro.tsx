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
    const [hijosState, setHijosState] = useState<RequestFilter>()

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
        for (const x in hijosFiltered) {
            hijosFiltered[x as keyof typeof hijosFiltered] = FilterCollection(hijosFiltered[x as keyof typeof hijosFiltered], searchFilterInitial) as unknown as Result[] & ResultEpisode[] & ResultLocation[]
        }
        setHijosState(hijosFiltered)
    }, [searchFilterInitial])

    useEffect(() => {
        const hijosFiltered = { ...hijosState }
        const arraySon: Collections[] = Object.values(hijosFiltered)
        const arrayKeys: string[] = Object.keys(hijosFiltered)
        arraySon.forEach((_, i) => arraySon[i].context = arrayKeys[i]); // poniéndoles contexto
        arraySon[0]?.length >= 1 && arraySon[0]?.context === person
            ? setArraySorted(arraySon?.slice(0, 1).concat(arraySon?.slice(1, 3)))
            : setArraySorted(arraySon?.sort((a, b) => b?.length - a?.length))
    }, [hijosState])

    if (filtroSelected === all) return arraySorted.map((section) => (viewFilter[section.context as keyof typeof viewFilter]))
    return viewFilter[filtroSelected as keyof typeof viewFilter]
}