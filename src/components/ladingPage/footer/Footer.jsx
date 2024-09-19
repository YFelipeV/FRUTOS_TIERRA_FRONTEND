import React from 'react'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white px-2 py-8 ">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 px-10">
                    <div className='pt-2'>
                        <h3 className="font-bold text-2xl mb-4">Frutos de mi Tierra</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur </p>
                       
                    </div>
                    <div className='flex flex-column justify-center mx-20'>
                        <h3 className="font-bold mb-4">Acerca de</h3>
                        <ul className="space-y-2">
                            <li><a href="/store" className="hover:text-green-500">Cultivos</a></li>
                            <li><a href="/login" className="hover:text-green-500">Ingresar</a></li>
                            <li><a href="/registro" className="hover:text-green-500">Registrarse</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Follow Us</h3>
                        <div className="flex space-x-8">
                            <a href="#" className="hover:text-green-500"><Facebook /></a>
                            <a href="#" className="hover:text-green-500"><Twitter /></a>
                            <a href="#" className="hover:text-green-500"><Instagram /></a>
                            <a href="#" className="hover:text-green-500"><Linkedin /></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
