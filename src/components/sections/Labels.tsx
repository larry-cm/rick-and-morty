import { type JSX } from 'react'
interface TypeLabels {
  id: string
  children: JSX.Element
  manejoEstado: {
    filtroSelected: string
    handlerLocalStates: React.ChangeEventHandler<HTMLInputElement>
  }
}

export default function Labels({ id, children, manejoEstado }: TypeLabels) {
  return (
    <div>
      <input
        type='radio'
        name='filtrado'
        value={id}
        checked={manejoEstado.filtroSelected === id}
        onChange={manejoEstado.handlerLocalStates}
        className='sr-only peer/persona'
        id={id}
      />
      <label
        htmlFor={id}
        className='flex transition-colors items-center space-x-2 px-4 py-1.5 rounded-3xl shadow-md shadow-slate-500/25 bg-slate-500/50 text-slate-100/85 hover:text-slate-50  hover:shadow-slate-500/60 hover:bg-slate-500/80 peer-checked/persona:text-slate-800 peer-checked/persona:bg-sky-400/90 peer-checked/persona:hover:text-slate-900 peer-checked/persona:shadow-sky-400/30 peer-checked/persona:hover:shadow-sky-400/60'
      >
        {children}
      </label>
    </div>
  )
}
