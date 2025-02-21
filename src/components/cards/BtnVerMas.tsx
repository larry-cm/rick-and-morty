import { IcoInfo } from "@/assets/Icons";
interface Props {
    name: string;
    ruta?: string;
    color?: boolean;
}

export default function BtnVerMas({ name, ruta, color: booleanColor }: Props) {
    return (
        <a
            href={ruta ?? "#mas"}
            title={`saber mas sobre ${name?.toLowerCase()}`}
            className="flex items-center py-1.5 px-4 rounded-3xl transition-all hover:shadow-md shadow-slate-800 space-x-2 bg-black/40 hover:bg-sky-400 text-slate-300 hover:text-slate-800/90 group font-medium"
        >
            <i>
                <IcoInfo className="size-5" />

            </i>
            <span
                className={`after:content-['...'] group-hover:after:text-slate-800/90 after:transition-colors ${booleanColor ? "after:text-[#BFDE42]" : ""
                    }`}
            >
                Ver mas
            </span>
        </a>
    );
};

