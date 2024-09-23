import React, { useState } from 'react';

export default function AsideCategory(props) {
  const { dataCategorias, selectedCategory, setSelectedCategory } = props;

  // Estado para controlar si el menú está abierto en pantallas pequeñas
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botón de menú hamburguesa en pantallas pequeñas */}
      <button
        className="block md:hidden bg-green-500 text-white px-4 py-2 rounded-md mb-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Cerrar Categorías' : 'Mostrar Categorías'}
      </button>

      {/* Menú de categorías (horizontal en móvil, vertical en desktop con límite de altura y scroll) */}
      <aside className={`w-full md:w-64 pr-8 ${isOpen ? 'block' : 'hidden'} md:block`}>
        <h2 className="text-xl font-semibold mb-4">Cultivos</h2>

        {/* Desktop: Vertical scroll with a max height */}
        <div className="md:max-h-80 md:overflow-y-auto scroll-adside">
          {/* Horizontal scroll only for mobile */}
          <ul className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-2 overflow-x-auto md:overflow-visible">
            {dataCategorias && dataCategorias.length > 0 && Array.isArray(dataCategorias) && dataCategorias.map((category) => (
              <li key={category.id} className="flex-shrink-0">
                <input
                  type="checkbox"
                  id={`category-${category.id}`}
                  checked={selectedCategory === category.nombre}
                  onChange={() => setSelectedCategory(category.nombre)}
                  className="mr-2 w-[18px] h-[18px]"
                />
                <label
                  htmlFor={`category-${category.id}`}
                  className="text-gray-700 hover:text-green-500 cursor-pointer"
                >
                  {category.nombre}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
