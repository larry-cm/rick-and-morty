import type { FiltroSelected, RequestFilter, FullF } from "@/types/Filtros";
import MainArea from "@components/sections/MainArea";
import { sections, widthClases } from "@/const/constantes";
import { CardsEpisodios, CardsUbicaciones, CardsPersonajes } from "@components/cards/Cards";
import { DefaultNotFound } from "@/services/filtrado";
import type React from "react";

const { person, episode, ubi } = sections
export default function viewFilter({ contexto, data, searchFilterInitial, getDataFavoriteInitial, numElementsInitial, btnFilter }: { contexto: FiltroSelected, data: RequestFilter | undefined, searchFilterInitial: string, getDataFavoriteInitial: () => void, btnFilter: (e: React.MouseEvent<HTMLButtonElement | HTMLLIElement>) => void, numElementsInitial?: FullF | null }) {
    const posibilidad = {
        personajes: (
            <MainArea
                key={person}
                btnFilter={btnFilter}
                numElements={numElementsInitial?.character && numElementsInitial?.character.length}
                title={person} widthGrid={widthClases.grande}
                updateFavorites={getDataFavoriteInitial}>
                {DefaultNotFound(data?.personajes, searchFilterInitial, (collection) => collection
                    .flatMap(({ id, name, status, species, origin, image }) =>
                        <CardsPersonajes
                            id={id}
                            key={id}
                            name={name}
                            status={status}
                            species={species}
                            origin={origin}
                            image={image}
                            numFavorites={numElementsInitial?.character ?? null}
                            getDataFavoriteInitial={getDataFavoriteInitial} />
                    ))}
            </MainArea>
        ),
        episodios: (
            <MainArea
                key={episode}
                btnFilter={btnFilter}
                title={episode}
                numElements={numElementsInitial?.episode && numElementsInitial?.episode.length}
                widthGrid={widthClases.mediano}
                updateFavorites={getDataFavoriteInitial}>
                {DefaultNotFound(data?.episodios, searchFilterInitial, (episodios) => episodios
                    .flatMap(({ id, name, episode }) => (
                        <CardsEpisodios
                            id={id}
                            key={id}
                            name={name}
                            episode={episode?.toString()}
                            numFavorites={numElementsInitial?.episode ?? null}
                            getDataFavoriteInitial={getDataFavoriteInitial} />
                    )))}
            </MainArea>
        ),
        ubicaciones: (
            <MainArea
                key={ubi}
                btnFilter={btnFilter}
                title={ubi}
                numElements={numElementsInitial?.location && numElementsInitial?.location.length}
                widthGrid={widthClases.pequeño}
                updateFavorites={getDataFavoriteInitial}>
                {DefaultNotFound(data?.ubicaciones, searchFilterInitial, (ubicaciones) => ubicaciones
                    .flatMap(({ id, name, dimension }) =>
                        <CardsUbicaciones
                            id={id}
                            key={id}
                            name={name}
                            dimension={dimension}
                            numFavorites={numElementsInitial?.location ?? null}
                            getDataFavoriteInitial={getDataFavoriteInitial} />
                    ))}
            </MainArea>
        )
    }

    return posibilidad[contexto as keyof typeof posibilidad]
}