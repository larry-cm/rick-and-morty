import { IcoVida, IcoAlien, IcoPlaneta } from "@/assets/Icons";
import { BtnFavoritos } from "@components/BtnFavoritos";
import BtnVerMas from "@components/BtnVerMas";
import { Desconocidos, padding, type PropsPerson } from "@components/cards/Cards";

export default function CardsPersonajes({
    id,
    name,
    status,
    species,
    origin,
    image: rutaImg
}: PropsPerson) {

    return (
        <article
            className={`text-white bg-slate-500/50 hover:bg-slate-500/80 transition-all rounded-lg w-11/12 sm:size-full mx-auto sm:mx-0 flex flex-col ${padding}`}
        >
            <img
                width={500}
                height={500}
                loading='eager'//{id < 5 ? 'eager' : 'lazy'}
                src={rutaImg ?? '/public/rick-logo.svg'}
                alt='imagen de relleno'
                className='rounded-xl object-cover '
            />
            <div className='min-h-44 max-h-52 flex flex-col justify-between'>
                <header className='flex mt-4'>
                    <div className='*:*:*:text-base w-3/4 icons-cards truncate'>
                        <strong
                            className='font-medium text-lg mb-2'
                            title={name ?? 'Nombre del personaje'}
                        >
                            {name ?? 'Nombre del personaje'}
                        </strong>
                        <div
                            className='space-y-1 flex flex-col *:space-x-2 *:flex *:items-center text-slate-100/90'>
                            <p>
                                <i>
                                    <IcoVida className='size-5' />
                                </i>
                                <span title={Desconocidos(status, 'Estado') ?? 'estado del personaje'}>
                                    {Desconocidos(status, 'Estado') ?? 'estado del personaje'}
                                </span>
                            </p>
                            <p>
                                <i>
                                    <IcoAlien className='size-5' />
                                </i>
                                <span title={species ?? 'especie del personaje'}>
                                    {species ?? 'Humano'}
                                </span>
                            </p>
                            <p>
                                <i>
                                    <IcoPlaneta className='size-5' />
                                </i>
                                <span
                                    className='truncate'
                                    title={Desconocidos(origin?.name, 'Planeta') ?? 'Tierra'}
                                >
                                    {Desconocidos(origin?.name, 'Planeta') ?? 'Tierra'}
                                </span>
                            </p>
                        </div>
                    </div>
                    <aside className='w-1/3'>
                        <BtnFavoritos id={id} labelId='person-card' widthClase='' />
                    </aside>
                </header>
                <footer className='flex flex-row-reverse w-full'>
                    <BtnVerMas name={name} color />
                </footer>
            </div>
        </article>
    )
}