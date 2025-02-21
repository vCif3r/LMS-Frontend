import { useAuth } from "@/core/contexts/AuthProvider"
import { NavLink } from "react-router-dom"

function Navbar() {
    const { isAuthenticated } = useAuth()
    return (
        <div className="w-full shadow-sm shadow-slate-200 py-2.5 px-6 flex justify-between items-center">
            <div className="flex">
                <h1 className="text-xl font-bold ml-2">InnovaLearn</h1>
            </div>
            <NavLink to={'/login'}>
                <button className="px-3 py-1.5 rounded-lg bg-red-500 text-white">
                    {isAuthenticated ? 'Dashboard' : 'Ingresar'}
                </button>
            </NavLink>
        </div>
    )
}

export default Navbar