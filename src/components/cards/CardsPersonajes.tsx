import type { Location } from "@/types/Api";
import BtnVerMas from "@/components/BtnVerMas";
import { IcoVida, IcoAlien, IcoPlaneta, IcoCorazon } from "@/assets/Icons";
import { BtnFavoritos } from "../BtnFavoritos";

interface Props {
    id: number;
    name: string;
    status: string;
    species: string;
    origin: Location;
    image: string;
}
const Desconocidos = (ori: string, text: string) => ori === 'unknown' ? `${text} desconocido` : ori
export default function CardsPersonajes({
    id,
    name,
    status,
    species,
    origin,
    image: rutaImg
}: Props) {
    return (
        <div
            className="text-white bg-slate-500/50 hover:bg-slate-500/80 transition-all rounded-lg w-4/5  sm:size-full mx-auto sm:mx-0 flex flex-col p-3"
        >
            <img
                width={500}
                height={500}
                loading="lazy"
                src={rutaImg ?? '/public/rick-logo.svg'}
                alt="imagen de relleno"
                className="rounded-xl object-cover "
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
                        <div
                            className="space-y-1 flex flex-col *:space-x-2 *:flex *:items-center text-slate-100/90"
                        >
                            <div>
                                <i>
                                    <IcoVida className='size-5' />
                                </i>
                                <span title={Desconocidos(status, "Estado") ?? "estado del personaje"}>
                                    {Desconocidos(status, "Estado") ?? "estado del personaje"}
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
                                    <IcoPlaneta className='size-5' />
                                </i>
                                <span
                                    className="truncate"
                                    title={Desconocidos(origin?.name, 'Planeta') ?? "Tierra"}
                                >
                                    {Desconocidos(origin?.name, 'Planeta') ?? "Tierra"}
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* favoritos */}
                    <BtnFavoritos id={id} labelId="person-card" />
                </div>
                {/* footer image */}
                <div className="flex flex-row-reverse w-full">
                    <BtnVerMas name={name} color />
                </div>
            </div>
        </div>
    );
}
