import React, { useEffect, useState } from 'react';
import Header from '../../components/navigation/Header';
import { useParams } from 'react-router-dom';
import { reqtsApiForm } from '../../config/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { API,  API_FRONTEND,  PHONE } from '../../config/enviroment';
import { Spinner } from 'react-bootstrap';

export default function ProductDetail() {
  const { id } = useParams()
  const [data, setdata] = useState([])
  const [loading, setloading] = useState(false)
  const [carouselImages, setcarouselImages] = useState(
    [
      {
        url: "https://placehold.co/400x1200"
      },
      {
        url: "https://placehold.co/400x1200"
      },
      {
        url: "https://placehold.co/400x1200"
      },
    ]
  )


  const cultivoImages = [
    "https://placehold.co/200x300",
    "https://placehold.co/200x300",
    "https://placehold.co/200x300",
    "https://placehold.co/200x300",

  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };
  useEffect(() => {
    setloading(true)
    reqtsApiForm(`v1/cultivos/${id}`, "GET", {})
      .then((res) => {
        if(res){
          setdata(res)
          const imgs = res.imagenes && res.imagenes.length > 0
            ? res.imagenes.map((img) => ({
              url: `${img.url}`,
            }))
            : [
              { url: "https://placehold.co/400x1200" },
              { url: "https://placehold.co/400x1200" },
              { url: "https://placehold.co/400x1200" },
            ];
  
          setcarouselImages(imgs)
          setloading(false)
        }

        setloading(false)
      })

  }, [])


  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header />


      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {
          loading ? (
            <div className="flex justify-center items-center h-48">
                      <Spinner variant='success'  animation='border' />

          </div>
          ):(
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              {/* Product Image */}
              <div className="md:w-1/2">
                {/* Carousel */}
                <div className="relative">
                  <div className="overflow-hidden h-[400px]">
                    {carouselImages && carouselImages.length > 0 && carouselImages.map((img, index) => (
                      <img
                        key={index}
                        src={img.url}
                        alt={`Slide ${index + 1}`}
                        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                          }`}
                      />
                    ))}
                  </div>
                  <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">
                    <ChevronLeft />
                  </button>
                  <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">
                    <ChevronRight />
                  </button>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {carouselImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                          }`}
                      />
                    ))}
                  </div>
                </div>
  
              </div>
  
              {/* Product Details */}
              <div className="md:w-1/2 p-6">
                <h2 className="text-3xl font-bold mb-2">Cultivo {data.nombre || 'Tomate'}</h2>
  
                <p className=" mb-2"> <span className='text-gray-600'>Ubicacion:</span> {data.cuidad || 'Popayan'}-{data.departamento || 'Cauca'}</p>
                <p className="mb-2"> <span className='text-gray-600'>Cantidad:</span> {data.cantidad || "4 Toneladas"}</p>
                <p className="mb-2"><span className='text-gray-600'>Proyeccion:</span> {data.proyeccion || "Proyeccion: 3 meses"} </p>
                <p className="mb-2"><span className='text-gray-600'>Fecha Inicializacion:</span> {new Date(data.fecha_inicio).toLocaleDateString() || 'Fecha incial: 25/06/2024'} </p>
                <p className="mb-4"><span className='text-gray-600'>Fecha Finalización:</span>{new Date(data.fecha_finalizacion).toLocaleDateString() || "Fecha final: 25/09/2024"}</p>
                <p className="text-gray-700 mb-6">
                  {data.descripcion_corta}
                </p>
                <button 
                  className="w-full w-[100%] bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
                >
   <a
                  href={`https://api.whatsapp.com/send/?phone=${PHONE}&text=Hola%2C+Estoy+interesado+en+este+cultivo+${encodeURIComponent(`${API_FRONTEND}/product/${data.id}`)}%2F++me+podrias+brindar+mas+informacion&type=phone_number&app_absent=0`}
                  className="w-full w-[100%] bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
                  target='_blank'
                  >
                  Contactar
                </a>
                </button>
               
              </div>
            </div>
  
            {/* Description */}
            <div className="p-6 border-t pt-2 border-gray-200">
              <h3 className="text-xl font-semibold mb-4">Descripción</h3>
              <p className="text-gray-700">
                {data.descripcion_larga}
              </p>
            </div>
          </div>
          )
        }
       
      </main>
    </div>
  );
}