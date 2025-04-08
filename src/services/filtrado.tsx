import { NotFound } from "@/components/NotFound"
import { AreaTitle } from "@/components/sections/MainArea"
import { sections, widthClases } from "@/const/constantes"
import type { Collection, CollectionContexts, FiltroSelected, GroupResult, RequestFilter } from "@/types/Filtros"
import type { JSX } from "react"

export const FilterCollection = (collection: CollectionContexts, searchFilter: string): GroupResult[] => {
    const filterInclude = (collection: CollectionContexts, searchFilter: string) => collection.filter(e => e?.name.toLowerCase().trim().match(searchFilter.toLowerCase()?.trim())) as GroupResult[]

    if (collection?.length > 0) {
        let collectionUnify = filterInclude(collection, searchFilter)
        let collectionAllUnified: GroupResult[] = []

        for (const letter of searchFilter) { collectionAllUnified = filterInclude(collection, letter) }
        return collectionUnify.concat(collectionAllUnified).filter((e, i, a) => a.indexOf(e) === i)
    }
    return []
}

export const FilterElements = (hijosFilteredInitial: RequestFilter, searchFilterInitial: string) => {
    for (const hijo in hijosFilteredInitial) {
        hijosFilteredInitial[hijo as keyof typeof hijosFilteredInitial] = FilterCollection(hijosFilteredInitial[hijo as keyof typeof hijosFilteredInitial], searchFilterInitial) as Collection
    }
    return hijosFilteredInitial as RequestFilter
}

export const SortedElements = (hijosStateInitial: RequestFilter | undefined) => {
    const hijosFiltered = { ...hijosStateInitial }
    const arraySon: CollectionContexts[] = Object.values(hijosFiltered)
    const arrayKeys: string[] = Object.keys(hijosFiltered)
    const sorted = (ar: CollectionContexts[]) => ar.sort((a, b) => a.length - b.length)

    arraySon.forEach((_, i) => _.context = arrayKeys[i]) // poniéndoles contexto
    return arraySon[0]?.length >= 1 && arraySon[0]?.context === sections.person
        ? arraySon?.slice(0, 1).concat(sorted(arraySon?.slice(1, 3))) // si ahi imágenes de personajes van primero
        : sorted(arraySon)
}

export const FallbackSection = ({ title }: { title: FiltroSelected }) => (
    <section className="min-h-80">
        <AreaTitle title={title} />
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

export const DefaultNotFound = (collection: CollectionContexts | undefined, searchFilterInitial: string, code: (collection: GroupResult[]) => JSX.Element[], fallback = <NotFound />) => collection && FilterCollection(collection, searchFilterInitial).length !== 0 ? code(FilterCollection(collection, searchFilterInitial)) : fallback