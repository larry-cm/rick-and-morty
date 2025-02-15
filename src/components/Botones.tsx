
interface BotonesTypes {
    ruteFunc: number
    onClickFunc: () => void
    text: string
    clase?: boolean
}

function SvgRow({ params }: { params?: boolean }) {
    return (
        <svg
            class={`${params ? 'rotate-90' : '-rotate-90'}  min-w-[24px] transition-transform duration-500 size-[22px]`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path
                fill="currentColor"
                d="m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z"
            ></path>
        </svg>
    )
}
export default function Botones({ ruteFunc, onClickFunc, text, clase }: BotonesTypes) {
    return (
        <a
            href={`#${ruteFunc}`}
            onClick={onClickFunc}
            class={`${clase ? 'border-0 border-l border-white/25 ps-2' : ''}`}>
            <span class="flex items-center">

                {clase ? (<>
                    {text}
                    <SvgRow params />
                </>
                ) : (
                    <>
                        <SvgRow />
                        {text}
                    </>
                )}

            </span>

        </a>
    );
};