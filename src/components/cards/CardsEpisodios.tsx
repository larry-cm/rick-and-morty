import { IcoCorazon, IcoEpisodios } from "@/assets/Icons";
import BtnVerMas from "@/components/BtnVerMas";
import { BtnFavoritos } from "../BtnFavoritos";

interface Props {
    id: number;
    name: string;
    episode: string;
}

const CardsEpisodios: React.FC<Props> = ({ id, name, episode }) => {
    return (
        <div className="text-white bg-slate-500/50 hover:bg-slate-500/80 transition-all p-3 rounded-lg space-y-2">
            <div className="flex items-center gap-x-2">
                <i className="w-auto">
                    <IcoEpisodios className="size-[18px] sm:size-5" />
                </i>
                <div className="flex items-center justify-start gap-1 w-[90%] overflow-hidden">
                    <span className="truncate">{name ?? " Adivina el nombre"} </span>
                    <div>|</div>
                    <span>{episode ?? "S10E10"}</span>
                </div>
            </div>
            <div className="flex items-center justify-between space-x-2">
                <BtnVerMas name={`el capitulo ${episode}`} />
                <div className="w-fit">
                    <BtnFavoritos id={id} labelId="episode-card" widthClase="w-full" />
                </div>
            </div>
        </div>
    );
};

export default CardsEpisodios;
