import { CardsEpisodios, CardsUbicaciones } from '@components/cards/Cards'
import { DefaultNotFound, FilterCollection } from "@/services/filtrado"
import { sections, widthClases } from "@/const/constantes"
import MainArea from '@components/sections/MainArea'
import { lazy, Suspense, useEffect, useState } from "react"
import { fetchApi } from '@/services/fetch'

import type { APICharacter, APIEpisode, APILocation } from "@/types/Api";
import type { Collections, FiltroSelected, RequestFilter } from "@/types/Filtros"
import type { Result, ResultEpisode, ResultLocation } from '@/types/Api'

const { person, episode, ubi, all } = sections
const CardsPersonajes = lazy(() => import('@components/cards/Personajes.tsx'))
export default function VistaFiltro({ filtroSelected, searchFilterInitial }: { filtroSelected: FiltroSelected, searchFilterInitial: string }) {
    const [hijosInitial, setHijosInitial] = useState<RequestFilter | null>(null)
    const [hijosState, setHijosState] = useState<RequestFilter>()
    const [arraySorted, setArraySorted] = useState<Collections[]>([])
    let personajes, ubicaciones, episodios
    (hijosInitial) && ({ personajes, ubicaciones, episodios } = hijosInitial)

    const viewFilter = {
        personajes: (
            <MainArea key={person} title={person} widthGrid={widthClases.grande}>
                {DefaultNotFound(personajes, searchFilterInitial, (personajes) => personajes
                    .map(
                        ({
                            id, name, status, species, origin, image

                        }) => (
                            <Suspense key={id} fallback={<div className='bg-slate-700 animate-pulse size-full text-white'>🎯 cargando ...</div>}>
                                <CardsPersonajes
                                    id={id}

                                    name={name}
                                    status={status}
                                    species={species}
                                    origin={origin}
                                    image={image} />
                            </Suspense>
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

    // pidiendo los datos
    useEffect(() => {
        const fetchAllData = async () => {
            const { results: personajes } = (await fetchApi("character")) as APICharacter
            const { results: episodios } = (await fetchApi("episode")) as APIEpisode
            const { results: ubicaciones } = (await fetchApi("location")) as APILocation
            if (personajes && episodios && ubicaciones) {
                setHijosInitial({ personajes, episodios, ubicaciones }) // Validación correcta
            }
        }
        fetchAllData()
    }, [])
    //filtrando los datos
    useEffect(() => {
        if (hijosInitial) {
        const hijosFiltered = { ...hijosInitial }
            setHijosState(() => {
                for (const hijo in hijosFiltered) {
                    hijosFiltered[hijo as keyof typeof hijosFiltered] = FilterCollection(hijosFiltered[hijo as keyof typeof hijosFiltered], searchFilterInitial) as unknown as Result[] & ResultEpisode[] & ResultLocation[]
                }
                return hijosFiltered
            })
        }
    }, [searchFilterInitial, hijosInitial])
    // organizando los datos a mi manera
    useEffect(() => {
        const hijosFiltered = { ...hijosState }
        const arraySon: Collections[] = Object.values(hijosFiltered)
        const arrayKeys: string[] = Object.keys(hijosFiltered)
        const sorted = (ar: Collections[]) => ar.sort((a, b) => a.length - b.length)

        arraySon.forEach((_, i) => arraySon[i].context = arrayKeys[i]); // poniéndoles contexto

        setArraySorted(() => {
            return arraySon[0]?.length >= 1 && arraySon[0]?.context === person
                ? arraySon?.slice(0, 1).concat(sorted(arraySon?.slice(1, 3)))
                : sorted(arraySon)
        })
        console.log(sorted(arraySon?.slice(0, 1).concat(arraySon?.slice(1, 3))));
        console.log(arraySon);

    }, [hijosState])

    if (filtroSelected === all) return arraySorted?.map((section) => (viewFilter[section.context as keyof typeof viewFilter]))
    return viewFilter[filtroSelected as keyof typeof viewFilter]
}