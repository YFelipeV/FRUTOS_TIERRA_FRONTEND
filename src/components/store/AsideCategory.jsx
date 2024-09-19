import React from 'react'

export default function AsideCategory(props) {

    const{
        dataCategorias, 
        selectedCategory,
        setSelectedCategory
    }=props
    return (
        <aside className="w-64 pr-8">
            <h2 className="text-xl font-semibold mb-4">Cultivos</h2>

            {/* Scroll vertical para las categorías */}
            <div className="max-h-[518px] scroll-adside overflow-y-scroll">
                <ul className="space-y-2">
                    {dataCategorias && dataCategorias.length > 0 && dataCategorias.map(category => (
                        <li key={category.id} className="flex items-center">
                            <input
                                type="checkbox"
                                id={category.id}
                                checked={selectedCategory === category.nombre}
                                onChange={() => setSelectedCategory(category.nombre)}
                                className="mr-2 w-[18px] h-[18px]"
                            />
                            <label htmlFor={category.nombre} className="text-gray-700 hover:text-green-500 cursor-pointer">
                                {category.nombre}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}
