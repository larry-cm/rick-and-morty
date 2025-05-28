import { FallbackSection } from "@/services/filtrado"
import { sections } from "@/const/constantes"
import { lazy, Suspense } from "react"
import type { CollectionContexts, FiltroSelected, RequestFilter, FullF } from "@/types/Filtros"

const ViewFilter = lazy(() => import('@components/ViewFilter.tsx'))


export default function RenderFilter(
    { filtroSelected, searchFilterInitial, arraySorted, filterButton, getDataFavorite, hijosState, arrayInitial }:
        { filtroSelected: FiltroSelected, searchFilterInitial: string, filterButton: (event: React.MouseEvent<HTMLButtonElement | HTMLLIElement, MouseEvent>) => void, getDataFavorite: () => void, hijosState: RequestFilter | undefined, arraySorted: CollectionContexts[], arrayInitial: FullF | null }) {

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
                        >
                        </ViewFilter>
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
                searchFilterInitial={searchFilterInitial} >
            </ViewFilter>
        </Suspense>

}