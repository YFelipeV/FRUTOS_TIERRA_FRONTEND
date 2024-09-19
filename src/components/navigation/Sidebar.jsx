import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Menu, Home,  User, Leaf,ArrowRightToLine,Images,UsersRound } from "lucide-react"
import { cleanVarSsn, reqtsApiForm } from '../../config/utils';

export default function Sidebar({ activeTab, setActiveTab,isExpanded,toggleSidebar}) {
    const navigate = useNavigate();
    const [data, setdata] = useState([])

    const handleNavigation = (tab, path) => {
        setActiveTab(tab);
        navigate(`/dashboard${path}`);
    };
    useEffect(() => {
        const idUsuario=localStorage.getItem('id_usuario')
        reqtsApiForm(`v1/menu/${idUsuario}`, "GET", {},true)
            .then((res) => {
                if(res.status){
                  setdata(res.data)
                }
            })

    }, [])

 
 
    
    return (
        <aside className={`bg-white text-gray-800 fixed top-0 left-0 h-full p-4 transition-all duration-300 flex flex-col justify-between
         ${isExpanded ? 'w-64' : 'w-20'}`}>
            <div>
                <div className="flex items-center justify-between mb-6">
                    {isExpanded && <h1 className="text-2xl font-bold text-green-600">Frutos de mi Tierra</h1>}
                    <button
                        onClick={() => toggleSidebar()}
                        className="p-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
                <nav className="space-y-2">
                    {data && data.length > 0 &&  data.map(({ nombre, url }) => (
                        <button
                            key={nombre}
                            onClick={() => handleNavigation(nombre, `${url}`)}
                            className={`w-full flex items-center p-2 rounded-md transition-colors duration-200
                    ${!isExpanded && 'justify-center'}
                    ${activeTab === nombre ? 'bg-green-100 text-green-700' : 'hover:bg-gray-200'}`}
                        >
                            {nombre === 'Cultivos' && <Leaf className={`h-5 w-5 ${isExpanded && 'mr-2'}`} />}
                            {nombre === 'Fincas' && <Home className={`h-5 w-5 ${isExpanded && 'mr-2'}`} />}
                            {nombre === 'Perfil' && <User className={`h-5 w-5 ${isExpanded && 'mr-2'}`} />}
                            {nombre === 'Carrusel' && <Images className={`h-5 w-5 ${isExpanded && 'mr-2'}`} />}
                            {nombre === 'Usuarios' && <UsersRound className={`h-5 w-5 ${isExpanded && 'mr-2'}`} />}
                            {isExpanded && nombre.charAt(0).toUpperCase() + nombre.slice(1)}
                        </button>
                    ))}
                </nav>
            </div>
            <div>
                <button
                    onClick={() => {
                        cleanVarSsn(navigate)
                        }}
                    className={`w-full flex items-center p-2 rounded-md transition-colors duration-200
                    ${!isExpanded && 'justify-center'}
                    ${activeTab === 'Cerrar Sesión' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-200'}`}
                >
                    <ArrowRightToLine className={`h-5 w-5 ${isExpanded && 'mr-2'}`} />
                    {isExpanded && 'Cerrar Sesión'}
                </button>
            </div>
        </aside>
    )
}
