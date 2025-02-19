// Permet de partager les données de manières globales partout dans l'application.

import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

interface User {
    id: string //uuid donc string
    name: string
    email: string
    role: string
    profile_data: {
        created_at: string
        updated_at: string
        id: string
        nb_calendars: number
        nb_shared_calendars: number
        user_id: string
    }
}

interface AuthContextType {
    user: User | null
    error: string | null
    token: string | null //token d'identification
    authStatus: "pending" | "authenticated" | "unauthenticated"
    setToken: (token: string) => void
    login: (email: string, password: string) => void
    register: (name: string, email: string, password: string) => void
    logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [authStatus, setAuthStatus] = useState<"pending" | "authenticated" | "unauthenticated">("pending")
    const navigate = useNavigate()

    // Déclanche un nouveau rendu à chaque fois que le composant est monté ( = premier rendu, il va chercher le token dans le local storage)
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setToken(token)
            void checkAuth(token)
        }
        setAuthStatus(token ? "authenticated" : "unauthenticated")
    }, [])

    async function login(email: string, password: string) {
        setAuthStatus("pending")
        try {
            const response = await fetch('http://localhost:9001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })

            const data = await response.json()

            if (response.status === 403 || response.status === 401) {
                setAuthStatus("unauthenticated")
                setError(data.error)
                return
            }

            if (response.status === 422) {
                setAuthStatus("unauthenticated")
                setError(data.error)
                return
            }

            if (response.ok) {
                setToken(data.token)
                setAuthStatus("authenticated")
                setUser(data.user)

                localStorage.setItem('token', data.token)
                navigate('/dashboard')
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    async function register(name: string, email: string, password: string) {
        try {
            const response = await fetch('http://localhost:9001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })

            if (response.ok) {
                navigate('/login')
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    async function logout() {
        try {
            const response = await fetch('http://localhost:9001/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
            })

            if (response.ok) {
                setToken(null)
                setAuthStatus("unauthenticated")
                setUser(null)

                localStorage.removeItem('token')
                return navigate('/')
            }

            setToken(null)
            setAuthStatus("unauthenticated")
            setUser(null)

            localStorage.removeItem('token')
            return navigate('/login')
        }
        catch (error) {
            console.error(error)
        }

    }
    async function checkAuth(token: string) {
        try {
            const response = await fetch('http://localhost:9001/api/user', {
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

            if (response.ok) {
                setAuthStatus("authenticated")
                setUser(data)
                return
            }

            setAuthStatus("unauthenticated")
            setUser(null)
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <AuthContext.Provider value={{ user, error, token, authStatus, setToken, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}