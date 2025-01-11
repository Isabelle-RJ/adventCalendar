import { ChangeEvent, useEffect, useRef, useState } from "react"

interface ItemCaseProps {
    id: number,
    number: number,
    gift: string,
    is_opened: boolean,
    opened_at: string,
    onDescriptionChange?: (id: number, description: string) => void,
}

export default function ItemCase({ id, number, gift, is_opened, opened_at, onDescriptionChange }: ItemCaseProps) {
    const [open, setOpen] = useState<boolean>(false)
    const [currentDescription, setCurrentDescription] = useState<string>(gift)
    const ref = useRef<HTMLDivElement | null>(null)

    function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setOpen(false)
        }
    }

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden'
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.body.style.overflow = ''
        }

        return () => {
            document.body.style.overflow = ''
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [open])

    function handleDescriptionChange(e: ChangeEvent<HTMLTextAreaElement>) {
        const newValue = e.target.value
        setCurrentDescription(newValue)
        if (onDescriptionChange) {
            onDescriptionChange(id, newValue)
        }
    }

    return (
        <>
            {open && (
                <div
                    className="fixed inset-0 bg-gray-400/30 backdrop-blur-md backdrop-opacity-25 z-50 flex justify-center items-center"
                    style={{ pointerEvents: 'auto' }}
                >
                    <div
                        ref={ref}
                        className="relative flex justify-center items-center bg-white p-10 h-1/2 w-1/2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 text-primary-blue"
                            onClick={() => setOpen(false)}
                        >
                            X
                        </button>
                        <p className="text-xl text-primary-blue">{gift}</p>
                    </div>
                </div>
            )}

            <div
                className={`w-[150px] bg-gray-200 h-[150px] rounded-lg shadow-lg relative ${open ? 'pointer-events-none' : 'pointer-events-auto'
                    }`}
                onClick={() => setOpen(true)}
            >
                <div className="p-4">
                    <h1 className="text-xl text-primary-blue">{number}</h1>
                </div>

            </div>
        </>
    )
}