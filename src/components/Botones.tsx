import type { JSX } from "preact/jsx-runtime"


interface BotonesTypes {
    svg: JSX.Element
    ruteFunc: number
    onClickFunc: () => void
    text: string
    clase: string
}


export default function Botones({ svg, ruteFunc, onClickFunc, text, clase }: BotonesTypes) {
    return (
        <a
            href={`#${ruteFunc}`}
            onClick={onClickFunc}
            class={`hidden absolute sm:inline-flex size-auto scale-[1.6] items-center justify-center rtl:rotate-180 *:dark:text-slate-700/80  hover:*:dark:text-slate-700 ${clase} sm:top-2/4 z-20 hover:scale-[1.86] lg:scale-[1.9] lg:hover:scale-[2.1] transition-all`}>
            <span class="sr-only">{text}</span>
            {svg}
        </a>
    );
};