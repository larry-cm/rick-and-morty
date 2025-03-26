// episodios
import { IcoEpisodios } from '@/assets/Icons'
import BtnVerMas from '@/components/BtnVerMas'
import { BtnFavoritos } from '../BtnFavoritos'

// ubicaciones
import type { Location } from '@/types/Api'
import { IcoPlaneta } from '@/assets/Icons'

export interface Base {
    id: number
    name: string
}

export interface PropsPerson extends Base {
    status: string
    species: string
    origin: Location
    image: string
}

export const Desconocidos = (ori: string, text: string) => ori === 'unknown' ? `${text} desconocido` : ori
export const padding = 'p-3 sm:px-4 sm:py-3'

export function CardsEpisodios({ id, name, episode }: Base & { episode: string }) {
    return (
        <article className={`text-white bg-slate-500/50 hover:bg-slate-500/80 transition-all rounded-lg space-y-2 ${padding}`}>
            <header className='flex items-center gap-x-2'>
                <i className='w-auto'>
                    <IcoEpisodios className='size-[18px] sm:size-5' />
                </i>
                <div className='flex items-center justify-start gap-1 w-[90%] overflow-hidden'>
                    <span className='truncate'>{name ?? ' Adivina el nombre'} </span>
                    <div>|</div>
                    <span>{episode ?? 'S10E10'}</span>
                </div>
            </header>
            <footer className='flex items-center justify-between space-x-2'>
                <BtnVerMas name={`el capitulo ${episode}`} />
                <div className='w-fit'>
                    <BtnFavoritos id={id} labelId='episode-card' widthClase='w-full' />
                </div>
            </footer>
        </article>
    )
}

export function CardsUbicaciones({ id, name, dimension }: Base & { dimension: string }) {
    return (
        <article className={`bg-slate-500/50 hover:bg-slate-500/80 transition-colors rounded-lg w-full flex flex-col h-52 relative mt-8 ${padding}`}>
            <picture className='-top-9 right-0 mx-auto w-fit left-0 absolute'>
                <IcoPlaneta className='size-14' />
            </picture>
            <footer className='pt-4 text-center flex flex-col justify-between h-full'>
                <strong title={name} className='font-semibold truncate block text-lg'>
                    {name ?? 'Titulo del planeta'}
                </strong>
                <span
                    title={Desconocidos(dimension, 'Dimensión')}
                    className='font-medium text-sky-400 h-12 flex items-center'
                >
                    {Desconocidos(dimension, 'Dimensión') ?? 'Dimensión del planeta '}
                </span>
                <BtnVerMas name={`la dimensión ${name}`} claseMargin='mx-auto' />
                <div className='w-full flex justify-center'>
                    <BtnFavoritos id={id} labelId='ubi-card' widthClase='' />
                </div>
            </footer>
        </article>
    )
}
