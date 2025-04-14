import { FallbackSection, FilterElements, SortedElements } from "@/services/filtrado"
import { sections } from "@/const/constantes"
import { lazy, Suspense, useEffect, use, useState } from "react"
import { fetchApi, fetchForOne } from '@/services/fetch'

import type { APICharacter, APIEpisode, APILocation } from "@/types/Api";
import type { CollectionContexts, FiltroSelected, RequestFilter } from "@/types/Filtros"
import type { FullF } from "./BtnFavoritos";

const ViewFilter = lazy(() => import('@components/ViewFilter.tsx'))

const promisePersonajes = fetchApi("character")
const promiseEpisodios = fetchApi("episode")
const promiseUbicaciones = fetchApi("location")

export default function RenderFilter({ filtroSelected, searchFilterInitial, isFavorite }: { filtroSelected: FiltroSelected, searchFilterInitial: string, isFavorite?: boolean }) {
    const [arrayFav, setArrayFav] = useState<FullF | null>(null)
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
        const favParse: FullF = JSON?.parse(favoritos ? favoritos : '{}')
        if (favParse) setArrayFav(favParse)
    }
    //  pidiendo datos favoritos en local storage la primera ves que se entre y cada ves que den click a botón de favoritos
    useEffect(() => getDataFavorite(), [])

    // si es sección de favoritos pedimos los datos y actualizamos el estado
    useEffect(() => {
        const newArrayFav = arrayFav && { ...arrayFav }
        if (isFavorite) {
            fetchForOne(newArrayFav)
                .then(data => {
                    // if (data[0].length || data[1].length || data[2].length) {
                    setHijosFavoritos({
                        personajes: data[0],
                        episodios: data[1],
                        ubicaciones: data[2]
                        } as RequestFilter)
                    // }
                })
                .catch(error => console.error(error))
            console.log(newArrayFav)
        }

    }, [isFavorite, arrayFav])

    //filtrando los datos
    useEffect(() => {
        if (isFavorite) {
            hijosFavoritos && setHijosState(FilterElements(hijosFavoritos, searchFilterInitial))
        } else {
            setHijosState(FilterElements(hijosFor, searchFilterInitial))
        }
    }, [searchFilterInitial, hijosFavoritos])

    // organizando los datos a mi manera
    useEffect(() => setArraySorted(SortedElements(hijosState)), [hijosState])

    return filtroSelected === sections.all && arraySorted.length ?
        arraySorted.map(({ context }) => (
            <Suspense key={context} fallback={<FallbackSection title={context as FiltroSelected} />}>
                <ViewFilter
                    getDataFavoriteInitial={getDataFavorite}
                    contexto={context as FiltroSelected}
                    data={hijosState}
                    searchFilterInitial={searchFilterInitial}
                />
            </Suspense>
        )) :
        <Suspense fallback={<FallbackSection title={filtroSelected} />}>
            <ViewFilter
                getDataFavoriteInitial={getDataFavorite}
                data={hijosState}
                contexto={filtroSelected}
                searchFilterInitial={searchFilterInitial} />
        </Suspense>

}