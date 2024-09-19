import React from 'react'
import Header from '../../components/navigation/Header';
import Carrusel from '../../components/ladingPage/carrusel/Carrusel';
import CultivosLading from '../../components/ladingPage/cultivos/CultivosLading';
import About from '../../components/ladingPage/about/About';
import Footer from '../../components/ladingPage/footer/Footer';


export default function LandingPage() {

    return (
        <div className="min-h-screen flex flex-col ">
            {/* Header */}
            <Header />
            {/* Carousel */}
            <Carrusel />
            {/* Cultivos Section */}
            <CultivosLading/>
            {/* About Section */}
            <About/>
            {/* Footer */}
            <Footer />
        </div>
    );
}
