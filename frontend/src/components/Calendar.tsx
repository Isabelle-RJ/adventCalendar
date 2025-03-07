import { Link } from 'react-router'
import { MdOutlineEditCalendar } from 'react-icons/md'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { ItemCaseInterface } from './ItemCase'
import { ReactNode, useState } from 'react'
import { BsFillShareFill } from 'react-icons/bs'
import Modal from './Modal.tsx'
import { useAuth } from '../store/AuthContext.tsx'


export interface CalendarProps {
  title?: string,
  image: string,
  itemsCases: ItemCaseInterface[],
  slug?: string,
  id?: string,
  onDelete?: (slug: string) => void,
  onDeleteLoading?: boolean,
  onUpdate?: (slug: string) => void,
  onShare?: (id: string) => void,
  onShareLoading?: boolean,
  children?: ReactNode
  width?: string,
  height?: string,
}

function btnContainer(
  slug: string | undefined,
  id: string | undefined,
  onDelete: ((slug: string) => void) | undefined,
  onDeleteLoading: boolean | undefined,
  onUpdate: ((slug: string) => void) | undefined,
  onShare: ((id: string) => void) | undefined,
  onShareLoading: boolean | undefined,
) {
  if (slug) {
    return (
      <div className="div-options flex flex-row">
        <Link to={`/calendar/update/${slug}`}> {/* string templating : slug = calendrier-de-prenom */}
          <MdOutlineEditCalendar className="icons-calendar text-secondary-argent hover:text-primary-blue"/>
        </Link>
        <button onClick={() => onDelete ? onDelete(slug) : null}
                disabled={onDeleteLoading}
                className={onDeleteLoading ? 'cursor-not-allowed' : 'cursor-pointer'}
        >
          <RiDeleteBin6Fill className="icons-calendar text-secondary-argent hover:text-primary-blue"/>
        </button>
        <button onClick={() => onShare ? onShare(id as string) : null}
                disabled={onShareLoading}
                className={onShareLoading ? 'cursor-not-allowed' : 'cursor-pointer'}
        >
          <BsFillShareFill className="icons-calendar text-secondary-argent hover:text-primary-blue"/>
        </button>
      </div>
    )
  }
}

export default function Calendar(
  {
    title,
    image,
    slug,
    id,
    onDelete,
    onDeleteLoading,
    onUpdate,
    children,
    height = 'h-full',
    width = 'w-full',
  }: CalendarProps) {
  const [isSharing, setIsSharing] = useState<boolean>(false)
  const [sharedLink, setSharedLink] = useState<string>('')
  const [shareLoading, setShareLoading] = useState<boolean>(false)
  const { token } = useAuth()
  const [isCopied, setIsCopied] = useState<boolean>(false)

  async function handleShare(id: string) {
    console.log(id)
    setShareLoading(true)
    setIsSharing(true)
    try {
      const response = await fetch(`http://localhost:9001/api/share-calendar/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error)
      }

      const data = await response.json()
      setSharedLink(data.url)
    } catch (error: any) {
      console.error(error.message)
    } finally {
      setShareLoading(false)
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(sharedLink)
    setIsCopied(true)
    setTimeout(()=> setIsCopied(false), 1000)
  };

  return (
    <>
      <Modal open={isSharing} setOpen={setIsSharing} width='w-full lg:w-1/2' height='h-96'>
        <div>
          <button onClick={handleCopy} className="btn-copy text-primary-dark">Copier le lien</button>
          {isCopied && <span className="text-primary-dark">Copié !</span>}
        </div>
        <input className="text-primary-dark w-full" type="text" readOnly value={sharedLink}/>
      </Modal>
      <div className={`div-calendar-grid text-secondary-argent text-3xl text-center ${width} ${height}`}>
        <div className="calendar-option flex items-center">
          <span className="name-calendar-present">{title}</span>
          {btnContainer(slug, id, onDelete, onDeleteLoading, onUpdate, handleShare, shareLoading )}
        </div>
        <div
          className="container mx-auto w-full flex flex-wrap justify-center items-center bg-no-repeat bg-cover gap-6 p-4 lg:px-4 xl:px-4"
          style={{ backgroundImage: `url(http://localhost:9001/public?path=${image})` }}
        >
          {children}
        </div>
      </div>
    </>
  )
}
