import { Persons, Ubicaciones, Temporadas } from "@/icons/menuIcons"

export default function ItemsMenu() {
  return (
    <>
      <a href="personajes"
        class="flex flex-row gap-1 items-center hover:bg-gray-600/20 p-2 rounded-lg min-w-max text-sm"
      >
        <Persons />
        <p>Personajes</p>
      </a>

      <a href="#"
        class="flex flex-row gap-1 items-center hover:bg-gray-600/20 p-2 rounded-lg min-w-max text-sm"
      >
        <Temporadas />
        <p>Temporadas</p>
      </a>

      <a href="#"
        class="flex flex-row gap-1 items-center hover:bg-gray-600/20 p-2 rounded-lg min-w-max text-sm"
      >
        <Ubicaciones />
        <p>Ubicaciones</p>
      </a>
    </>
  )
}
