import { useParams, useSearchParams } from 'react-router'
import { useAuth } from '../store/AuthContext.tsx'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Calendar from '../components/Calendar.tsx'
import ItemCase, { ItemCaseInterface } from '../components/ItemCase.tsx'
import { Theme } from './SelectedTheme.tsx'

export interface CalendarInterface {
  user_id: string,
  id: string,
  title: string,
  theme: Theme,
  items_cases: ItemCaseInterface[],
  slug: string,
  isBlocked: boolean,
}

export default function PageCalendar() {
  const { token, authStatus } = useAuth()
  const { id } = useParams()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [calendar, setCalendar] = useState<CalendarInterface | null>(null)
  const [loading, setLoading] = useState(true)


  async function fetchCalendar() {
    setLoading(true)
    try {
      if (authStatus === 'authenticated') {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/calendars/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          credentials: 'include',
        })
        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error)
        }
        const data = await response.json()
        return setCalendar(data.calendar)
      }
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/show-share-calendar/${id}?signature=${params.get('signature')}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          credentials: 'include',
        })
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error)
      }
      const data = await response.json()
      return setCalendar(data.calendar)
    } catch (error: any) {
      return navigate('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (authStatus !== 'pending') {
      void fetchCalendar()
    }
  }, [id, authStatus])

  if (loading) {
    return <div>Chargement...</div>
  }


  return (
    <div className="h-full w-full p-4 flex justify-center items-center">
      <Calendar
        title={calendar?.title}
        image={calendar!.theme.image}
        slug={calendar?.slug}
        id={calendar?.id}
        height="h-1/2"
        width="w-1/2">
        {calendar?.items_cases.map((item_case) => (
          <ItemCase key={item_case.id}
                    number={item_case.number}
                    gift={item_case.gift}/>
        ))}
      </Calendar>
    </div>
  )
}