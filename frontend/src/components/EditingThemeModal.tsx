import Modal from "./Modal"
import Dropzone from './Dropzone.tsx'
import { FormEvent, useState } from 'react'
import { useAuth } from '../store/AuthContext.tsx'
import { Theme } from '../pages/SelectedTheme.tsx'


interface EditingThemeModalProps {
  isEditing: boolean
  setIsEditing: (isEditing: boolean) => void
  editingTheme: Theme | null
  fetchThemes: () => void
}

export default function EditingThemeModal(
  {
    isEditing,
    setIsEditing,
    editingTheme,
    fetchThemes,
  }: EditingThemeModalProps) {
  const { token } = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState('')

  async function updateTheme(themeName: string | undefined, image: string | undefined) {
    setIsLoading(true)
    try {
      const response = await fetch(`http://localhost:9001/api/themes/${editingTheme?.slug}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({
          theme_name: themeName,
          image: image,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error)
        return
      }

      setIsLoading(false)

      return true
    } catch (error: any) {
      setError(error.message)
    }
  }
  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const themeName = formData.get('theme_name')
    const imageData = formData.get('file') as File
    const image = imageData.name !== '' ? formData.get('file') as File : editingTheme?.image
    const updateSuccess = await updateTheme(
      themeName as string,
      typeof image === 'string' ? image : image?.name
    )

    if (updateSuccess) {
      fetchThemes()
      setIsEditing(false);
    }
  }
  return (
    <Modal
      open={isEditing}
      setOpen={setIsEditing}
      width="h-screen md:h-4/5 w-screen md:w-4/5"
      backgroudColor="bg-primary-x-dark"
    >
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h2 className="text-2xl text-primary-blue mb-4">Editer le thème</h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            className={`w-full p-2 border-2 bg-primary-x-dark border-secondary-ivory rounded-md ${error.theme_name ? 'border-red-400 mb-1' : 'border-primary-blue mb-4'}`}
            type="text"
            placeholder="Nom du thème"
            defaultValue={editingTheme?.theme_name}
            onChange={(event) => {
              setError('')
              editingTheme!.theme_name = event.target.value
            }}
            name={'theme_name'}
          />
          {error && error.theme_name && <p className="text-red-400 mb-2">{error.theme_name}</p>}
          <Dropzone isMultiple={false} withModal={false} />
          <button
            className={`mt-4 ${isLoading || error ? 'bg-gray-200 cursor-not-allowed text-gray-300' : 'bg-secondary-ivory text-black'}`}
            type="submit"
            disabled={isLoading || !!error}
          >
            {isLoading ? 'Loading...' : 'Editer'}
          </button>
        </form>
      </div>
    </Modal>
  )
}