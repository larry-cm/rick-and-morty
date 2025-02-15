import { useState } from "preact/hooks"
import ItemsMenu from "@/components/ItemsMenu";

export default function Menu() {
  const [vAni, setViewAnime] = useState(false)

  const handleClick = () => {
    vAni ? setViewAnime(false) : setViewAnime(true)
  }


  return (

    <>

      <button
        onFocusOut={() => { vAni && setTimeout(() => setViewAnime(false), 200) }}
        onClick={handleClick}
        class={` font-medium hidden transition-transform min-w-min h-max py-1.5 px-4 sm:flex flex-row items-center gap-1  bg-gray-800 rounded-lg shadow-md border border-zinc-400 text-white sm:relative `}
      >
        <span class="hidden sm:block"> Menu </span>
        <svg
          class={` ${vAni ? "sm:rotate-180 rotate-[270deg] " : "rotate-180 sm:rotate-90"} min-w-[24px] transition-transform duration-500 `}
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z"
          ></path>
        </svg>
      </button>

      {/* menu desplegable */}
      <div
        class={`absolute hidden shadow-lg min-w-max sm:max-w-6xl sm:top-[80%] sm:right-8 h-max p-2 bg-gray-800 border border-white/25 rounded-lg sm:flex sm:flex-col gap-2 text-white ${!vAni ? "animate-fade-out hidden *:hidden " : "animate-fade-in  "} `}
      >
        <ItemsMenu />

      </div>
    </>
  )
}