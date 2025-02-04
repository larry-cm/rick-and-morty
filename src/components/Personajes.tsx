import { useState } from "preact/hooks";
import { fetchApi } from "../services/fetch";
import type { APICharacter, Gender, Result, Species, Status } from "../types/Api";
const {characters} = await fetchApi();

const data = await fetch(characters)
const {results} = await data.json() as APICharacter
export default function Personajes (){

    const [page,setPage] = useState(1)




    const qrGender = (gender:Gender) => {
        return resumenSw(gender,["Male","Female"],["masculino","femenino"])
    }
    const qrAlive = (alive:Status)=>{
        return resumenSw(alive,["Alive","Dead"],["con vida","muerto"])
    }
    const qrSpecies = (specie:Species)=>{
        return resumenSw(specie,["Alien","Human"],["Alienigena","Humano"])
    }
    const resumenSw = (vMirar:string,cMirar:string[],textReturn:string[])=>{
        switch(vMirar){
                    case cMirar[0] : return textReturn[0]
                    case cMirar[1] : return textReturn[1]
                    default : return "Desconocido"
                }
        }
    const qrEpisodes = (episode:string[])=>{
        return episode.map(ep =>ep.replaceAll("https://rickandmortyapi.com/api/episode/","")).join(",")
    }
    return (
        <>
        <div class="snap-x snap-mandatory overflow-y-hidden bg-slate-50 h-96 min-w-full flex space-x-4 relative ">

       

        {
            results.map(
                ({image,name,gender,status,species,type,origin,location,episode,url},index) => (
                <>
                <div id={`${index+1}`} class="group snap-center relative block bg-black z-10">
                    <img
                        alt={name}
                        src={image}
                        class="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                    />

                    <div class="relative p-4 sm:p-6 lg:p-8 w-[28rem] flex flex-col h-full justify-between">
                        <div class=" ">
                            <p class="text-sm font-medium uppercase tracking-widest bg-gradient-to-r from bg-fuchsia-400 to-pink-500 bg-clip-text text-transparent ">{qrSpecies(species)}</p>

                            <p class="text-xl font-bold text-white sm:text-2xl">{name}</p>
                        </div>
                        <div
                            class="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 text-sm text-[.95rem] text-white"
                        >
                                <p>Actualmente el personaje se encuentra {qrAlive(status)}</p>
                                <p>Este personaje es de sexo {qrGender(gender)}</p>
                                {/* traducir esta parte  */}
                                <p>Lugar de nacimiento del personaje {origin?.name}</p>
                                {/* traducir esta parte  */}
                                <p>Se vio por ultima vez en {location?.name}</p>
                                <p class="truncate">Transitando por los episodios {qrEpisodes(episode)}</p>
                            <div class="flex justify-end">
                                <a class="mt-8 hover:underline font-semibold decoration-2 hover:animate-jiggle underline-offset-2" href={url}>Ver mas...</a>
                            </div>
                        </div>
                    </div>
                </div>
                </>
            ))
        }
        </div>
        <a
                    href={`#${ page <= 4 ? 1 : page }`}
                    onClick={()=>{
                        if(page > 3)setPage(prev => prev - 3)
                    }}
                    class=" inline-flex size-8 scale-[1.6] items-center justify-center rtl:rotate-180 absolute left-14 bg-gray-700/80 shadow-md shadow-white/25 border border-white/25 rounded-full top-[50%] lg:top-[45%] z-20 hover:scale-[1.7] transition-all">
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
                    href={`#${page < 19 ? page + 2: 20 }`}
                    onClick={()=>{
                        if(page < 19)setPage(prev => prev + 3)
                    }}
                    class="inline-flex size-8 scale-[1.6] items-center justify-center rtl:rotate-180 absolute right-14 bg-gray-700/80 shadow-md shadow-white/25 border border-white/25 rounded-full top-[50%] lg:top-[45%] z-20">
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