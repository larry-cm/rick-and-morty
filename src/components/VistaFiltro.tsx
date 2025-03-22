import { CardsEpisodios, CardsPersonajes, CardsUbicaciones } from '@components/cards/Cards'
import { DefaultNotFound, FilterCollection } from "@/services/filtrado"
import { sections, widthClases } from "@/const/constantes"
import MainArea from '@components/sections/MainArea'

import type { Collections, FiltroSelected, RequestFilter } from "@/types/Filtros"
import type { JSX } from "react"

const { person, episode, ubi, all } = sections

function Orden({ hijosInitial, searchFilterInitial, viewFilterInitial }: { hijosInitial: RequestFilter, searchFilterInitial: string, viewFilterInitial: { personajes: JSX.Element, episodios: JSX.Element, ubicaciones: JSX.Element } }) {
    for (const x in hijosInitial) {
        hijosInitial[x as keyof typeof hijosInitial] = FilterCollection(hijosInitial[x as keyof typeof hijosInitial], searchFilterInitial)
    }

    const arraySon = Object.values(hijosInitial)
    const arrayKeys = Object.keys(hijosInitial)
    let arraySorted: any[] = []

    arraySon.forEach((_, i) => {
        arraySon[i]['context'] = arrayKeys[i]

        if (arraySon[i]['context'] === person && arraySon[i].length > 4) {
            console.log('deberían estar las imágenes arriba')
            arraySorted = arraySon.slice(0, 1)
            // let addEnd = arraySon
            console.log(arraySon);
            console.log(arraySon[i]);
            arraySorted = arraySorted.concat(arraySon.slice(1, 3))
            console.log(arraySorted);
        } else arraySorted = arraySon.sort((a, b) => b.length - a.length)
        console.log(arraySorted);

    })



    return arraySorted.map((section: { context: string }) => (viewFilterInitial[section.context as keyof typeof viewFilterInitial]))
}



export default function VistaFiltro({ filtroSelected, searchFilterInitial, hijosInitial }: { filtroSelected: FiltroSelected, searchFilterInitial: string, hijosInitial: RequestFilter }) {
    const { personajes, episodios, ubicaciones } = hijosInitial
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