import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white shadow-md px-2">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link to={"/"}>
            <h1 className="text-2xl font-bold">
              <span className="text-black">Frutos de mi </span>
              <span className="text-green-500">Tierra</span>
            </h1>
            </Link>
           
            <nav  className=' '>
              <ul className="flex space-x-4 pt-1">
                <li><Link to="/store" className="text-gray-600 text-[18px] text-bold text-dark hover:text-green-500">Cultivos</Link></li>
                <li><Link to="/login" className="text-gray-600 text-[18px] text-dark hover:text-green-500">Ingresar</Link></li>
                <li><Link to="/registro" className="bg-green-500 text-dark text-white px-4 py-2 rounded-md hover:bg-green-600">Regístrate</Link></li>
              </ul>
            </nav>
          </div>
        </header>
  )
}
