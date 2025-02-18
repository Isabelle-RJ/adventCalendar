import { ReactNode, useEffect, useRef } from 'react'

interface ModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  children: ReactNode
  backgroudColor?: string
  height?: string
  width?: string
}

export default function Modal(
  {
    open,
    setOpen,
    children,
    backgroudColor = 'bg-white',
    height = 'h-full',
    width = 'w-full',
  }: ModalProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  function handleClickOutside(event: MouseEvent) {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setOpen(false)
    }
  }

  function blockFocusInsideModal() {
    if (ref.current) {
      const focusableElements = ref.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      firstElement.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && e.shiftKey) {
          e.preventDefault()
          lastElement.focus()
        }
      })

      lastElement.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && !e.shiftKey) {
          e.preventDefault()
          firstElement.focus()
        }
      })
    }
  }

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', blockFocusInsideModal)
      const btnClose = ref.current?.querySelector('.btn-close') as HTMLButtonElement
      btnClose?.focus()
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', blockFocusInsideModal)
    }
  }, [open])
  return (
    <>
      { open && (
        <div
          className="fixed inset-0 bg-gray-400/30 backdrop-blur-md backdrop-opacity-25 z-[999] flex justify-center items-center"
          style={ {pointerEvents: 'auto'} }
        >
          <div
            ref={ ref }
            className={ `relative flex justify-center items-center ${ backgroudColor } p-10 ${ height } ${ width }` }
            onClick={ (e) => e.stopPropagation() }
          >
            <button
              className="btn-close absolute top-4 right-4 text-primary-blue focus:ring-1 focus:ring-white"
              onClick={ () => setOpen(false) }
            >
              X
            </button>
            { children }
          </div>
        </div>
      ) }
    </>
  )
}