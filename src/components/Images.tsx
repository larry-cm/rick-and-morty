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
                <div class="">
                    <p
                        class="text-sm font-medium uppercase tracking-widest bg-gradient-to-r from bg-fuchsia-400 to-pink-500 bg-clip-text text-transparent"
                    >
                        {qrSpecies(species)}
                    </p>

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
                    <p class="truncate">
                        Transitando por los episodios {qrEpisodes(episode)}
                    </p>
                    <div class="flex justify-end">
                        <a
                            class="mt-1 hover:underline font-semibold decoration-2 hover:animate-jiggle underline-offset-2"
                            href={url}>Ver mas...</a>
                    </div>
                </div>
            </div>
        </div>

    )
}

