import type { Gender, Species, Status, Result } from "../types/Api"

import { IconGender, svgVivo, svgMuerto, svgDesconocido } from "@/icons/imagesIcons"
interface ImagesTypes extends Result {
    index: number;
    vOptions?: boolean;
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
const qrUnknown = (txt: string) => {
    return resumenSw(txt, [""])
}
const resumenSw = (vMirar: string, textReturn: string[], cMirar?: string[]) => {
    switch (vMirar) {
        case cMirar && cMirar[0]:
            return textReturn[0];
        case cMirar && cMirar[1]:
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

const qrBg = (genero: Gender) => {
    switch (genero) {
        case "Female": return "from-pink-500 to-pink-700 group-hover:from-pink-400 group-hover:to-pink-600"
        case "Male": return "from-blue-500 to-blue-700 group-hover:from-blue-400 group-hover:to-blue-600"
        default: return "from-slate-300 to-slate-500 group-hover:from-slate-200 group-hover:to-slate-400 "
    }
}
export default function Images(
    {
        id,
        image,
        name,
        gender,
        status,
        species,
        origin,
        location,
        episode,
        url,
        index,
        vOptions }: ImagesTypes) {

    const verEstado = () => {
        switch (qrAlive(status)) {
            case "muerto":
                return <>{qrAlive(status)} {svgMuerto}</>;
            case "con vida":
                return <>{qrAlive(status)}  {svgVivo}</>;
            default:
                return <>{qrAlive(status)} {svgDesconocido}</>
        }

    }

    return (


        <div id={`${index + 1}`} class="group snap-center relative block bg-black rounded-md z-10 ">
            <img
                loading={index < 4 ? "eager" : "lazy"}
                alt={name}
                src={image}
                class="rounded-md absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
            />

            <div
                class={`relative p-4 sm:p-6 lg:p-8 flex flex-col w-64  justify-between ${vOptions ? " w-full h-96" : " sm:w-80 md:w-96 h-full"}`}
            >
                <div class="flex space-x-4">
                    <div class={` ${vOptions ? "w-full" : "basis-2/3"}`}>

                        <p
                            class={`text-sm font-semibold uppercase tracking-wider sm:tracking-widest bg-gradient-to-r from  bg-clip-text text-transparent ${qrBg(gender)}`}
                        >
                            {qrSpecies(species)}
                        </p>

                        <p class="text-xl font-bold text-white sm:text-2xl">{name}</p>
                    </div>
                    <div class={`flex flex-col space-y-4 sm:space-y-2 ${vOptions ? "hidden" : ""}`}>
                        <span class="text-xs font-semibold text-white bg-black bg-opacity-50 rounded-full px-2 py-.5 sm:py-1 transition-all  h-[1.9rem]  place-items-center  justify-around flex capitalize opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 ">
                            {qrGender(gender)} {IconGender}
                        </span>
                        <span class="text-xs font-semibold text-white bg-black bg-opacity-50 rounded-full px-2 py-.5 sm:py-1 transition-all  h-[1.9rem]  place-items-center  justify-around flex capitalize opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 ">
                            {verEstado()}
                        </span>

                    </div>
                </div>
                <div
                    class={`translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 text-sm text-[.95rem] text-white ${vOptions ? "max-w-max " : ""}`}
                >

                    <em class={`max-w-28 font-bold text-xl text-slate-200 tracking-widest not-italic text-center ${vOptions ? "hidden" : ""}`}>
                        {/* traducir esta parte  */}
                        Se vio por ultima vez en {location?.name}
                    </em>


                    {/* traducir esta parte  */}
                    <div class="text-base sm:text-lg font-medium text-slate-300">
                        <p >Lugar de nacimiento de el personaje {qrUnknown(origin?.name)}</p>

                        <p class={`truncate ${vOptions ? "hidden" : ""}`}>
                            Transitando por los episodios {qrEpisodes(episode)}
                        </p>

                    </div>
                    {vOptions ? (
                        <a href={`personajes/personaje-${id}`} class={`mt-3 ms-auto w-max text-end block  font-medium *: bg-gradient-to-t px-2 py-1 rounded-md border border-zinc-400 
                            ${qrBg(gender)} ${gender === "unknown" ? "text-slate-900" : ""}`}>Ir ahora</a>

                    ) : (
                        <div class={`flex justify-end`}>
                            <a
                                class="mt-1 hover:underline font-semibold decoration-2 hover:animate-jiggle underline-offset-2 px-2 basis-1/3"
                                href={`personajes/personaje-${id}`}>Ver mas...</a>
                        </div>
                    )}
                </div>
            </div >
        </div >

    )
}

