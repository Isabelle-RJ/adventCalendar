import { Link } from 'react-router'
import { MdOutlineEditCalendar } from 'react-icons/md'
import { RiDeleteBin6Fill } from 'react-icons/ri'

export interface CalendarProps {
  title: string,
  image: string,
  slug: string,
  onDelete: (slug:string)=> void,
}

export default function Calendar({title, image, slug, onDelete} : CalendarProps) {
  return (
      <div className="div-calendar-grid m-8 text-secondary-argent text-3xl text-center">
        <div className="calendar-option">
          <span className="name-calendar-present">{title}</span>
          <div className="div-options flex flex-row">
            <Link to={`/calendar/update/${slug}`}> {/* string templating : slug = calendrier-de-prenom */}
              <MdOutlineEditCalendar className="icons-calendar text-secondary-argent hover:text-primary-blue"/>
            </Link>
            <button onClick={()=> onDelete(slug)}>
              <RiDeleteBin6Fill className="icons-calendar text-secondary-argent hover:text-primary-blue"/>
            </button>
          </div>
        </div>
        <div> {/* TODO : Remplacer l'image par le lien vers l'image de la DB calendar.image */}
          <img src={image}
               alt="Le nom de votre calendrier"/>
        </div>
      </div>
  )
}