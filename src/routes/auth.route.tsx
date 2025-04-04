import { useAuth } from "@/core/contexts/AuthProvider"
import { Navigate, Outlet } from "react-router-dom"

const AuthRoute = () => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Outlet />
    // si el usuario está autenticado, redirigirlo al dashboard para prohibir el login
    return <Navigate to={'/dashboard'} replace />;
}

export default AuthRoute