import { Link } from 'react-router'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { ReactNode, useState } from 'react'
import { BsArrowsFullscreen, BsFillShareFill } from 'react-icons/bs'
import Modal from './Modal.tsx'
import { useAuth } from '../store/AuthContext.tsx'
import { IoCopy } from 'react-icons/io5'
import { FcOk } from 'react-icons/fc'


export interface CalendarProps {
  title?: string,
  image: string,
  slug?: string,
  id?: string,
  onDelete?: (slug: string) => void,
  onDeleteLoading?: boolean,
  onShare?: (id: string) => void,
  onShareLoading?: boolean,
  children?: ReactNode
  width?: string,
  height?: string,
  withOptions?: boolean,
}

function btnContainer(
  slug: string | undefined,
  id: string | undefined,
  onDelete: ((slug: string) => void) | undefined,
  onDeleteLoading: boolean | undefined,
  onShare: ((id: string) => void) | undefined,
  onShareLoading: boolean | undefined,
) {
  return (
    <div className="div-options flex flex-row">
      <Link to={`/calendar/${id}`}>
        <BsArrowsFullscreen className="icons-calendar text-secondary-argent hover:text-primary-blue"/>
      </Link>
      <button onClick={() => onDelete ? onDelete(slug as string) : null}
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

export default function Calendar(
  {
    title,
    image,
    slug,
    id,
    onDelete,
    onDeleteLoading,
    children,
    height = 'h-full',
    width = 'w-full',
    withOptions = false,
  }: CalendarProps) {
  const [isSharing, setIsSharing] = useState<boolean>(false)
  const [sharedLink, setSharedLink] = useState<string>('')
  const [shareLoading, setShareLoading] = useState<boolean>(false)
  const { token, checkAuth } = useAuth()
  const [isCopied, setIsCopied] = useState<boolean>(false)

  async function handleShare(id: string) {
    setShareLoading(true)
    setIsSharing(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/share-calendar/${id}`, {
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
      const url = `${import.meta.env.VITE_DOMAIN}/calendar/${data.id}?signature=${data.signature}`
      setSharedLink(url)
      checkAuth(token as string)
    } catch (error: any) {
      console.error(error.message)
    } finally {
      setShareLoading(false)
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(sharedLink)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 1000)
  }

  return (
    <>
      <Modal open={isSharing}
             setOpen={setIsSharing}
             width="w-full lg:w-1/2"
             height="h-96">
        <input className="text-primary-dark w-full"
               type="text"
               readOnly
               value={sharedLink}/>
        <div>
          <button onClick={handleCopy}
                  className="btn-copy text-primary-dark"><IoCopy/></button>
          {isCopied && <span className="text-primary-dark font-bold"><FcOk/></span>}
        </div>
      </Modal>

      <div className={`div-calendar-grid text-secondary-argent text-3xl text-center ${width} ${height}`}>
        <div className="calendar-option flex items-center">
          <span className="name-calendar-present">{title}</span>
          {withOptions && btnContainer(
            slug,
            id,
            onDelete,
            onDeleteLoading,
            handleShare,
            shareLoading)
          }
        </div>
        <div
          className="container xl:h-[50vh] mx-auto w-full flex flex-wrap justify-center items-center bg-no-repeat bg-cover gap-6 p-4 lg:px-4 xl:px-4"
          style={{ backgroundImage: `url(${import.meta.env.VITE_IMG_URL}/public?path=${image})` }}
        >
          {children}
        </div>
      </div>
    </>
  )
}
