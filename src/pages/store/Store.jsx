import React, { useEffect, useState } from 'react';
import Header from '../../components/navigation/Header.jsx';
import { Link } from 'react-router-dom';
import { reqtsApiForm } from '../../config/utils.js';
import AsideCategory from '../../components/store/AsideCategory.jsx';
import Search from '../../components/common/Search.jsx';
import { Spinner } from 'react-bootstrap';

export default function Store() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [dataCategorias, setdataCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filtrar cultivos basado en la categoría seleccionada y el término de búsqueda
  const filteredCultivos =data && data.length > 0 && Array.isArray(data) && data.filter(cultivo =>
    (selectedCategory === 'All' || cultivo.categoria === selectedCategory) &&
    (cultivo?.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cultivo?.departamento?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cultivo?.ciudad?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    Promise.all([
      reqtsApiForm("v1/cultivos_all", "GET", {}),
      reqtsApiForm("v1/categorias", "GET", {})
    ])
      .then(([cultivos, categorias]) => {
        // Si la petición de categorías falla, crea un array con "All"
        const resultCategorias = categorias && Array.isArray(categorias)
          ? [{ id: 99, nombre: "All" }, ...categorias]
          : [{ id: 99, nombre: "All" }]; // Categoría "All" por defecto
  
        setData(cultivos || []); // Si falla cultivos, establece un array vacío
        setdataCategorias(resultCategorias);
        setLoading(false); 
      })
      .catch((error) => {
        setData([]); 
        setdataCategorias([{ id: 99, nombre: "All" }]); // Crear "All" si hay error
        setLoading(false); 
      });
  }, []);
  


  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header />

      <div className="container mx-auto px-4 py-8 flex">
        {/* Categorias */}
        <AsideCategory
          dataCategorias={dataCategorias}
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />

        {/* Main Content */}
        <main className="flex-1">
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <h2 className="text-2xl font-bold mb-4">#{selectedCategory}</h2>

          {loading ? (
            <div className="flex justify-center items-center h-48">
            <Spinner variant='success' animation='border' />

            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {
                filteredCultivos && filteredCultivos.length > 0 ? (
                  filteredCultivos.map(cultivo => (
                    <div key={cultivo.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <img
                        src={cultivo && cultivo.imagenes && cultivo.imagenes.length > 0
                          ? `${cultivo.imagenes[0].url}`
                          : "https://placehold.co/400x300"}
                        alt={cultivo.nombre}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">{cultivo.nombre}</h3>
                        <p className="text-sm text-gray-600 mb-1">{cultivo.finca.departamento || " "}-{cultivo.finca.ciudad || " "}</p>
                        <p className="text-sm text-gray-600 mb-4">{cultivo.categoria || " "}</p>
                        <Link to={`/product/${cultivo.id}`}>
                          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full">
                            Ver más
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center col-span-full">No hay cultivos disponibles</div>
                )
              }
            </div>
          )}
        </main>
      </div>
    </div>
  );
}