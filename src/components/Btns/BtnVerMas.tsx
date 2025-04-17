import { IcoInfo } from '@/assets/Icons'
import type { JSX, ReactNode } from 'react'
interface Props {
  name: string
  ruta?: string
  color?: boolean
  children?: ReactNode
  claseMargin?: string
}

export default function BtnVerMas({ name, ruta, color: booleanColor, children, claseMargin }: Props): JSX.Element {
  return (
    <a
      href={ruta ?? '#mas'}
      title={`saber mas sobre ${name?.toLowerCase()}`}
      className={`flex items-center justify-center py-1.5 px-3 sm:px-4 w-fit rounded-3xl transition-colors drop-shadow-sm drop-shadow-slate-950  space-x-2 bg-black/40 hover:bg-sky-400 text-slate-300 hover:text-slate-800/90 group font-medium ${claseMargin}`}
    >
      {
        children ?? (
          <>
            <i>
              <IcoInfo className='size-5' />

            </i>
            <span
              className={`after:content-['...'] text-nowrap group-hover:after:text-slate-800/90 ${booleanColor && 'after:text-[#BFDE42]'}`}>
              Ver mas
            </span>
          </>
        )
      }
    </a>
  )
};
