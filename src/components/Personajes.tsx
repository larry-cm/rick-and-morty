import { useState, useEffect } from "preact/hooks";
import { fetchApi } from "../services/fetch";
import { useMediaQuery } from "@react-hook/media-query";

import type { APICharacter } from "../types/Api";
import Images from "./Images";
import Botones from "./Botones";

const { characters } = await fetchApi();
const data = await fetch(characters)
const { results } = await data.json() as APICharacter


const svg1 = <svg
    xmlns="http://www.w3.org/2000/svg"
    class="size-10  dark:text-gray-800"
    viewBox="0 0 20 20"
    fill="currentColor"
>
    <path
        fill-rule="evenodd"
        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
        clip-rule="evenodd"></path>
</svg>
const svg2 = <svg
    xmlns="http://www.w3.org/2000/svg"
    class="size-10  dark:text-gray-800 "
    viewBox="0 0 20 20"
    fill="currentColor">
    <path
        fill-rule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clip-rule="evenodd">
    </path>
</svg>


interface MediaQueryTypes {
    mat?: boolean | undefined
    mat2?: boolean | undefined
    sumar?: boolean | undefined
}


export default function Personajes() {
    const [verMediaquery, setVerMediaquery] = useState(false)
    const matches = verMediaquery ? useMediaQuery('only screen and (min-width: 900px)') : false
    const matchesLg = verMediaquery ? useMediaQuery('only screen and (min-width: 1200px)') : false

    const [page, setPage] = useState(() => {
        if (matchesLg) return 1
        else return 1
    })


    useEffect(() => {
        setVerMediaquery(true)

    }, [page])




    const cambioPage = ({ sumar }: MediaQueryTypes) => {
        const increment = matchesLg ? 3 : 2;
        const maxPage = 20;

        if (sumar) {
            setPage(page => {
                const newPage = page + increment;
                if (newPage >= maxPage) {
                    return page === 1 ? page + 5 : maxPage;
                }
                return newPage;
            });
            if (page === maxPage) setPage(1);
        } else {
            setPage(page => {
                const newPage = page - increment;
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
                    results.map((person, index) => <Images {...person} index={index} />)
                }
            </div>
            <Botones
                svg={svg1}
                ruteFunc={page}
                onClickFunc={() => cambioPage({ sumar: false })}
                clase=" left-8"
                text="Página previa" />
            <Botones
                svg={svg2}
                ruteFunc={page}
                onClickFunc={() => cambioPage({ sumar: true })}
                clase=" right-8"
                text="Siguiente página" />

        </div>
    )
}
