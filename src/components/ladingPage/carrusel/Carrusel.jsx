import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { reqtsApiForm } from '../../../config/utils';

const carouselImages = [
    "https://www.shutterstock.com/image-photo/carrot-grower-squatting-plantation-field-600nw-2479811559.jpg",
    "https://placehold.co/400x1200",
    "https://placehold.co/400x1200",
    "https://placehold.co/400x1200",
];


export default function Carrusel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [data, setdata] = useState([])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % data.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + data.length) % data.length);
    };
    useEffect(() => {
        reqtsApiForm("v1/sliders", "GET", {},false)
            .then((res) => {
                if(res.status){
                    if (res && res.sliders.length > 0) {
                        setdata(res.sliders)
                    } else {
                        setdata(carouselImages)
                    }
                }else{
                    setdata(carouselImages)

                }
                
            })

    }, [])
    return (
        <div className="relative">
            <div className="overflow-hidden h-[400px]">
                {data && data.length > 0 && data.map((img, index) => (
                <img
                    key={index}
                    src={ img.url ? `${img.url}` : img}
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
                {data && data.length > 0 && data.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}
