import Dropzone from '../components/Dropzone'
import { useAuth } from '../store/AuthContext'
import { useEffect, useRef, useState } from 'react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import EditingThemeModal from '../components/EditingThemeModal.tsx'

export interface Theme {
    id: string
    theme_name: string
    image: string
    slug: string
    user_id: string
}

export default function CreateCalendar() {
    const {user, authStatus, token} = useAuth()
    const [themes, setThemes] = useState<Theme[]>([])
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const [editingTheme, setEditingTheme] = useState<Theme | null>(null)

    const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

    async function fetchThemes() {
        try {
            const response = await fetch('http://localhost:9001/api/themes', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': `Bearer ${ token }`,
                },
                credentials: 'include',
            })

            const data = await response.json()
            setThemes(data.themes)
        } catch (error: any) {
            console.error(error.message)
        }
    }

    function toggleDropdown(themeId: string) {
        const currentDropdown = dropdownRefs.current[themeId]
        if (currentDropdown) {
            currentDropdown.classList.toggle('hidden')
        }
    }

    function handleClickOutside(event: MouseEvent) {
        Object.keys(dropdownRefs.current).forEach((themeId) => {
            const dropdown = dropdownRefs.current[themeId]
            if (dropdown && !dropdown.contains(event.target as Node)) {
                dropdown.classList.add('hidden')
            }
        })
    }

    async function handleDeleteTheme(themeId: string) {
        try {
            const response = await fetch(`http://localhost:9001/api/themes/${ themeId }`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': `Bearer ${ token }`,
                },
                credentials: 'include',
            })

            if (response.ok) {
                await fetchThemes()
            }
        } catch (error: any) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside)
        void fetchThemes()

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    return (
      <>
          <EditingThemeModal
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            editingTheme={editingTheme}
            fetchThemes={fetchThemes}
          />
          <div className="w-full mb-4">
              <h2 className="under-title text-secondary-dore text-3xl bg-primary-dark py-4 text-center rounded-md w-full">
                  Créer mon calendrier
              </h2>
          </div>
          { authStatus === 'authenticated' && user && user.role === 'admin' && (
            <div
              className="div-grids grid h-full wrap gap-4 sm:grid-cols-1 md:grid-cols-2 justify-center bg-primary-trans-dark w-full p-8 rounded-md">
                { themes.map((theme) => (
                  <>
                      <div key={ theme.id } className="relative flex flex-col items-center justify-center h-full w-full">
                          <button
                            onClick={ (e) => {
                                e.stopPropagation()
                                toggleDropdown(theme.id)
                            } }
                            className="absolute top-0 right-0 p-2 m-2 rounded-full bg-primary-dark text-secondary-argent"
                          >
                              <HiOutlineDotsHorizontal/>
                          </button>
                          <div
                            ref={ (el) => (dropdownRefs.current[theme.id] = el) }
                            className="absolute top-10 right-2 mt-1 w-40 bg-primary-dark rounded-md shadow-lg hidden"
                          >
                              <button
                                className="flex justify-start w-full text-secondary-dore text-xl p-2 hover:bg-white/5 border-b-2"
                                onClick={ () => {
                                    setIsEditing(true)
                                    setEditingTheme(theme)
                                } }
                              >
                                  Editer
                              </button>
                              <button
                                className="flex justify-start w-full text-secondary-dore text-lg p-2 hover:bg-white/5"
                                onClick={ () => handleDeleteTheme(theme.slug) }
                              >
                                  Supprimer
                              </button>
                          </div>
                          <img
                            className="object-cover w-full h-[300px]"
                            src={ `http://localhost:9001/public?path=${ theme.image }&width=900` }
                            alt={ theme.theme_name }
                          />
                      </div>
                  </>
                )) }
                <Dropzone withModal onFetch={fetchThemes}/>
            </div>
          ) }
      </>
    )
}
