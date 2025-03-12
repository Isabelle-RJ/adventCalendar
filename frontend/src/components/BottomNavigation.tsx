import { Link } from 'react-router'
import { PiCalendarDotsThin, PiCalendarPlusThin, PiIdentificationCardThin } from 'react-icons/pi'

export default function BottomNavigation() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-primary-dark">
      <div className="flex h-full max-w-lg justify-around mx-auto font-medium">
        <Link
          to="/profile"
          className="text-secondary-dore"
        >
          <PiIdentificationCardThin size={'4rem'}/>
        </Link>
        <Link
          to="/dashboard"
          className="text-secondary-dore"
        >
          <PiCalendarDotsThin size={'4rem'}/>
        </Link>
        <Link
          to="/create-calendar"
          className="text-secondary-dore"
        >
          <PiCalendarPlusThin size={'4rem'}/>
        </Link>
      </div>
    </div>
  )
}