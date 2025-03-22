import { NotFound } from "@/components/NotFound"
import type { Collections, GroupResult } from "@/types/Filtros"
import type { JSX } from "react"

export const FilterCollection = (collection: Collections, searchFilter: string): GroupResult[] => {
    const filterInclude = (collection: Collections, searchFilter: string) => collection.filter(e => e.name.toLowerCase().trim().match(searchFilter.toLowerCase()?.trim())) as GroupResult[]

    if (collection.length > 0) {
        let collectionUnify = filterInclude(collection, searchFilter)
        let collectionAllUnified: GroupResult[] = []

        for (const letter of searchFilter) { collectionAllUnified = filterInclude(collection, letter) }
        return collectionUnify.concat(collectionAllUnified).filter((e, i, m) => m.indexOf(e) === i)
    }
    return []
}

export const DefaultNotFound = (collection: Collections, searchFilterInitial: string, code: (collection: GroupResult[]) => JSX.Element[], fallback = <NotFound />) => FilterCollection(collection, searchFilterInitial).length !== 0 ? code(FilterCollection(collection, searchFilterInitial)) : fallback