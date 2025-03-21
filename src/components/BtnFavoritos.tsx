import { IcoCorazon } from '@/assets/Icons'

export function BtnFavoritos ({ id, labelId, widthClase }: { id: number, labelId: string, widthClase?: string }) {
  return (
    <label
      htmlFor={`favorito-${labelId}-${id}`}
      className={`flex ${widthClase ?? 'w-1/4'} flex-row-reverse pt-0 h-fit `}
    >
      <input
        type='checkbox'
        name='favorito-id-#'
        className='sr-only peer'
        id={`favorito-${labelId}-${id}`}
      />
      <div className='peer-checked:*:text-red-600 h-fit bg-black/40 hover:bg-slate-800/80 py-2 px-2 rounded-full cursor-pointer'>
        <span className='sr-only'>icono de favorito</span>
        <IcoCorazon
          className='text-sky-400 size-5 '
        />
      </div>
    </label>
  )
}
