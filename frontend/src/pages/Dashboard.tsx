import { useEffect, useState } from 'react'
import Calendar from '../components/Calendar.tsx'
import { useAuth } from '../store/AuthContext.tsx'

interface Calendar {
  id: number,
  title: string,
  image: string,
  itemsCases: string[],
  slug: string,
  isBlocked: boolean,
}

export default function Dashboard() {
  const [calendars, setCalendars] = useState<Calendar[]>([])
  const { token } = useAuth()
  console.log(token)

  async function handleDelete(slug: string) {
    const response = await fetch(`http://localhost:9001/api/calendars/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify({
        slug,
      }),
    })

    if (response.ok) {
      void fetchCalendars()
    }
  }

  async function fetchCalendars() {
    const response = await fetch('http://localhost:9001/api/calendars', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    }
    )
    const data = await response.json()
    setCalendars(data.calendars.map((calendar: any) => ({
      id: calendar.id,
      title: calendar.title,
      image: calendar.theme.image,
      itemsCases: calendar.items_cases,
      slug: calendar.slug,
      isBlocked: calendar.user.is_blocked,
    })))
  }

  {/* Détermine s'il y a des changements dans mon application en fonction d'une dépendance */ }
  useEffect(() => {
    if (token) {
      void fetchCalendars()
    }
  }, [token])

  return (
    <>
      <div className='w-full mb-4'>
        <h2 className="under-title text-secondary-dore text-3xl bg-primary-dark py-4 text-center rounded-md ">
          Tous mes calendriers
        </h2>
      </div>
      {!calendars.length && <p className="text-center text-secondary-dore text-2xl">Aucun calendrier trouvé</p>}
      <div className="div-grids grid wrap gap-4 sm:grid-cols-1 md:grid-cols-2 bg-primary-trans-dark w-full rounded-md">
        {calendars.map((calendar) => {
          if (!calendar.isBlocked) {
            return <Calendar
              key={calendar.id}
              title={calendar.title}
              image={calendar.image}
              itemsCases={calendar.itemsCases}
              slug={calendar.slug}
              onDelete={() => handleDelete(calendar.slug)}
            />
          }
        },
        )}
      </div>
    </>
  )
}