import Modal from "./Modal"
import Dropzone from './Dropzone.tsx'
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

  async function updateTheme(themeName: string | undefined, image: string | undefined) {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/themes/${editingTheme?.id}`, {
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

      setIsEditing(false)
    } catch (error: any) {
      console.error(error.message)
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
        <div className="flex flex-col">
          <Dropzone isMultiple={false} withModal={false} onUpload={updateTheme} onFetch={fetchThemes}/>
        </div>
      </div>
    </Modal>
  )
}