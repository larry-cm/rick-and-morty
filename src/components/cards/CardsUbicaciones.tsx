import BtnVerMas from "@/components/BtnVerMas";
import { IcoCorazon, IcoPlaneta } from "@/assets/Icons";
import { BtnFavoritos } from "../BtnFavoritos";

interface Props {
    id: number;
    name: string;
    dimension: string;
}
const formarDimension = (n: string): string => {
    if (n === "unknown") {
        return "Dimensión desconocida";
    }
    return n;
};

const CardsUbicaciones = ({ id, name, dimension }: Props) => {

    return (
        <div className="bg-slate-500/50 hover:bg-slate-500/80 transition-colors rounded-lg w-full flex flex-col h-52 p-3 relative mt-8">
            <picture className="-top-9 right-0 mx-auto w-fit left-0 absolute">
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
                <BtnVerMas name={`la dimensión ${name}`} claseMargin="mx-auto" />
                <div className="w-full flex justify-center">
                    <BtnFavoritos id={id} labelId="ubi-card" widthClase="" />
                </div>
            </div>
        </div>
    );
};

export default CardsUbicaciones;
