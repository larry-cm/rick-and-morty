import { IcoHeart } from '@/assets/Icons'
import { structureFavorites } from '@/const/constantes';

const includeFavoriteCard = (id: number, numFavorites: string[] | null) => numFavorites && numFavorites?.includes(id.toString())

function requestFormModal(event: React.MouseEvent<HTMLDialogElement>) {
  const dialogElement = event.currentTarget as HTMLDialogElement
  function subsEvent() {
    dialogElement.returnValue && (
      dialogElement.removeEventListener('close', subsEvent),
      console.log('ir a ', dialogElement.returnValue)
    )

  }
  dialogElement.addEventListener('close', subsEvent)
}

function sendFavorite(event: React.MouseEvent<HTMLButtonElement>) {
  const target = event.currentTarget as HTMLInputElement
  const dialog = document.getElementById('view-modal') as HTMLDialogElement
  if (target) {
    const [, sectionId, numberId] = target.id.split('-')
    const favoritos = localStorage.getItem('favorito')
    const firstKey = sectionId as keyof typeof structureFavorites
    let FullFavorites = structureFavorites

    if (favoritos) {
      const parsedFavorites = JSON.parse(favoritos) as typeof FullFavorites
      const arraySection = parsedFavorites[firstKey]

      if (arraySection.includes(numberId)) {
        parsedFavorites[firstKey] = arraySection.filter(item => item !== numberId)
      } else if (arraySection.length < 10) {
        arraySection.push(numberId)
      } else {
        dialog && dialog.showModal()
      }
      FullFavorites = parsedFavorites
    } else {
      FullFavorites[firstKey].push(numberId)
    }

    localStorage.setItem('favorito', JSON.stringify(FullFavorites))
  }
}
export function BtnFavoritos({ id, labelId, getDataFavoriteInitial, numFavorites }: { id: number, labelId: string, getDataFavoriteInitial: () => void, numFavorites: string[] | null }) {

  function executeClick(event: React.MouseEvent<HTMLButtonElement>) {
    sendFavorite(event)
    getDataFavoriteInitial && getDataFavoriteInitial()
  }

  return (
    <>
      <button
        id={`favorito-${labelId}-${id}`}
        className={`${includeFavoriteCard(id, numFavorites) ? '*:text-red-500 *:drop-shadow-red-400/50' : '*:drop-shadow-sky-400/50'} h-fit bg-black/40 hover:bg-slate-800/80 py-2 px-2 rounded-full cursor-pointer`}
        onClick={executeClick}>
        <span className='sr-only'>icono de favorito</span>
        <IcoHeart
          className='text-sky-400 drop-shadow-sm  size-5'
        />
      </button>

      <dialog id='view-modal' closedby='any' onClick={requestFormModal} className='min-w-xs dialog'> {/* closedby sirve solo en unos navegadores */}
        <p className='flex flex-col text-pretty  font-semibold'>
          No puedes suscribirte a mas de 10 favoritos si no tienes una cuenta.
          <span className='pt-2 font-bold after:content-["!"] after:text-sky-400 after:ps-0.5 before:content-["¡"] before:text-sky-400 before:pe-0.5'>Que esperas regístrate con nosotros</span>

        </p>
        <form method="dialog" className='flex w-full justify-between pt-4  font-semibold '>
          <button className='min-w-[100px] text-nowrap flex items-center justify-center py-1.5 px-3 sm:px-4 w-fit rounded-3xl transition-colors hover:shadow-md shadow-slate-800 space-x-2 bg-black/40 hover:bg-sky-400 text-slate-300 hover:text-white group font-medium duration-150'>Cancelar</button>
          <button value='registrar' className=' min-w-[100px] text-nowrap flex items-center justify-center py-1.5 px-3 sm:px-4 w-fit rounded-3xl transition-colors hover:shadow-md shadow-slate-800 space-x-2 bg-black/40 hover:bg-sky-400 text-slate-300 hover:text-white group font-medium duration-150'>Registrarme ahora</button>
        </form>
      </dialog>
    </>
  )
}
