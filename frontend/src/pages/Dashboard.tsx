import { useEffect, useState } from 'react'
import Calendar from '../components/Calendar.tsx'
import { useAuth } from '../store/AuthContext.tsx'
import ItemCase, { ItemCaseInterface } from '../components/ItemCase.tsx'

interface Calendar {
  id: number,
  title: string,
  image: string,
  itemsCases: ItemCaseInterface[],
  slug: string,
  isBlocked: boolean,
}

export default function Dashboard() {
  const [calendars, setCalendars] = useState<Calendar[]>([])
  const { token, checkAuth } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)

  async function handleDelete(slug: string) {
    setDeleteLoading(true)
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
      checkAuth(token as string)
      setDeleteLoading(false)
      void fetchCalendars()
    }
  }

  async function fetchCalendars() {
    setLoading(true)
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
    setLoading(false)
  }

  {/* Détermine s'il y a des changements dans mon application en fonction d'une dépendance */ }
  useEffect(() => {
    if (token) {
      void fetchCalendars()
    }
  }, [token])

  if (loading) {
    return <p className="text-center text-secondary-dore text-2xl bg-primary py-6 px-4 lg:px-32 w-full rounded-md">Chargement...</p>
  }

  return (
    <>
      <div className='w-full mb-4'>
        <h2 className="under-title text-secondary-dore text-3xl bg-primary-dark py-4 text-center rounded-md ">
          Tous mes calendriers
        </h2>
      </div>
      {!loading && !calendars.length && <p className="text-center text-secondary-dore text-2xl bg-primary-trans-dark py-6 px-4 lg:px-32 w-full rounded-md">Aucun calendrier trouvé</p>}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 place-items-center gap-2 xl:gap-8 bg-primary-trans-dark py-6 px-4 lg:px-32 w-full rounded-md">
        {calendars.map((calendar) => {
            if (!calendar.isBlocked) {
              return <Calendar
                key={calendar.id}
                title={calendar.title}
                image={calendar.image}
                itemsCases={calendar.itemsCases}
                slug={calendar.slug}
                onDelete={() => handleDelete(calendar.slug)}
                onDeleteLoading={deleteLoading}
                width='w-full'
              >
                {calendar.itemsCases.map((itemCase) =>
                  <ItemCase
                    key={itemCase.id}
                    id={itemCase.id}
                    number={itemCase.number}
                    gift={itemCase.gift}
                    is_opened={itemCase.is_opened}
                    opened_at={itemCase.opened_at}
                  />
                )}
              </Calendar>
            }
          },
        )}
      </div>
    </>
  )
}