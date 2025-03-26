import { FilterCollection } from "@/services/filtrado"
import { sections, widthClases } from "@/const/constantes"
import { lazy, Suspense, useEffect, useState } from "react"
import { fetchApi } from '@/services/fetch'

import type { APICharacter, APIEpisode, APILocation } from "@/types/Api";
import type { Collections, FiltroSelected, RequestFilter } from "@/types/Filtros"
import type { Result, ResultEpisode, ResultLocation } from '@/types/Api'
import { IcoTodos } from "@/assets/Icons";

const ViewFilter = lazy(() => import('@components/ViewFilter.tsx'))

export default function RenderFilter({ filtroSelected, searchFilterInitial }: { filtroSelected: FiltroSelected, searchFilterInitial: string }) {
    const [hijosInitial, setHijosInitial] = useState<RequestFilter | null>(null)
    const [hijosState, setHijosState] = useState<RequestFilter>()
    const [arraySorted, setArraySorted] = useState<Collections[]>([])
    let personajes, ubicaciones, episodios
    (hijosInitial) && ({ personajes, ubicaciones, episodios } = hijosInitial)



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
        updateArraySorted()
    }, [hijosState])

    function updateArraySorted() {
        const hijosFiltered = { ...hijosState }
        const arraySon: Collections[] = Object.values(hijosFiltered)
        const arrayKeys: string[] = Object.keys(hijosFiltered)
        const sorted = (ar: Collections[]) => ar.sort((a, b) => a.length - b.length)

        arraySon.forEach((_, i) => _.context = arrayKeys[i]); // poniéndoles contexto
        setArraySorted(() => {
            return arraySon[0]?.length >= 1 && arraySon[0]?.context === sections.person
                ? arraySon?.slice(0, 1).concat(sorted(arraySon?.slice(1, 3)))
                : sorted(arraySon)
        })
    }
    const FallbackSection = ({ title }: { title: FiltroSelected }) => {
        return (
            <section>
                <article className='flex space-x-4 sm:space-x-8 mb-8'>
                    <h2 className='font-bold text-3xl'>{title ?? 'Personajes de ejemplo'}</h2>

                    <button
                        className='flex space-x-2 items-center text-base bg-slate-500/50 hover:bg-slate-500/80 hover:text-slate-300 group-hover:text-slate-300 text-slate-100/90 transition-colors px-4 py-1.5 rounded-3xl'
                        type='button'
                    >
                        <i><IcoTodos className='size-5' /></i>
                        <span>Ver todos</span>
                    </button>
                </article>
                <article className={`min-h-20 grid ${widthClases.grande} place-content-center gap-4`}>
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8,].map((_, i) => (
                            <p
                                key={i}
                                className={`bg-sky-400/90 min-h-96 w-full rounded-lg opacity-70 animate-pulse`}
                                style={{ 'animationDelay': `${i}00ms` }}></p>
                        ))
                    }
                </article>
            </section>
        )
    }

    if (filtroSelected === sections.all && arraySorted) {
        return arraySorted.map((section) => (
            <Suspense key={section?.context} fallback={<FallbackSection title={section?.context as FiltroSelected} />}>
                <ViewFilter
                    contexto={section.context as FiltroSelected}
                    data={hijosState}
                    updateArraySorted={updateArraySorted}
                    searchFilterInitial={searchFilterInitial}
                />
            </Suspense>
        ));
    }
    return <ViewFilter
        data={hijosState}
        contexto={filtroSelected}
        updateArraySorted={updateArraySorted}
        searchFilterInitial={searchFilterInitial} />
}