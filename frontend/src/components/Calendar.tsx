import { Link } from 'react-router'
import { MdOutlineEditCalendar } from 'react-icons/md'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import ItemCase from './ItemCase'

export interface CalendarProps {
  title: string,
  image: string,
  itemsCases: string[],
  slug: string,
  onDelete: (slug: string) => void,
}

export default function Calendar({ title, image, itemsCases, slug, onDelete }: CalendarProps) {

  return (
    <div className="div-calendar-grid m-8 text-secondary-argent text-3xl text-center">
      <div className="calendar-option">
        <span className="name-calendar-present">{title}</span>

        <div className="div-options flex flex-row">
          <Link to={`/calendar/update/${slug}`}> {/* string templating : slug = calendrier-de-prenom */}
            <MdOutlineEditCalendar className="icons-calendar text-secondary-argent hover:text-primary-blue" />
          </Link>
          <button onClick={() => onDelete(slug)}>
            <RiDeleteBin6Fill className="icons-calendar text-secondary-argent hover:text-primary-blue" />
          </button>
        </div>
      </div>
      <div
        className="container mx-auto w-full flex flex-wrap justify-center items-center gap-6 p-4  }}"
        style={{ backgroundImage: `url(http://localhost:9001/public?path=${image})` }}
      >
        {itemsCases.map((itemCase) => <ItemCase
          key={itemCase.id}
          id={itemCase.id}
          number={itemCase.number}
          gift={itemCase.gift}
          is_opened={itemCase.is_opened}
          opened_at={itemCase.opened_at}
        />)}
      </div>
    </div>
  )
}