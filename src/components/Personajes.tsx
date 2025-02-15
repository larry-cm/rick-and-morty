import { useState, useEffect } from "preact/hooks";
import { useMediaQuery } from "@react-hook/media-query";


import { fetchApi } from "@/services/fetch";
import Images from "@/components/Images";
import Botones from "./Botones";


const { results } = await fetchApi("character");


interface MediaQueryTypes {
    next?: boolean | undefined
}


export default function Personajes() {
    const [verMediaquery, setVerMediaquery] = useState(false)
    const matchesMd = verMediaquery ? useMediaQuery('only screen and (min-width: 700px)') : false
    const matchesLg = verMediaquery ? useMediaQuery('only screen and (min-width: 1200px)') : false

    const [page, setPage] = useState(() => {
        if (matchesLg) return 1
        else return 1
    })

    useEffect(() => {
        setVerMediaquery(true)
    }, [])

    const cambioPage = ({ next }: MediaQueryTypes) => {
        const increment = matchesLg && 4;
        const incrementMd = matchesMd ? 3 : 0;
        const viewLow = incrementMd && increment ? increment : incrementMd
        const maxPage = 20;

        if (next) {
            setPage(page => {
                const newPage = page + viewLow;
                if (page === maxPage) return 1
                if (newPage >= maxPage) return maxPage
                return newPage;
            });
        } else {
            setPage(page => {
                const newPage = page - viewLow;
                if (page === 1) return maxPage;
                if (newPage <= 1) return 1
                return newPage + 1;
            });
        }
    };

    return (
        <div >
            <div class="snap-x snap-mandatory overflow-y-hidden sm:overflow-hidden sm bg-gray-800/25 h-96 min-w-full flex space-x-4 relative ">

                {
                    results.map((person) => <Images {...person} index={person.id - 1} />)
                }
            </div>

            <div class="flex  w-full justify-between *:text-center text-start">
                <div class="gap-2 px-4 py-2 my-4 text-lg font-medium bg-gray-800 border rounded-lg shadow-md dark:text-white place-content-center sm:max-w-sm border-white/25 sm:flex hidden">

                    <Botones ruteFunc={page} onClickFunc={() => cambioPage({ next: false })} text="Página previa" />
                    <Botones ruteFunc={page} onClickFunc={() => cambioPage({ next: true })} text="Siguiente página" clase />

                </div>

                <a
                    href="personajes"
                    class="flex gap-2 px-4 py-2 my-4 text-lg font-medium bg-gray-800 border rounded-lg shadow-md dark:text-white place-content-center sm:max-w-sm border-white/25"
                >
                    Ver mas personajes
                </a>
            </div>
        </div>
    )
}
