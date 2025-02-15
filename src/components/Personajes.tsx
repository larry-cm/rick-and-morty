import { useState, useEffect } from "preact/hooks";
import { useMediaQuery } from "@react-hook/media-query";

import type { APICharacter } from "@/types/Api";
import { fetchApi } from "@/services/fetch";

import Images from "@/components/Images";
import Botones from "@/components/Botones";


const { results } = await fetchApi("character");


interface MediaQueryTypes {
    mat?: boolean | undefined
    mat2?: boolean | undefined
    next?: boolean | undefined
}


const svg1 = <svg
    class="size-10  "
    viewBox="0 0 20 20"
    fill="currentColor"
>
    <path
        fill-rule="evenodd"
        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
        clip-rule="evenodd"></path>
</svg>
const svg2 = <svg
    class="size-10   "
    viewBox="0 0 20 20"
    fill="currentColor">
    <path
        fill-rule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clip-rule="evenodd">
    </path>
</svg>


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
    }, [page])

    const cambioPage = ({ next }: MediaQueryTypes) => {
        const increment = matchesLg && 4;
        const incrementMd = matchesMd ? 2 : 0;
        const viewLow = incrementMd && increment ? increment : incrementMd
        const maxPage = 20;
        console.log(page);
        
        if (next) {
            setPage(page => {
                const newPage = page + viewLow;
                return  (page === 1 && increment) ? page + 5 : newPage;
            });
            if (page >= maxPage - 2) setPage(1)
        } else {
            setPage(page => {
                const newPage = page - viewLow;
                if (newPage <= 0) {
                    return maxPage;
                }
                return newPage;
            });
        }
    };

    return (
        <div class="relative">
            <div class="snap-x snap-mandatory overflow-y-hidden sm:overflow-hidden sm bg-gray-800/25 h-96 min-w-full flex space-x-4 relative ">

                {
                    results.map((person) => <Images {...person} index={person.id - 1} />)
                }
            </div>
            <Botones
                svg={svg1}
                ruteFunc={page}
                onClickFunc={() => cambioPage({ next: false })}
                clase=" left-8"
                text="Página previa" />
            <Botones
                svg={svg2}
                ruteFunc={page}
                onClickFunc={() => cambioPage({ next: true })}
                clase=" right-8"
                text="Siguiente página" />

        </div>
    )
}
