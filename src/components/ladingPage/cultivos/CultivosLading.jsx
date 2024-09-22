import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { reqtsApiForm } from '../../../config/utils';

export default function CultivosLading() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false); // Estado para manejar errores

    const placeholderImages = [
        {
            id: 101,
            nombre: "Cultivo de Tomate",
            categoria: "Categoría ",
            imagenes: [{ url: "https://placehold.co/200x300" }]
        },
        {
            id: 102,
            nombre: "Cultivo  de Tomate",
            categoria: "Categoría ",
            imagenes: [{ url: "https://placehold.co/200x300" }]
        },
        {
            id: 103,
            nombre: "Cultivo  de Tomate" ,
            categoria: "Categoría ",
            imagenes: [{ url: "https://placehold.co/200x300" }]
        },
        {
            id: 104,
            nombre: "Cultivo  de Tomate ",
            categoria: "Categoría ",
            imagenes: [{ url: "https://placehold.co/200x300" }]
        },
    ];

    useEffect(() => {
        reqtsApiForm("v1/cultivos_all", "GET", {})
            .then((res) => {
                if (res && Array.isArray(res) && res.length > 0) {
                    setData(res); // Establecer datos si la respuesta es válida
                } else {
                    setError(true); // Marcar error si no hay datos o no es un array
                }
            })
            .catch(() => setError(true)); // Manejar error en la petición
    }, []);

    // Rellenar los datos con los placeholders si hay menos de 4 registros
    const remainingItems = Math.max(4 - data.length, 0);
    const filledData = [...data, ...placeholderImages.slice(0, remainingItems)];

    return (
        <section className="py-12 bg-gray-100 px-2">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center">Cultivos</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {
                        filledData.map((img, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <img
                                    src={img && img.imagenes && img.imagenes.length > 0
                                        ? `${img.imagenes[0].url}`
                                        : "https://placehold.co/400x300"}
                                    alt={`Cultivo ${index + 1}`} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="font-semibold mb-2">{img.nombre || "Cultivo "}</h3>
                                    <p className="text-sm text-gray-600 mb-4">{img.categoria || "Categoría no disponible"}</p>

                                    <Link to={img.id ? `/product/${img.id}` : `/store`}>
                                        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full">Ver más</button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className="text-center mt-8">
                    <Link to={"/store"}>
                        <button className="border border-green-500 text-green-500 px-6 py-2 rounded-md hover:bg-green-500 hover:text-white">
                            Ver más
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
