import React from 'react'
import { Plus, Search } from "lucide-react"

export default function SearchDashboard(props) {

    const {
        setSearchTerm,
        searchTerm,
        setrowselect,
        setModalOpen,
        title
    }=props
    return (
        <div className="flex items-center space-x-2 mb-4">

            <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder={`Buscar cultivos ...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
                />
            </div>
            <button onClick={() => {
                setrowselect(null)
                setModalOpen(true)
            }} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center">
                <Plus className="h-4 w-4 mr-2" /> Agregar {title}
            </button>
        </div>
    )
}
