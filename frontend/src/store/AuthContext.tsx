import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

interface User {
    id: string //uuid donc string
    name: string
    email: string
    role: string
}

interface AuthContextType {
    user: User | null
    token: string | null //token d'identification
    authStatus: "pending" | "authenticated" | "unauthenticated"
    setToken: (token: string) => void
    login: (email: string, password: string) => void
    logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [authStatus, setAuthStatus] = useState<"pending" | "authenticated" | "unauthenticated">("pending")
    const navigate = useNavigate()

    // Déclanche un nouveau rendu à chaque fois que le composant est monté ( à chaque fois que le composant est monté = premier rendu, il va chercher le token dans le local storage)
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setToken(token)
        }
        setAuthStatus(token ? "authenticated" : "unauthenticated")
    }, [])

    async function login(email: string, password: string) {
        setAuthStatus("pending")
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

        if (response.ok) {
            setToken(data.token)
            setAuthStatus("authenticated")
            setUser(data.user)

            navigate('/dashboard')
        } else {
            console.error(data)
        }
    }

    function logout() {
        setToken(null)
        setAuthStatus("unauthenticated")
        setUser(null)

        navigate('/')
    }

    return (
        <AuthContext.Provider value={{ user, token, authStatus, setToken, login, logout }}>
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