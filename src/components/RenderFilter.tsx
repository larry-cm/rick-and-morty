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
        const favParse: FullF = JSON.parse(favoritos ?? '{"character":[], "episode": [],"location": []}')

        setArrayFav(prevArray => {
            if (JSON.stringify(prevArray) !== JSON.stringify(favParse)) {
                return favParse
            }
            return prevArray
        })
    }
    //  pidiendo datos favoritos en local storage la primera vez que se entra y cada vez que den click a botón de favoritos
    useEffect(() => {
        getDataFavorite()
    }, [])

    // si es sección de favoritos pedimos los datos y actualizamos el estado SOLO si arrayFav realmente cambió
    useEffect(() => {
        if (!arrayFav) return;
        fetchForOne(arrayFav)
            .then(data => {
                const nuevo = {
                    personajes: data[0],
                    episodios: data[1],
                    ubicaciones: data[2]
                } as RequestFilter;
                setHijosFavoritos(prev => {
                    // Solo actualiza si realmente cambió
                    if (JSON.stringify(prev) !== JSON.stringify(nuevo)) {
                        return nuevo;
                    }
                    return prev;
                });
            })
            .catch(error => console.error(error));
    }, [arrayFav]);

    // Filtrando los datos solo si cambian los datos base
    useEffect(() => {
        if (isFavorite) {
            if (hijosFavoritos) {
                setHijosState(prev => {
                    const filtrado = FilterElements(hijosFavoritos, searchFilterInitial);
                    if (JSON.stringify(prev) !== JSON.stringify(filtrado)) {
                        return filtrado;
                    }
                    return prev;
                });
            }
        } else {
            setHijosState(prev => {
                const filtrado = FilterElements(hijosFor, searchFilterInitial);
                if (JSON.stringify(prev) !== JSON.stringify(filtrado)) {
                    return filtrado;
                }
                return prev;
            });
        }
    }, [searchFilterInitial, hijosFavoritos, isFavorite]);

    // organizando los datos a mi manera solo si hijosState cambia
    useEffect(() => {
        setArraySorted(prev => {
            const ordenado = SortedElements(hijosState);
            if (JSON.stringify(prev) !== JSON.stringify(ordenado)) {
                return ordenado;
            }
            return prev;
        });
    }, [hijosState]);

    return filtroSelected === sections.all && arraySorted.length ?
        arraySorted.map(({ context }) => (
            <Suspense key={context} fallback={<FallbackSection title={context as FiltroSelected} />}>
                <ViewFilter
                    getDataFavoriteInitial={getDataFavorite}
                    contexto={context as FiltroSelected}
                    data={hijosState}
                    numElementsInitial={hijosFavoritos}
                    searchFilterInitial={searchFilterInitial}
                />
            </Suspense>
        )) :
        <Suspense fallback={<FallbackSection title={filtroSelected} />}>
            <ViewFilter
                getDataFavoriteInitial={getDataFavorite}
                data={hijosState}
                contexto={filtroSelected}
                numElementsInitial={hijosFavoritos}
                searchFilterInitial={searchFilterInitial} />
        </Suspense>

}