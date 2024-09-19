import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { reqtsApiForm } from '../../../config/utils';

export default function CultivosLading() {
    const [data, setData] = useState([]);
    const placeholderImages = [
        "https://placehold.co/200x300",
        "https://placehold.co/200x300",
        "https://placehold.co/200x300",
        "https://placehold.co/200x300",
    ];

    useEffect(() => {
        reqtsApiForm("v1/cultivos_all", "GET", {})
            .then((res) => {
                setData(res)
            })
    }, []);

    // Determine how many placeholder items to show
    const remainingPlaceholders = Math.max(4 - data.length, 0);
    const filledData = data && data.length > 0 ? [...data, ...placeholderImages.slice(0, remainingPlaceholders)] : placeholderImages;

    return (
        <section className="py-12 bg-gray-100 px-2">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center">Cultivos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {
                        filledData.length > 0 && filledData.map((img, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <img
                                    src={img && img.imagenes && img.imagenes.length > 0
                                        ? `${img.imagenes[0].url}`
                                        : "https://placehold.co/400x300"}
                                    alt={`Cultivo ${index + 1}`} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="font-semibold mb-2">Cultivo {img.nombre || "Tomate"}</h3>
                                    <p className="text-sm text-gray-600 mb-4">{img.categoria || "Papa"}</p>

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
    )
}
