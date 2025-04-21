import { FallbackSection, FilterElements, SortedElements } from "@/services/filtrado"
import { reformatSections, sections } from "@/const/constantes"
import { lazy, Suspense, useEffect, use, useState } from "react"
import { fetchApi, fetchForOne } from '@/services/fetch'

import type { APICharacter, APIEpisode, APILocation, Result, ResultEpisode, ResultLocation } from "@/types/Api";
import type { CollectionContexts, FiltroSelected, RequestFilter, FullF } from "@/types/Filtros"

const ViewFilter = lazy(() => import('@components/ViewFilter.tsx'))

const promisePersonajes = fetchApi("character")
const promiseEpisodios = fetchApi("episode")
const promiseUbicaciones = fetchApi("location")

export default function RenderFilter({ filtroSelected, searchFilterInitial, isFavorite }: { filtroSelected: FiltroSelected, searchFilterInitial: string, isFavorite?: boolean }) {
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
                    const filtrado = FilterElements(dataBase, searchFilterInitial);
                    const key = dataTitle as keyof typeof filtrado
                    const sec = filtrado[key]

                    const useForSec = {
                        personajes: sec.filter((item) => {
                            if ('status' in item) {
                                if (dataValue === 'todos') return true
                                return (item as Result).status.match(dataValue);
                            }
                            return false;
                        }),
                        episodios: sec.filter((item) => {
                            if ('air_date' in item) {
                                return (item as ResultEpisode).air_date === 'December 20, 2017';
                            }
                            return false;
                        }),
                        ubicaciones: sec.filter((item) => {
                            if ('dimension' in item) {
                                return (item as ResultLocation).dimension.match('Earth') ||
                                    (item as ResultLocation).dimension.match('Citadel');
                            }
                            return false; // Add missing return
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

    //  pidiendo datos favoritos en local storage la primera vez que se entra y cada vez que den click a botón de favoritos
    useEffect(() => {
        getDataFavorite()


    }, [])

    useEffect(() => {
        if (!arrayInitial) return;
        fetchForOne(arrayInitial)
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

    }, [arrayInitial]);

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
            // async function pet() {
            //     const data = await fetchApi('character', 0, 2)
            //     console.log(data);

            // }
            // pet()
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
        <div className="space-y-12">
            {
                arraySorted.map(({ context }) => (
                    <Suspense key={context} fallback={<FallbackSection title={context as FiltroSelected} />}>
                        <ViewFilter
                            btnFilter={filterButton}
                            getDataFavoriteInitial={getDataFavorite}
                            contexto={context as FiltroSelected}
                            data={hijosState}
                            numElementsInitial={arrayInitial}
                            searchFilterInitial={searchFilterInitial}
                        />
                    </Suspense>
                ))}
        </div> :
        <Suspense fallback={<FallbackSection title={filtroSelected} />}>
            <ViewFilter
                btnFilter={filterButton}
                getDataFavoriteInitial={getDataFavorite}
                data={hijosState}
                contexto={filtroSelected}
                numElementsInitial={arrayInitial}
                searchFilterInitial={searchFilterInitial} />
        </Suspense>

}