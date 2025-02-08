import Image from "astro/components/Image.astro"
import type { Gender, Species, Status, Location, Result } from "../types/Api"
interface ImagesTypes extends Result {
    index: number;
}
const qrGender = (gender: Gender) => {
    return resumenSw(gender, ["Male", "Female"], ["masculino", "femenino"]);
};
const qrAlive = (alive: Status) => {
    return resumenSw(alive, ["Alive", "Dead"], ["con vida", "muerto"]);
};
const qrSpecies = (specie: Species) => {
    return resumenSw(specie, ["Alien", "Human"], ["Alienígena", "Humano"]);
};
const resumenSw = (vMirar: string, cMirar: string[], textReturn: string[]) => {
    switch (vMirar) {
        case cMirar[0]:
            return textReturn[0];
        case cMirar[1]:
            return textReturn[1];
        default:
            return "Desconocido";
    }
};
const qrEpisodes = (episode: string[]) => {
    return episode
        .map((ep) =>
            ep.replaceAll("https://rickandmortyapi.com/api/episode/", ""),
        )
        .join(",");
};
const IconGender = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="20" height="20" stroke-width="2"> <path d="M11 11m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path> <path d="M19 3l-5 5"></path> <path d="M15 3h4v4"></path> <path d="M11 16v6"></path> <path d="M8 19h6"></path> </svg>

const IconStatus = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="20" height="20" stroke-width="2">
    <path d="M3 12h4.5l1.5 -6l4 12l2 -9l1.5 3h4.5"></path>
</svg>

const IconStatus2 = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="20" height="20" stroke-width="2"> <path d="M12 4c4.418 0 8 3.358 8 7.5c0 1.901 -.755 3.637 -2 4.96l0 2.54a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1v-2.54c-1.245 -1.322 -2 -3.058 -2 -4.96c0 -4.142 3.582 -7.5 8 -7.5z"></path> <path d="M10 17v3"></path> <path d="M14 17v3"></path> <path d="M9 11m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path> <path d="M15 11m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path> </svg>

const IconStatus3 = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="20" height="20" stroke-width="2"> <path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4"></path> <path d="M12 19l0 .01"></path> </svg>
export default function Images(
    { image,
        name,
        gender,
        status,
        species,
        origin,
        location,
        episode,
        url,
        index }: ImagesTypes) {

    const verStado = () => {
        switch (qrAlive(status)) {
            case "muerto":
                return <>{qrAlive(status)} {IconStatus2}</>;
            case "con vida":
                return <>{qrAlive(status)}  {IconStatus}</>;
            default:
                return <>{qrAlive(status)} {IconStatus3}</>
        }

    }
    return (


        <div id={`${index + 1}`} class="group snap-center relative block bg-black z-10 ">
            <img
                loading={index < 4 ? "eager" : "lazy"}
                alt={name}
                src={image}
                class="rounded-md absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
            />

            <div
                class="relative p-4 sm:p-6 lg:p-8 flex flex-col w-64 sm:w-80 md:w-96 h-full justify-between"
            >
                <div class="flex">
                    <div class="basis-2/3">

                        <p
                            class={`text-sm font-medium uppercase tracking-widest bg-gradient-to-r from  bg-clip-text text-transparent ${qrGender(gender) === "masculino" ? "from-blue-500 to-blue-700 group-hover:from-blue-400 group-hover:to-blue-600" : "from-pink-500 to-pink-700 group-hover:from-pink-400 group-hover:to-pink-600"}`}
                        >
                            {qrSpecies(species)}
                        </p>

                        <p class="text-xl font-bold text-white sm:text-2xl">{name}</p>
                    </div>
                    <div class="flex flex-col space-y-2">
                        <span class="text-xs font-semibold text-white bg-black bg-opacity-50 rounded-full px-2 py-1 transition-all basis-1/3 h-[1.9rem]  place-items-center  justify-around flex capitalize opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 ">
                            {qrGender(gender)} {IconGender}
                        </span>
                        <span class="text-xs font-semibold text-white bg-black bg-opacity-50 rounded-full px-2 py-1 transition-all basis-1/3 h-[1.9rem]  place-items-center  justify-around flex capitalize opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 ">
                            {verStado()}
                        </span>

                    </div>
                </div>
                <div
                    class="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 text-sm text-[.95rem] text-white"
                >

                    <em class="font-bold text-xl text-slate-200 tracking-widest not-italic text-center">
                        {/* traducir esta parte  */}
                        Se vio por ultima vez en {location?.name}
                    </em>


                    {/* traducir esta parte  */}
                    <div class="text-lg font-medium text-slate-300">
                        <p >Lugar de nacimiento del personaje {origin?.name}</p>

                        <p class="truncate">
                            Transitando por los episodios {qrEpisodes(episode)}
                        </p>

                    </div>
                    <div class="flex justify-end">
                        <a
                            class="mt-1 hover:underline font-semibold decoration-2 hover:animate-jiggle underline-offset-2 px-2 basis-1/3"
                            href={url}>Ver mas...</a>
                    </div>
                </div>
            </div>
        </div>

    )
}

