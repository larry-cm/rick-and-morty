import { Persons, Ubicaciones, Temporadas } from "@/icons/menuIcons"
import type { ComponentChildren } from "preact"

function MiniItem({ children, ruta }: { children: ComponentChildren, ruta: string }) {
  return (
    <a href={ruta ?? "personajes"}
      class="flex flex-row gap-1 items-center text-white hover:bg-gray-600/20 p-2 rounded-lg   min-w-max text-sm"
    >

      {children}
    </a>
  )
}
export default function ItemsMenu() {
  return (
    <>

      <MiniItem ruta='/personajes'>
        <Persons />
        <p>Personajes</p>
      </MiniItem>

      <MiniItem ruta="#">
        <Temporadas />
        <p>Temporadas</p>
      </MiniItem>
      <MiniItem ruta="#">
        <Ubicaciones />
        <p>Ubicaciones</p>
      </MiniItem>

    </>
  )
}
