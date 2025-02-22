import { IcoEpisodios, IcoPersonaje, IcoLupa, IcoPlaneta, IcoTodos } from "@/assets/Icons";
import { sectionEpisode, sectionPerson, sectionUbi } from "@/const/secciones";
import React, { useEffect, useState, type JSX } from "react";
import CardsEpisodios from "@/components/cards/CardsEpisodios";
import CardsPersonajes from "@/components/cards/CardsPersonajes";
import CardsUbicaciones from "@/components/cards/CardsUbicaciones";
import Labels from "@/components/sections/Labels";
import MainArea from "@/components/sections/MainArea"
import { NotFound } from "@/components/NotFound";
import type { Result, ResultEpisode, ResultLocation } from "@/types/Api";
interface GroupResults extends Result {
    dimension: string
}
const widthClases = {
    grande: "grid-cols-[repeat(auto-fill,minmax(200px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]",
    mediano: "grid-cols-[repeat(auto-fill,minmax(200px,1fr))]",
    pequeño: "grid-cols-[repeat(auto-fill,minmax(130px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]"
}
export default function Filtros({ personajes, episodios, ubicaciones }: { personajes: Result[], episodios: ResultEpisode[], ubicaciones: ResultLocation[] }): JSX.Element {
    const [filtroSelected, setFiltroSelected] = useState<string>("todos")
    const [searchFilter, setSearchFilter] = useState<string>('')

    const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiltroSelected(event.target.value)
    }
    const handlerSearch = (event: React.ChangeEvent<HTMLInputElement>) => {

        setSearchFilter(() => {
            if (event.target.value.trim() !== undefined) return event.target.value
            return ''
        })
    }

    const FilterCollection = (collection: Result[] | ResultEpisode[] | ResultLocation[]): GroupResults[] => {
        if (collection.length > 0) {
            return (collection as GroupResults[])
                .filter((element) => element.name.toLocaleLowerCase().trim().includes(searchFilter.toLocaleLowerCase().trim()))
        }
        return [];
    }

    const DefaultNotFound = (collection: Result[] | ResultLocation[] | ResultEpisode[], code: (collection: GroupResults[]) => React.ReactNode[], fallback = <NotFound />) => {
        return FilterCollection(collection as GroupResults[]).length > 0 ? code(collection as GroupResults[]) : fallback
    }
    const VistaFiltro = (filtroSelected: "todos" | "personajes" | "episodios" | "ubicaciones" | string) => {
        switch (filtroSelected) {
            case sectionPerson:
                return <MainArea title={sectionPerson} widthGrid={widthClases.grande}>
                    {
                        DefaultNotFound(personajes, (personajes) =>
                            personajes
                                .map(
                                    ({
                                        id,
                                        name,
                                        status,
                                        species,
                                        origin,
                                        image,
                                    }) => (
                                        <CardsPersonajes
                                            id={id}
                                            key={id}
                                            name={name}
                                            status={status}
                                            species={species}
                                            origin={origin}
                                            image={image}
                                        />
                                    ),
                                ))
                    }
                </MainArea>

            case sectionEpisode:
                return <MainArea title={sectionEpisode} widthGrid={widthClases.mediano}>
                    {
                        DefaultNotFound(episodios, (episodios) => episodios
                            .map(({ id, name, episode }) => (
                                <CardsEpisodios
                                    id={id}
                                    key={id}
                                    name={name}
                                    episode={episode.toString()}
                                />
                            )))
                    }
                </MainArea>

            case sectionUbi:
                return <MainArea title={sectionUbi} widthGrid={widthClases.pequeño}>
                    {
                        DefaultNotFound(ubicaciones, (ubicaciones) => ubicaciones.map(({ id, name, dimension }) => (
                            <CardsUbicaciones
                                id={id}
                                key={id}
                                name={name}
                                dimension={dimension}
                            />
                        )))

                    }
                </MainArea>

            default:
                return <>

                    {/* evaluar el que tenga mas elementos para ponerlo al bajo de las secciones de vista */}
                    {/* es decir ir ordenándose en orden ascendente*/}


                    {/* <MainArea title={sectionPerson} widthGrid={widthClases.grande}>
                        {
                            DefaultNotFound(personajes, (personajes) =>
                                personajes
                                    .map(
                                        ({
                                            id,
                                            name,
                                            status,
                                            species,
                                            origin,
                                            image,
                                        }) => (
                                            <CardsPersonajes
                                                id={id}
                                                key={id}
                                                name={name}
                                                status={status}
                                                species={species}
                                                origin={origin}
                                                image={image}
                                            />
                                        ),
                                    ))
                        }
                    </MainArea>
                    <MainArea title={sectionEpisode} widthGrid={widthClases.mediano}>
                        {
                            DefaultNotFound(episodios, (episodios) => episodios
                                .map(({ id, name, episode }) => (
                                    <CardsEpisodios
                                        id={id}
                                        key={id}
                                        name={name}
                                        episode={episode.toString()}
                                    />
                                )))
                        }
                    </MainArea>
                    <MainArea title={sectionUbi} widthGrid={widthClases.pequeño}>
                        {
                            DefaultNotFound(ubicaciones, (ubicaciones) => ubicaciones.map(({ id, name, dimension }) => (
                                <CardsUbicaciones
                                    id={id}
                                    key={id}
                                    name={name}
                                    dimension={dimension}
                                />
                            )))

                        }
                    </MainArea> */}
                </>
        }
    }



    // useEffect()

    return (
        <>
            <form className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-14">
                <div className="ps-0 flex w-full group lg:w-3/4">
                    <input
                        type="text"
                        name="search"
                        autoComplete="on"
                        onChange={handlerSearch}
                        id="search"
                        placeholder="Personajes. localizaciones, episodios y mucho más..."
                        className="border-none rounded-tl-3xl ps-4 h-9 rounded-bl-3xl transition-all bg-slate-500/50 group-hover:bg-slate-500/80 outline-none focus-visible:bg-slate-500/80 group-hover:placeholder:text-slate-300 peer w-[90%] placeholder:text-slate-100/90 placeholder:font-medium"
                    />
                    <label
                        htmlFor="search"
                        className="w-[10%] cursor-pointer flex items-center justify-center rounded-tr-3xl rounded-br-3xl bg-slate-500/50 group-hover:bg-slate-500/80 group-hover:text-slate-300 peer-focus:bg-slate-500/80 p-1.5 6px-2 lg:px-5 transition-all">
                        <span className="sr-only">Lupa de búsqueda de los filtros</span>
                        <IcoLupa className="size-5 min-w-5" />
                    </label>
                </div>
                <div
                    id="filtros"
                    className="flex flex-col md:flex-row md:items-center lg:justify-end lg:space-x-2 gap-y-2 md:gap-y-0 md:space-x-1 relative w-full"
                >
                    <legend className="text-nowrap text-slate-200/80 relative top-1/2"> Filtrar por :</legend>
                    <fieldset
                        className="flex flex-wrap lg:flex-nowrap gap-3 icons-cards *:*:cursor-pointer *:*:transition-all"
                    >
                        <Labels valor="todos" id="todas-opciones" manejoEstado={{ filtroSelected, handleFilter }}>
                            <>
                                <i><IcoTodos className="size-5" /></i>
                                <span>Todos</span>
                            </>
                        </Labels>
                        <Labels valor={sectionPerson} id={sectionPerson} manejoEstado={{ filtroSelected, handleFilter }}>
                            <>
                                <i><IcoPersonaje className="size-5" /></i>
                                <span>Personajes</span>
                            </>
                        </Labels>
                        <Labels valor={sectionEpisode} id={sectionEpisode} manejoEstado={{ filtroSelected, handleFilter }}>
                            <>
                                <i><IcoEpisodios className="size-5" /></i>
                                <span>Episodios</span>
                            </>
                        </Labels>
                        <Labels valor={sectionUbi} id={sectionUbi} manejoEstado={{ filtroSelected, handleFilter }}>
                            <>
                                <i><IcoPlaneta className="size-5" /></i>
                                <span>Localizaciones</span>
                            </>
                        </Labels>
                    </fieldset>
                </div>
            </form>
            <>

                {VistaFiltro(filtroSelected)}
            </>
        </>
    );
}