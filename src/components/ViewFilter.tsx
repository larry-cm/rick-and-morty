import type { FiltroSelected, RequestFilter } from "@/types/Filtros";
import MainArea from "./sections/MainArea";
import { sections, widthClases } from "@/const/constantes";
import { CardsEpisodios, CardsUbicaciones } from "./cards/Cards";
import { useEffect } from "react";
import { DefaultNotFound } from "@/services/filtrado";
import CardsPersonajes from "./cards/Personajes";
const { person, episode, ubi } = sections
export default function viewFilter({ contexto, data, updateArraySorted, searchFilterInitial }: { contexto: FiltroSelected, data: RequestFilter | undefined, updateArraySorted: any, searchFilterInitial: string }) {
    let personajes, episodios, ubicaciones
    (data) && ({ personajes, episodios, ubicaciones } = data)

    const posibilidad = {
        personajes: (
            <MainArea key={person} title={person} widthGrid={widthClases.grande}>
                {DefaultNotFound(personajes, searchFilterInitial, (personajes) => personajes
                    .map(({ id, name, status, species, origin, image }) =>
                        <CardsPersonajes
                            id={id}
                            key={id}
                            name={name}
                            status={status}
                            species={species}
                            origin={origin}
                            image={image} />
                    ))}
            </MainArea>
        ),
        episodios: (
            <MainArea key={episode} title={episode} widthGrid={widthClases.mediano}>
                {DefaultNotFound(episodios, searchFilterInitial, (episodios) => episodios
                    .map(({ id, name, episode }) => (
                        <CardsEpisodios
                            id={id}
                            key={id}
                            name={name}
                            episode={episode.toString()} />
                    )))}
            </MainArea>
        ),
        ubicaciones: (
            <MainArea key={ubi} title={ubi} widthGrid={widthClases.pequeño}>
                {DefaultNotFound(ubicaciones, searchFilterInitial, (ubicaciones) => ubicaciones
                    .map(({ id, name, dimension }) =>
                        <CardsUbicaciones
                            id={id}
                            key={id}
                            name={name}
                            dimension={dimension} />
                    ))}
            </MainArea>
        )
    }
    useEffect(() => {
        updateArraySorted()
    }, [data])
    return posibilidad[contexto as keyof typeof posibilidad]
}