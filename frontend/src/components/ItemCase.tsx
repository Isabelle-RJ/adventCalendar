import { ChangeEvent, useEffect, useRef, useState } from 'react'
import Modal from './Modal.tsx'

interface ItemCaseProps {
    id: number,
    number: number,
    gift: string,
    is_opened: boolean,
    opened_at: string,
    onDescriptionChange?: (id: number, description: string) => void,
}

export default function ItemCase({id, number, gift, is_opened, opened_at, onDescriptionChange}: ItemCaseProps) {
    const [open, setOpen] = useState<boolean>(false)
    const [currentDescription, setCurrentDescription] = useState<string>('')

    function handleDescriptionChange(e: ChangeEvent<HTMLTextAreaElement>) {
        const newValue = e.target.value
        setCurrentDescription(newValue)
        if (onDescriptionChange) {
            onDescriptionChange(id, newValue)
        }
    }

    return (
      <>
          <Modal open={ open } setOpen={ setOpen } height={ 'h-96' } width={ 'w-96' }>
              <p className="text-xl text-primary-blue">{ gift }</p>
          </Modal>
          <div
            className={ `w-[150px] bg-gray-200 h-[150px] rounded-lg shadow-lg relative ${ open ? 'pointer-events-none' : 'pointer-events-auto'
            }` }
            onClick={ () => setOpen(true) }
          >
              <div className="p-4">
                  <h1 className="text-xl text-primary-blue">{ number }</h1>
              </div>
          </div>
      </>
    )
}