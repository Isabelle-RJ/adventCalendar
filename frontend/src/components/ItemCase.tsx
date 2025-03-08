import { useState } from 'react'
import Modal from './Modal.tsx'
import { DateTime } from 'luxon'
import GiftClose from './GiftClose.tsx'
import GiftOpen from './GiftOpen.tsx'
import GiftDisable from './GiftDisable.tsx'

export interface ItemCaseInterface {
  id?: string,
  number: number,
  gift: string,
  is_opened?: boolean,
  opened_at?: string,
}

interface ItemCaseProps {
  id?: string,
  number: number,
  gift: string,
  is_opened?: boolean,
  opened_at?: string,
  onDescriptionChange?: (id: string, description: string) => void,
}

export default function ItemCase({ id, number, gift, is_opened, opened_at }: ItemCaseProps) {
  const [open, setOpen] = useState<boolean>(false)
  const today = DateTime.now().startOf('day')

  return (
    <>
      <Modal open={open}
             setOpen={setOpen}
             height={'h-96'}
             width={'w-96'}>
        <p className="text-xl text-primary-blue">{gift}</p>
      </Modal>
      <div
        className={`${number === 25 ? 'w-[60px] h-[60px]' : 'w-[40px] h-[40px]'} relative cursor-pointer bg-primary-trans-dark p-1 flex justify-center items-center rounded-lg shadow-lg relative ${open ? 'pointer-events-none' : 'pointer-events-auto'
        }`}
        onClick={() => today.day >= number ? setOpen(true) : null}
      >
        {today.day === number ? (
          <GiftClose number={number}/>
        ) : today.day > number ? (
          is_opened ? <GiftOpen number={number}/> : <GiftClose number={number}/>
        ) : (
              <GiftDisable number={number}/>
            )}
        <h1
          className="absolute text-sm justify-center items-center text-4xl font-bold text-primary-dark">
          {number}
        </h1>
      </div>
    </>
  )
}
