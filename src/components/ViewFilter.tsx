import type { FiltroSelected, RequestFilter } from "@/types/Filtros";
import MainArea from "@components/sections/MainArea";
import { sections, widthClases } from "@/const/constantes";
import { CardsEpisodios, CardsUbicaciones, CardsPersonajes } from "@components/cards/Cards";
import { DefaultNotFound } from "@/services/filtrado";

const { person, episode, ubi } = sections
export default function viewFilter({ contexto, data, searchFilterInitial, getDataFavoriteInitial }: { contexto: FiltroSelected, data: RequestFilter | undefined, searchFilterInitial: string, getDataFavoriteInitial: () => void }) {
    const posibilidad = {
        personajes: (
            <MainArea key={person} title={person} widthGrid={widthClases.grande} updateFavorites={getDataFavoriteInitial}>
                {DefaultNotFound(data?.personajes, searchFilterInitial, (collection) => collection
                    .map(({ id, name, status, species, origin, image }) =>
                        <CardsPersonajes
                            id={id}
                            key={id}
                            name={name}
                            status={status}
                            species={species}
                            origin={origin}
                            image={image}
                            getDataFavoriteInitial={getDataFavoriteInitial} />
                    ))}
            </MainArea>
        ),
        episodios: ( 
            <MainArea key={episode} title={episode} widthGrid={widthClases.mediano} updateFavorites={getDataFavoriteInitial}>
                {DefaultNotFound(data?.episodios, searchFilterInitial, (episodios) => episodios
                    .map(({ id, name, episode }) => (
                        <CardsEpisodios
                            id={id}
                            key={id}
                            name={name}
                            episode={episode?.toString()}
                            getDataFavoriteInitial={getDataFavoriteInitial} />
                    )))}
            </MainArea>
        ),
        ubicaciones: (
            <MainArea key={ubi} title={ubi} widthGrid={widthClases.pequeño} updateFavorites={getDataFavoriteInitial}>
                {DefaultNotFound(data?.ubicaciones, searchFilterInitial, (ubicaciones) => ubicaciones
                    .map(({ id, name, dimension }) =>
                        <CardsUbicaciones
                            id={id}
                            key={id}
                            name={name}
                            dimension={dimension}
                            getDataFavoriteInitial={getDataFavoriteInitial} />
                    ))}
            </MainArea>
        )
    }

    return posibilidad[contexto as keyof typeof posibilidad]
}