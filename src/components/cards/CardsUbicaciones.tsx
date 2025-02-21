import { Icon } from "astro-icon/components";
import BtnVerMas from "@/components/cards/BtnVerMas";
import { IcoCorazon, IcoPlaneta } from "@/assets/Icons";

interface Props {
    id: number;
    name: string;
    dimension: string;
}

const CardsUbicaciones: React.FC<Props> = ({ id, name, dimension }) => {
    const formarDimension = (n: string): string => {
        if (n === "unknown") {
            return "Dimensión desconocida";
        }
        return n;
    };

    return (
        <div className="bg-slate-500/50 hover:bg-slate-500/80 rounded-lg size-full flex flex-col h-52 p-3 relative mt-8">
            <picture className="-top-9 min-[332px]:left-1/3 max-[332px]:left-[40%] absolute">
                <IcoPlaneta className="size-14" />
            </picture>
            <div className="pt-4 text-center flex flex-col justify-between h-full">
                <strong title={name} className="font-semibold truncate block text-lg">
                    {name ?? "Titulo del planeta"}
                </strong>
                <span
                    title={formarDimension(dimension)}
                    className="font-medium text-sky-400 min-h-12 flex items-center justify-center"
                >
                    {formarDimension(dimension) ?? "Dimensión del planeta "}
                </span>
                <BtnVerMas name={`la dimensión ${name}`} />
                <div className="w-full flex justify-center">
                    <input
                        type="checkbox"
                        name=""
                        className="sr-ony peer hidden"
                        id={`favoritas-ubicaciones-${id}`}
                    />
                    <label
                        className="peer-checked:*:text-red-500"
                        htmlFor={`favoritas-ubicaciones-${id}`}
                    >
                        <span className="sr-only">
                            icono del corazón para ubicaciones favoritos
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

export default CardsUbicaciones;
