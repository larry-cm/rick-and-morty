import { type JSX } from 'react'
interface TypeLabels {
  valor: string
  id: string
  children: JSX.Element
  manejoEstado: {
    filtroSelected: string
    handleFilter: React.ChangeEventHandler<HTMLInputElement>
  }
}

export default function Labels ({ valor, id, children, manejoEstado }: TypeLabels) {
  return (
    <div>
      <input
        type='radio'
        name='filtrado'
        value={valor}
        checked={manejoEstado.filtroSelected === valor}
        onChange={manejoEstado.handleFilter}
        className='sr-only peer/persona'
        id={id}
      />
      <label
        htmlFor={id}
        className='flex items-center space-x-2 px-4 py-1.5 bg-slate-500/50 hover:bg-slate-500/80 text-slate-100/90  hover:text-slate-300 peer-checked/persona:text-slate-800 rounded-3xl peer-checked/persona:bg-sky-400/90'
      >
        {children}
      </label>
    </div>
  )
}
