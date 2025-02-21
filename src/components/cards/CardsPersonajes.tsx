import type { Location } from "@/types/Api";
import BtnVerMas from "@/components/cards/BtnVerMas";
import { IcoVida, IcoAlien, IcoPlaneta, IcoCorazon } from "@/assets/Icons";

interface Props {
    id: number;
    name: string;
    status: string;
    species: string;
    location: Location;
    image: string;
}

export default function CardsPersonajes({
    id,
    name,
    status,
    species,
    location,
    image: rutaImg
}: Props) {
    return (
        <article
            className="text-white bg-slate-500/50 hover:bg-slate-500/80 transition-all rounded-lg size-full flex flex-col p-3"
        >
            <img
                width={500}
                height={500}
                loading="lazy"
                src={rutaImg}
                alt="imagen de relleno"
                className="rounded-xl object-cover"
            />
            <div className="min-h-44 max-h-52 flex flex-col justify-between">
                {/* main image */}
                <div className="flex mt-4">
                    <div className="*:*:*:text-base w-3/4 icons-cards truncate">
                        {/* title image */}
                        <strong
                            className="font-medium text-lg mb-2"
                            title={name ?? "Nombre del personaje"}
                        >
                            {name ?? "Nombre del personaje"}
                        </strong>
                        {/* desc image */}
                        <section
                            className="space-y-1 flex flex-col *:space-x-2 *:flex *:items-center text-slate-100/90"
                        >
                            <div>
                                <i>
                                    <IcoVida />
                                </i>
                                <span title={status ?? "estado del personaje"}>
                                    {status ?? "estado del personaje"}
                                </span>
                            </div>
                            <div>
                                <i>
                                    <IcoAlien className="size-5" />
                                </i>
                                <span title={species ?? "especie del personaje"}>
                                    {species ?? "Humano"}
                                </span>
                            </div>
                            <div>
                                <i>
                                    <IcoPlaneta />
                                </i>
                                <span
                                    className="truncate"
                                    title={location?.name ?? "Tierra"}
                                >
                                    {location?.name ?? "Tierra"}
                                </span>
                            </div>
                        </section>
                    </div>
                    {/* favoritos */}
                    <label
                        htmlFor={`favorito-card-${id}`}
                        className="flex w-1/4 flex-row-reverse pt-0 h-fit"
                    >
                        <input
                            type="checkbox"
                            name="favorito-id-#"
                            className="sr-only peer"
                            id={`favorito-card-${id}`}
                        />
                        <div className="peer-checked:*:text-red-600 h-fit">
                            <span className="sr-only">icono de favorito</span>
                            <IcoCorazon
                                className="text-sky-400 size-5 cursor-pointer"
                            />
                        </div>
                    </label>
                </div>
                {/* footer image */}
                <div className="flex flex-row-reverse w-full">
                    <BtnVerMas name={name} color />
                </div>
            </div>
        </article>
    );
}
