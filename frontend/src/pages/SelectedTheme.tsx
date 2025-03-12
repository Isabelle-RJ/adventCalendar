import Dropzone from '../components/Dropzone'
import { useAuth } from '../store/AuthContext'
import { useEffect, useRef, useState } from 'react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import EditingThemeModal from '../components/EditingThemeModal.tsx'
import DeletingThemeModal from '../components/DeletingThemeModal.tsx'
import { useNavigate } from 'react-router-dom'
import { FaArrowUp } from 'react-icons/fa'

export interface Theme {
    id: string
    theme_name: string
    image: string
    slug: string
    user_id: string
}

export default function SelectedTheme() {
    const { user, authStatus, token } = useAuth()
    const [themes, setThemes] = useState<Theme[]>([])
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const [editingTheme, setEditingTheme] = useState<Theme | null>(null)
    const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const navigate = useNavigate()
    const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
    const [loading, setLoading] = useState<boolean>(false)

    async function fetchThemes() {
        setLoading(true)
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/themes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
            })

            const data = await response.json()
            setThemes(data.themes)
            setLoading(false)
        } catch (error: any) {
            console.error(error.message)
        }
    }

    async function uploadToDatabase(themeName: string, image: string) {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/themes/create`, {
                method: 'POST',
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

                throw new Error(data.error ?? data.message)
            }
        } catch (error: any) {
            throw new Error(error.message)
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

    function handleThemeSelect(path: string) {
        if (selectedTheme === path) {
            return setSelectedTheme(null)
        }

        return setSelectedTheme(path)
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside)
        void fetchThemes()

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                return setIsVisible(true)
            }

            return setIsVisible(false)
        }

        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    if (loading) {
        return <p className="text-center text-secondary-dore text-2xl bg-primary py-6 px-4 lg:px-32 w-full rounded-md">Chargement...</p>
    }

    return (
      <>
          <EditingThemeModal
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            editingTheme={editingTheme}
            fetchThemes={fetchThemes}
          />
          <DeletingThemeModal
            isDeleting={isDeleting}
            setIsDeleting={setIsDeleting}
            deletingTheme={editingTheme}
            fetchThemes={fetchThemes}
          />
          {
            isVisible &&
            (
              <button
                className="fixed bottom-20 lg:bottom-4 border-2 border-white right-4 bg-secondary-dore text-primary-dark text-3xl p-4 rounded-md z-10"
                onClick={scrollToTop}
              >
                  {selectedTheme ? 'Créer mon calendrier' : <FaArrowUp />}
              </button>
            )
          }
          <div className="w-full mb-4">
              <h2 className="under-title text-secondary-dore text-3xl bg-primary-dark py-4 text-center rounded-md w-full">
                  Créer mon calendrier
              </h2>
          </div>
          {authStatus === 'authenticated' && user && (
            <div className="flex flex-col items-center justify-center w-full bg-primary-trans-dark p-8 rounded-md">
                <div className="flex flex-col items-center justify-center w-full">
                    <h2 className="bg-primary-x-dark p-4 mb-6">Choisir un fond</h2>
                    <div className="flex flex-row justify-center gap-4 mb-8 w-full">
                        <button
                          className="bg-secondary-dore text-primary-dark p-2 rounded-md hover:bg-primary-dark hover:border-secondary-dore hover:text-secondary-dore"
                          onClick={() => setSelectedTheme(null)}
                        >
                            Annuler
                        </button>
                        <button
                          className={`${selectedTheme ? 'bg-secondary-dore hover:bg-primary-dark hover:border-secondary-dore hover:text-secondary-dore' : 'bg-gray-400 cursor-not-allowed'} text-primary-dark p-2 rounded-md `}
                          disabled={!selectedTheme}
                          onClick={() => navigate(`/create-calendar?theme=${selectedTheme}`)}
                        >
                            Créer avec ce thème
                        </button>
                    </div>
                </div>
                <div
                  className="div-grids grid h-full wrap gap-4 sm:grid-cols-1 md:grid-cols-2 justify-center w-full">
                    {themes.map((theme) => (
                      <div
                        key={theme.id}
                        className="relative flex flex-col items-center justify-center h-full w-full"
                        onClick={() => handleThemeSelect(theme.image)}
                      >
                          <button
                            onClick={(e) => {
                                e.stopPropagation()
                                toggleDropdown(theme.id)
                            }}
                            className="absolute top-0 right-0 p-2 m-2 rounded-full bg-primary-dark text-secondary-argent"
                          >
                              <HiOutlineDotsHorizontal/>
                          </button>
                          <div
                            ref={(el) => (dropdownRefs.current[theme.id] = el)}
                            className="absolute top-10 right-2 mt-1 w-40 bg-primary-dark rounded-md shadow-lg hidden"
                          >
                              <button
                                className="flex justify-start w-full text-secondary-dore text-xl p-2 hover:bg-white/5 border-b-2"
                                onClick={() => {
                                    setIsEditing(true)
                                    setEditingTheme(theme)
                                }}
                              >
                                  Editer
                              </button>
                              <button
                                className={` flex justify-start w-full text-secondary-dore text-lg p-2 hover:bg-white/5`}
                                onClick={() => {
                                    setIsDeleting(true)
                                    setEditingTheme(theme)
                                }}
                              >
                                  Supprimer
                              </button>
                          </div>
                          <img
                            className={`
                  ${theme.image === selectedTheme
                    ? 'border-4 border-secondary-dore'
                    : 'border-0'} 
                    object-cover w-full h-[300px] cursor-pointer`
                            }
                            src={`http://localhost:9001/public?path=${theme.image}&width=900`}
                            alt={theme.theme_name}
                          />
                      </div>
                    ))}
                    <Dropzone withModal onFetch={fetchThemes} onUpload={uploadToDatabase}/>
                </div>
            </div>
          )}
      </>
    )
}
