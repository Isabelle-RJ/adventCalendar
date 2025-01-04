import { useEffect, useState } from 'react'
import Calendar from '../components/Calendar.tsx'

interface Calendar {
  id: number,
  title: string,
  image: string,
  slug: string,
  isBlocked: boolean,
}

export default function Dashboard() {
  const [calendars, setCalendars] = useState<Calendar[]>([])

  async function handleDelete(slug: string) {
    const response = await fetch(`http://localhost:9001/api/calendars/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        slug,
      }),
    })
    const data = await response.json()
    console.log(data)
    void fetchCalendars()
  } {/* TODO : supprimer les console.log */}

  async function fetchCalendars() {
    const response = await fetch('http://localhost:9001/api/calendars')
    const data = await response.json()
    setCalendars(data.calendars.map((calendar: any) => ({
      id: calendar.id,
      title: calendar.title,
      image: calendar.theme.image,
      slug: calendar.slug,
      isBlocked: calendar.user.is_blocked,
    })))
  }

  {/* Détermine s'il y a des changements dans mon application en fonction d'une dépendance */}
  useEffect(() => {
    void fetchCalendars()
  }, [])

  return (
    <>
      <div>
        <h2 className="under-title text-secondary-dore text-3xl bg-primary-dark m-8 py-4 text-center rounded-md ">
          Tous mes calendriers
        </h2>
      </div>
      <div className="div-grids grid wrap gap-4 sm:grid-cols-1 md:grid-cols-2 bg-primary-trans-dark m-8">
        {calendars.map((calendar) => {
            if (!calendar.isBlocked) {
              return <Calendar
                key={calendar.id}
                title={calendar.title}
                image={calendar.image}
                slug={calendar.slug}
                onDelete={() => handleDelete(calendar.slug)}/>
            }
          },
        )}
      </div>
    </>
  )
}