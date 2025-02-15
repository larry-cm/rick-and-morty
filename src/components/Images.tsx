import type { ComponentChildren } from "preact";
import type { Gender, Species, Status, Result } from "../types/Api"

import { IconGender, svgVivo, svgMuerto, svgDesconocido } from "@/icons/imagesIcons"

interface ImagesTypes extends Result {
    index?: number;
    vOptions?: boolean;
    children?: ComponentChildren;
}
const qrGender = (gender: Gender) => {
    return resumenSw(gender, ["masculino", "femenino"], ["Male", "Female"]);
}
const qrAlive = (alive: Status) => {
    return resumenSw(alive, ["con vida", "muerto"], ["Alive", "Dead"]);
}
const qrSpecies = (specie: Species) => {
    return resumenSw(specie, ["Alienígena", "Humano"], ["Alien", "Human"]);
}
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
}
const qrEpisodes = (episode: string[]) => {
    return episode
        .map((ep) =>
            ep.replaceAll("https://rickandmortyapi.com/api/episode/", ""),
        )
        .join(",");
}
const qrBg = (genero: Species) => {
    switch (genero) {
        case 'Alien': return "from-gray-600 group-hover:from-gray-700/70 group-hover:hover:from-gray-700 to-emerald-500 group-hover:to-emerald-600/70 group-hover:hover:to-emerald-600 "
        case "Human": return "from-indigo-800/90 to-blue-900/90 group-hover:from-indigo-900/90 group-hover:hover:from-indigo-900 group-hover:to-blue-950/90 group-hover:hover:to-blue-950"
        default: return ''
    }
}

export default function Images(
    {
        id,
        index,
        name,
        gender,
        status,
        species,
        origin,
        location,
        episode,
        children,
        image,
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
    const posIndex = index && index ? index + 1 : 1
    return (


        <div id={`${posIndex}`} class="group snap-center relative block bg-black rounded-md z-10 ">
            {children ? children : (<img
                loading={index && index < 10 ? "eager" : "lazy"}
                alt={name}
                src={image ?? '/rick-logo.svg'}
                class="rounded-md absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
            />)}

            <div
                class={`relative p-4 lg:pb-4 sm:p-6 lg:p-8 flex flex-col w-64  justify-between ${vOptions ? " w-full h-96" : " sm:w-80 md:w-96 h-full"}`}
            >
                <div class="flex space-x-4">
                    <div class={` ${vOptions ? "w-full" : "basis-2/3"}`}>

                        <p
                            class={`text-base  sm:text-lg font-bold uppercase tracking-widest sm:tracking-widest bg-gradient-to-r from  bg-clip-text text-transparent transition-all  ${species === 'Alien' ? 'to-blue-800 from-emerald-600 group-hover:to-blue-800 group-hover:from-emerald-500' : 'to-indigo-800 from-blue-700/80 group-hover:to-indigo-900 group-hover:from-blue-700'}`}
                        >
                            {qrSpecies(species)}
                        </p>

                        <p class="text-2xl font-bold text-slate-50 sm:text-3xl">{name}</p>
                    </div>
                    <div class={`flex flex-col space-y-4 sm:space-y-2 ${vOptions ? "hidden" : ""}`}>
                        <span class="text-xs font-semibold text-gray-300 bg-black bg-opacity-50 rounded-full px-2 py-.5 sm:py-1 transition-all  h-[1.9rem]  place-items-center  justify-around flex capitalize opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 ">
                            {qrGender(gender)} {IconGender}
                        </span>
                        <span class="text-xs font-semibold text-gray-300 bg-black bg-opacity-50 rounded-full px-2 py-.5 sm:py-1 transition-all  h-[1.9rem]  place-items-center  justify-around flex capitalize opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 ">
                            {verEstado()}
                        </span>

                    </div>
                </div>
                <div
                    class={`translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 text-sm text-[.95rem] text-slate-50 ${vOptions ? "max-w-max " : ""}`}
                >

                    <em class={`max-w-28 font-bold text-xl text-slate-100 tracking-widest not-italic text-center ${vOptions ? "hidden" : ""}`}>
                        {/* traducir esta parte  */}
                        Se vio por ultima vez en {location?.name}
                    </em>


                    <div class="text-base sm:text-lg font-medium ">
                        {/* traducir esta parte  */}
                        <p class='text-slate-100/90'>Lugar de nacimiento de el personaje {qrUnknown(origin?.name)}</p>

                        <p class={`truncate text-slate-100/80  ${vOptions ? "hidden" : ""}`}>
                            Transitando por los episodios {qrEpisodes(episode)}
                        </p>

                    </div>

                    <a href={`personajes/personaje-${id}`} class={`mt-3 ms-auto w-max text-end block  font-semibold *: bg-gradient-to-t px-4 py-1.5 rounded-md border border-zinc-400/70 ${qrBg(species)} `}>Ir ahora</a>


                </div>
            </div >
        </div >

    )
}

