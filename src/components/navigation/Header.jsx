import React, { useState } from 'react';
import { Link,useLocation } from 'react-router-dom';
import { Menu, X, ArrowLeft } from 'lucide-react'; // Importamos íconos para el menú y cerrar

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Función para alternar el menú
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const location = useLocation();
  console.log({location})

  return (
    <header className="bg-white shadow-md px-2">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className='d-flex gap-10'>
          {
            location.pathname.includes('product') && (
              <Link  to={'/store'}>
              <ArrowLeft
               className='bg-green-500  p-2 text-white  text-[20px]  w-[40px] h-[40px] rounded-lg '
                />
                </Link>

            )
          }

          <Link to={"/"}>
            <h1 className="text-2xl font-bold mt-1">
              <span className="text-black">Frutos de mi </span>
              <span className="text-green-500">Tierra</span>
            </h1>
          </Link>
        </div>


        {/* Botón hamburguesa visible solo en móviles */}
        <button
          className="block md:hidden text-gray-600"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menú de navegación para pantallas grandes */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-4 pt-1">
            <li>
              <Link
                to="/store"
                className="text-gray-600 text-[18px] hover:text-green-500"
              >
                Cultivos
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="text-gray-600 text-[18px] hover:text-green-500"
              >
                Ingresar
              </Link>
            </li>
            <li>
              <Link
                to="/registro"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Regístrate
              </Link>
            </li>
          </ul>
        </nav>

        {/* Menú desplegable en móviles */}
        {isOpen && (
          <nav className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md z-10">
            <ul className="flex flex-col items-center space-y-4 py-4">
              <li>
                <Link
                  to="/store"
                  className="text-gray-600 text-[18px] hover:text-green-500"
                  onClick={toggleMenu} // Cerramos el menú al hacer clic
                >
                  Cultivos
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-gray-600 text-[18px] hover:text-green-500"
                  onClick={toggleMenu} // Cerramos el menú al hacer clic
                >
                  Ingresar
                </Link>
              </li>
              <li>
                <Link
                  to="/registro"
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  onClick={toggleMenu} // Cerramos el menú al hacer clic
                >
                  Regístrate
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
