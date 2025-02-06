import { useState ,useEffect} from "preact/hooks";
import { fetchApi } from "../services/fetch";
import { useMediaQuery } from "@react-hook/media-query";

import type { APICharacter} from "../types/Api";
import Images from "./Images.astro";
const {characters} = await fetchApi();

const data = await fetch(characters)
const {results} = await data.json() as APICharacter
export default function Personajes (){

    const [page,setPage] = useState(1)
    
    
    const [verMediaquery,setVerMediaquery] = useState(false)
    useEffect(()=>{
    setVerMediaquery(true)
    },[])



    const matches = verMediaquery ? useMediaQuery('only screen and (min-width: 700px)') : false
    return (
        <>
        {matches ? page === 1 ? page : page - 3:page === 1 ? page : page - 1}
        <div class="snap-x snap-mandatory overflow-y-hidden sm:overflow-hidden bg-gray-800/25 h-96 min-w-full flex space-x-4 relative ">

        {
            results.map((person,index) => (
                <Images
                {...person} index={index}/>
            )
        )
        }
        </div>
        <a
                    href={`#${matches ? page === 1 ? page : page - 3:page === 1 ? page : page - 1}`}
                    onClick={()=>{
                        if(page > 1)setPage(prev => prev - 1)
                    }}
                    class="hidden sm:inline-flex size-8 scale-[1.6] items-center justify-center rtl:rotate-180 absolute left-14 bg-gray-700/80 shadow-md shadow-white/25 border border-white/25 rounded-full top-[65%] sm:top-[55%]  z-20 hover:scale-[1.7] transition-all">
                    <span class="sr-only">Prev Page</span>
                    <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="size-3 dark:text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clip-rule="evenodd"></path>
                    </svg>
                </a>
        <a
                    href={`#${matches ? page === 20 ? page : page + 3:page === 20 ? page : page + 1}`}
                    onClick={()=>{
                        if(page < 20)setPage(prev => prev + 1)
                    }}
                    class="hidden sm:inline-flex size-8 scale-[1.6] items-center justify-center rtl:rotate-180 absolute right-14 bg-gray-700/80 shadow-md shadow-white/25 border border-white/25 rounded-full top-[65%] sm:top-[55%]  z-20">
                    <span class="sr-only">Next Page</span>
                    <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="size-3 dark:text-white "
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                                fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd">
                                </path>
                    </svg>
                </a>
        </>
    )
}