import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../store/AuthContext"

export default function PrivateRoutes() {
    const { authStatus } = useAuth()
    console.log(authStatus)
    if (authStatus === "unauthenticated") {
        return <Navigate to="/login" />
    }

    if (authStatus === "pending") {
        return <div>Chargement...</div>
    }

    return (
        <Outlet />
    )
}