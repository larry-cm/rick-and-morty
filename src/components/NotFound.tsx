import { IcoNotFound } from '@/assets/Icons'

export const NotFound: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-[400px] text-center p-4 col-span-full'>
      <div className='relative mb-6'>
        {/* Reemplaza con el código SVG de Search */}
        <IcoNotFound className='size-52 text-slate-300' />
      </div>
      <h2 className='text-2xl font-bold mb-2 text-slate-300'>
        Lo sentimos, no hay resultados
      </h2>
      <p className='text-slate-100/90 max-w-md mb-6'>
        No pudimos encontrar lo que estás buscando. Por favor, intenta con
        otros términos de búsqueda o revisa si estas buscando algo coherente.
      </p>

    </div>
  )
}
