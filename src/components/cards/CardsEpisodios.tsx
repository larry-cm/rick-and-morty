import { IcoCorazon, IcoEpisodios } from "@/assets/Icons";
import BtnVerMas from "@/components/cards/BtnVerMas";

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
                    <input
                        type="checkbox"
                        name=""
                        className="sr-ony peer hidden"
                        id={`favoritos-episodios-${id}`}
                    />
                    <label
                        className="peer-checked:*:text-red-500"
                        htmlFor={`favoritos-episodios-${id}`}
                    >
                        <span className="sr-only">
                            icono del corazón para episodios favoritos
                        </span>
                        <IcoCorazon
                            className="text-sky-500 size-5 cursor-pointer"
                        />
                    </label>
                </div>
            </div>
        </div>
    );
};

export default CardsEpisodios;
