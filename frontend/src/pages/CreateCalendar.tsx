import { useSearchParams } from 'react-router'
import Calendar from '../components/Calendar.tsx'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../store/AuthContext.tsx'
import { ItemCaseInterface } from '../components/ItemCase.tsx'
import EditingItemCase from '../components/EditingItemCase.tsx'

export default function CreateCalendar() {
  const { token } = useAuth()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [itemCases, setItemCases] = useState<ItemCaseInterface[]>([])

  const numberOfCases = 25
  const defaultSentences = [
    "Tu es une personne merveilleuse.",
    "Tu es capable de grandes choses.",
    "Tu as une force intérieure incroyable.",
    "Tu es une source d’inspiration pour les autres.",
    "Ton sourire illumine la journée de ceux qui t’entourent.",
    "Tu as un grand cœur rempli de bienveillance.",
    "Tu es plus fort(e) que tu ne le penses.",
    "Tu as un talent unique qui mérite d’être reconnu.",
    "Chaque jour, tu progresses et tu t’améliores.",
    "Le monde est meilleur grâce à ta présence.",
    "Tu es digne d’amour et de respect.",
    "Tu es une personne précieuse et irremplaçable.",
    "Ta gentillesse et ta générosité font la différence.",
    "Tu as tout en toi pour réussir.",
    "Tu es rempli(e) de potentiel et d’opportunités.",
    "Tu es une belle âme avec un grand cœur.",
    "Tu mérites le bonheur et l’épanouissement.",
    "Ta persévérance est admirable.",
    "Tu as un impact positif sur les gens autour de toi.",
    "Tu es un(e) battant(e) et rien ne peut t’arrêter.",
    "Tu as une lumière en toi qui brille fort.",
    "Tes rêves sont valables et tu es capable de les réaliser.",
    "Tu es une personne exceptionnelle et unique.",
    "Tu es plein(e) d’énergie positive et de bonnes ondes.",
    "Tu es exactement à ta place et tu fais du bien autour de toi.",
  ]

  const defaultCases: ItemCaseInterface[] = Array.from({ length: numberOfCases }, (_, index) => ({
    number: index + 1,
    gift: defaultSentences[Math.floor(Math.random() * defaultSentences.length)],
  }))

  async function checkPath() {
    if (!params.get('theme')) {
      return navigate('/selected-theme')
    }

    const response = await fetch(`http://localhost:9001/api/checkPath?theme=${params.get('theme')}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      credentials: 'include',
    })

    if (!response.ok) {
      return navigate('/selected-theme')
    }
  }

  function handleDescriptionChange(number: number, description: string) {
    const newCases = defaultCases.map((itemCase) => {
      if (itemCase.number === number) {
        return {
          ...itemCase,
          gift: description,
        }
      }

      return itemCase
    })

    setItemCases(newCases)
  }

  async function handleSubmit() {
    const formData = new FormData()
    formData.append('name', 'name')

    try {
      const response = await fetch('http://localhost:9001/api/calendars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: 'name',
          image: params.get('theme'),
          itemsCases: itemCases,
        }),
      })
    } catch (error: any) {
      console.error(error.message)
    } finally {

    }
  }

  useEffect(() => {
    void checkPath()
  }, [params, navigate])

  useEffect(() => {
    setItemCases(defaultCases)
  }, [params])

  return (
    <>
      <div className="w-full mb-4">
        <h2 className="under-title text-secondary-dore text-3xl bg-primary-dark py-4 text-center rounded-md w-full">
          Mon calendrier de l'avent
        </h2>
      </div>
      <div className="flex flex-col items-start justify-center w-full bg-primary-trans-dark p-6">
        <form className="flex flex-col gap-4 lg:flex-row w-full">
          <div className="flex flex-col justify-start lg:w-1/3">
            <div className="flex flex-col items-start justify-center w-full">
              <label className="mb-2" htmlFor="name">Nom</label>
              <input
                type="text"
                name="name"
                className="p-2 border-2 bg-primary-blue/40 w-full border-secondary-ivory"
                placeholder="Titre de votre calendrier"
              />
              <div
                className="flex flex-col items-center justify-center w-full py-4 px-4 bg-primary-x-dark my-4 border-2 border-secondary-ivory font-semibold text-lg">
                <p>Cliquez sur une case pour ajouter une surprise</p>
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-between gap-6 w-full">
              <button
                className="bg-secondary-dore text-2xl text-primary-dark px-4 py-2 rounded-md hover:bg-primary-x-dark hover:text-secondary-dore border border-secondary-dore hover:border-secondary-dore">
                Retour
              </button>
              <button
                className="bg-secondary-dore text-2xl text-primary-dark px-4 py-2 rounded-md hover:bg-primary-x-dark hover:text-secondary-dore border border-secondary-dore hover:border-secondary-dore">
                Enregistrer
              </button>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <Calendar image={params.get('theme') as string} itemsCases={defaultCases} >
              {itemCases.map((itemCase) => (
                <EditingItemCase key={itemCase.number} number={itemCase.number} gift={itemCase.gift} onDescriptionChange={handleDescriptionChange} />
              ))}
            </Calendar>
          </div>
          <div className="flex lg:hidden flex-col items-center justify-center w-full">
            <button
              className="bg-secondary-dore text-primary-dark p-4 rounded-md hover:bg-primary-x-dark hover:text-secondary-dore border border-secondary-dore hover:border-secondary-dore me-4">
              Retour
            </button>
            <button
              className="bg-secondary-dore text-primary-dark p-4 rounded-md hover:bg-primary-x-dark hover:text-secondary-dore border border-secondary-dore hover:border-secondary-dore">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
