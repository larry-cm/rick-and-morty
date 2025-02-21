import MainArea from "@/components/sections/MainArea"
import CardsPersonajes from "@/components/cards/CardsPersonajes"
import CardsEpisodios from "@/components/cards/CardsEpisodios"
import CardsUbicaciones from "@/components/cards/CardsUbicaciones"
import type { Result, ResultEpisode, ResultLocation } from "@/types/Api"

interface TypeSP {
    title: string
    personajes: Result[]
}

export function SectionPersonaje({
    title,
    personajes
}: TypeSP) {
    return (
        <MainArea title={title}>
            <div
                className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4"
            >
                {
                    personajes
                        ?.slice(0, 8)
                        .map(
                            ({
                                id,
                                name,
                                status,
                                species,
                                location,
                                image,
                            }) => (
                                <CardsPersonajes
                                    key={id}
                                    id={id}
                                    name={name}
                                    status={status}
                                    species={species}
                                    location={location}
                                    image={image}
                                />
                            ),
                        )
                }
            </div>
        </MainArea>
    )
}

export function SectionEpisodios({ episodios, title }: { episodios: ResultEpisode[], title: string }) {
    return (
        <MainArea title={title ?? "Episodios"}>
            <div
                className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4"
            >
                {
                    episodios
                        ?.slice(0, 8)
                        .map(({ id, name, episode }) => (
                            <CardsEpisodios
                                id={id}
                                key={id}
                                name={name}
                                episode={episode.toString()}
                            />
                        ))
                }
            </div>
        </MainArea>
    )
}

export function SectionUbicacion({ title, ubicaciones }: { title: string, ubicaciones: ResultLocation[] }) {
    return (
        <MainArea title={title ?? "Locaciones"}>
            <div
                className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4"
            >
                {
                    ubicaciones
                        ?.slice(0, 6)
                        .map(({ id, name, dimension }) => (
                            <CardsUbicaciones
                                id={id}
                                key
                                name={name}
                                dimension={dimension}
                            />
                        ))
                }
            </div>
        </MainArea>
    )
}