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
    class="size-10  dark:text-white"
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
    class="size-10  dark:text-white "
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

    const [page, setPage] = useState(1)
    const [verMediaquery, setVerMediaquery] = useState(false)

    useEffect(() => {
        setVerMediaquery(true)
    }, [page])

    const matches = verMediaquery ? useMediaQuery('only screen and (min-width: 900px)') : false
    const matchesLg = verMediaquery ? useMediaQuery('only screen and (min-width: 1200px)') : false
    const newMatchLg = matches && matchesLg ? true : false

    const cambioPage = ({ sumar }: MediaQueryTypes) => {
        
        console.log(page, matches, matchesLg);
        if (newMatchLg && sumar && (page + 6 < 20)) {
             setPage(page + 6)
         }
        else if (!newMatchLg && sumar && (page + 4 < 20) ){
            setPage( page + 4)
        }
    }
    return (
        <div class="relative">
            {/* {mediaQuery(matches, page)} */}
            <div class="snap-x snap-proximity overflow-y-hidden sm:overflow-hidden sm bg-gray-800/25 h-96 min-w-full flex space-x-4 relative ">

                {
                    results.map((person, index) => <Images {...person} index={index} />)
                }
            </div>
            <Botones
                svg={svg1}
                ruteFunc={page}
                onClickFunc={() => cambioPage}
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
