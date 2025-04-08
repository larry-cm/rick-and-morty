import { FallbackSection, FilterElements, SortedElements } from "@/services/filtrado"
import { sections } from "@/const/constantes"
import { lazy, Suspense, useEffect, use, useState } from "react"
import { fetchApi, fetchForOne } from '@/services/fetch'

import type { APICharacter, APIEpisode, APILocation } from "@/types/Api";
import type { CollectionContexts, FiltroSelected, RequestFilter } from "@/types/Filtros"

const ViewFilter = lazy(() => import('@components/ViewFilter.tsx'))

const promisePersonajes = fetchApi("character")
const promiseEpisodios = fetchApi("episode")
const promiseUbicaciones = fetchApi("location")

export default function RenderFilter({ filtroSelected, searchFilterInitial, isFavorite }: { filtroSelected: FiltroSelected, searchFilterInitial: string, isFavorite?: boolean }) {
    const [hijosFavoritos, setHijosFavoritos] = useState<RequestFilter | null>(null)
    const [hijosState, setHijosState] = useState<RequestFilter>()
    const [arraySorted, setArraySorted] = useState<CollectionContexts[]>([])
    // pidiendo los datos
    const { results: personajes } = use(promisePersonajes) as APICharacter
    const { results: episodios } = use(promiseEpisodios) as APIEpisode
    const { results: ubicaciones } = use(promiseUbicaciones) as APILocation
    const hijosFor = { personajes, episodios, ubicaciones }

    useEffect(() => {
        if (isFavorite) {
            fetchForOne()
                .then(data => setHijosFavoritos({
                    personajes: data[0],
                    episodios: data[1],
                    ubicaciones: data[2]
                } as RequestFilter),
                    (error) => console.error(error))
        } 

    }, [isFavorite])

    //filtrando los datos
    useEffect(() => {
        setHijosState(() => {
        if (hijosFor) {
            const hijosFiltered = { ...hijosFavoritos ?? hijosFor }
            return FilterElements(hijosFiltered, searchFilterInitial)        
            }
            return hijosFor
        })
    }, [searchFilterInitial, hijosFavoritos])

    // organizando los datos a mi manera
    useEffect(() => {
        setArraySorted(SortedElements(hijosState))
    }, [hijosState])

    return filtroSelected === sections.all && arraySorted ?
        arraySorted.map((section) => (
            <Suspense key={section?.context} fallback={<FallbackSection title={section?.context as FiltroSelected} />}>
                <ViewFilter
                    contexto={section?.context as FiltroSelected}
                    data={hijosState}
                    searchFilterInitial={searchFilterInitial}
                />
            </Suspense>
        )) :
        <Suspense fallback={<FallbackSection title={filtroSelected} />}>
            <ViewFilter
                data={hijosState}
                contexto={filtroSelected}
                searchFilterInitial={searchFilterInitial} />
        </Suspense>

}