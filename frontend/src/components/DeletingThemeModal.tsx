import Modal from './Modal.tsx'
import { Theme } from '../pages/SelectedTheme.tsx'
import { useAuth } from '../store/AuthContext.tsx'
import { useState } from 'react'

interface DeletingThemeModalProps {
  isDeleting: boolean
  setIsDeleting: (isDeleting: boolean) => void
  deletingTheme: Theme | null
  fetchThemes: () => void
}

export default function DeletingThemeModal(
  {
    isDeleting,
    setIsDeleting,
    deletingTheme,
    fetchThemes,
  }: DeletingThemeModalProps) {
  const { token } = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function deleteTheme() {
    setIsLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/themes/${deletingTheme?.slug}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error)
      }
    } catch (error: any) {
      console.log(error.message)
    } finally {
      fetchThemes()
      setIsLoading(false)
      setIsDeleting(false)
    }
  }

  return (
    <Modal open={isDeleting} setOpen={setIsDeleting} width='w-96' height='h-96'>
      <div className="flex flex-col">
        <h2 className="text-center text-xl font-semibold">Supprimer le thème</h2>
        <p className="text-center text-sm text-gray-500">Êtes-vous certain de vouloir supprimer le thème?</p>
        <div className="flex justify-center mt-4">
          <button
            className={`${isLoading ? 'bg-gray-500' : 'bg-red-500'} text-white px-4 py-2 rounded-md`}
            onClick={deleteTheme}
            disabled={isLoading}
          >
            {isLoading ? 'En cours de suppression...' : 'Supprimer'}
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md ml-2"
            onClick={() => setIsDeleting(false)}
          >
            Annuler
          </button>
        </div>
      </div>
    </Modal>
  )
}