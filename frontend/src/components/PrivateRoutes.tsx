import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../store/AuthContext"

export default function PrivateRoutes() {
    const { authStatus, user } = useAuth()

    if (authStatus === "unauthenticated") {
        return <Navigate to="/login" />
    }

    if (authStatus === "pending" && !user) {
        return <div className="flex justify-center items-center h-screen w-screen">Chargement...</div>
    }

    return (
        <Outlet />
    )
}