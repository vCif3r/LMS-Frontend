import { useAuth } from "@/core/contexts/AuthProvider"
import { NavLink } from "react-router-dom"

function Navbar() {
    const { isAuthenticated } = useAuth()
    return (
        <div className="w-10/12 mx-auto py-4 flex justify-between items-center">
            <div className="flex">
                <h1 className="text-2xl font-bold text-gray-700">InnovaLearn</h1>
            </div>

            <div className="flex gap-8">
                <NavLink to={'/'}>
                    <button className="text-gray-600 text-lg">Inicio</button>
                </NavLink>
                <button className="text-gray-600 text-lg">Nosotros</button>
                <button className="text-gray-600 text-lg">Noticias y Eventos</button>
                <button className="text-gray-600 text-lg">Blog</button>
                <button className="text-gray-600 text-lg">Contacto</button>
            </div>

            <NavLink to={'/login'}>
                <button className="bg-red-500 text-white hover:bg-red-700 px-5 py-2.5 rounded-3xl font-semibold">
                    {isAuthenticated ? 'Dashboard' : 'Iniciar Sesión'}
                </button>
            </NavLink>
        </div>
    )
}

export default Navbar