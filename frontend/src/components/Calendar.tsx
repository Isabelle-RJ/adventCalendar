import { Link } from 'react-router'
import { MdOutlineEditCalendar } from 'react-icons/md'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { ItemCaseInterface } from './ItemCase'
import { ReactNode } from 'react'


export interface CalendarProps {
  title?: string,
  image: string,
  itemsCases: ItemCaseInterface[],
  slug?: string,
  onDelete?: (slug: string) => void,
  onUpdate?: (slug: string) => void,
  onDeleteLoading?: boolean,
  children?: ReactNode
  width?: string,
  height?: string,
}

function btnContainer(onDelete: ((slug: string) => void) | undefined, slug: string | undefined, onUpdate: ((slug: string) => void) | undefined, onDeleteLoading: boolean | undefined) {
  if(slug) {
    return (
      <div className="div-options flex flex-row">
        <Link to={`/calendar/update/${slug}`}> {/* string templating : slug = calendrier-de-prenom */}
          <MdOutlineEditCalendar className="icons-calendar text-secondary-argent hover:text-primary-blue" />
        </Link>
        <button onClick={() => onDelete ? onDelete(slug) : null}
                disabled={onDeleteLoading}
                className={onDeleteLoading ? 'cursor-not-allowed' : 'cursor-pointer'}
        >
          <RiDeleteBin6Fill className="icons-calendar text-secondary-argent hover:text-primary-blue" />
        </button>
      </div>
    )
  }
}

export default function Calendar({ title, image, slug, onDelete, onUpdate, onDeleteLoading, children, height='h-full', width='w-full' }: CalendarProps) {

  return (
    <div className={`div-calendar-grid text-secondary-argent text-3xl text-center ${width} ${height}`}>
      <div className="calendar-option flex items-center">
        <span className="name-calendar-present">{title}</span>
        {btnContainer(onDelete, slug, onUpdate, onDeleteLoading)}
      </div>
      <div
        className="container mx-auto w-full flex flex-wrap justify-center items-center bg-no-repeat bg-cover gap-6 p-4 lg:px-4 xl:px-4"
        style={{ backgroundImage: `url(http://localhost:9001/public?path=${image})` }}
      >
        { children }
      </div>
    </div>
  )
}