import React, { useState } from 'react';
import useForm from '../../hooks/useForm';
import { reqtsApiForm } from '../../config/utils';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { colombiaData } from '../../data/colombiaData';

export default function Register() {
    const [step, setStep] = useState(1);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const departments = colombiaData.map(d => d.name);
    // Filter cities based on the selected department
    const cities = colombiaData.find(
        d => d.name === selectedDepartment
    )?.municipalities || [];

    const { handleTarget, values, navigate } = useForm({
        nombre_completo: "",
        nombre_comercial: "",
        razon_social: "",
        identificacion: "",
        telefono: "",
        correo: "",
        password: "",
        direccion: "",
        departamento: "",
        ciudad: ""
    });

    const handleOnsumbit = async (e) => {
        e.preventDefault();
        if (step === 1) {
            setStep(2);
        } else {
            try {
                const res = await reqtsApiForm("v1/auth/register", "POST", values);
                if (res.status) {
                    toast.success("Registro exitoso");
                    return navigate("/login");
                } else {
                    toast.error(res.message || res.details || "Error en el registro");
                }
            } catch (error) {
                console.error('Error during form submission:', error);
            }
        }
    };

    const handlePrevious = () => {
        setStep(1);
    };

    return (
        <>
            <ToastContainer position='top-center' />
            <div className="min-h-screen bg-gray-100 flex flex-col">
                <div className="flex-grow flex items-center justify-center">
                    <div className="bg-white mt-4 p-8 mb-6 rounded-lg shadow-md w-full max-w-md">
                        <Link to={"/"}>
                            <h1 className="text-3xl font-bold mb-6 text-center">
                                <span className="text-black">Frutos de mi </span>
                                <span className="text-green-500">Tierra</span>
                            </h1>
                        </Link>

                        <h2 className="text-1xl font-semibold mb-6 text-center">
                            {step === 1 ? '¡Súmate a Frutos de mi tierra!' : '¡Súmate a Frutos de mi tierra!'}
                        </h2>
                        <form onSubmit={handleOnsumbit} className="space-y-4">
                            {step === 1 ? (
                                <>
                                    <div>
                                        <label htmlFor="nombre_completo" className="block text-sm font-medium text-gray-700">Nombre y apellido</label>
                                        <input
                                            type="text"
                                            name="nombre_completo"
                                            placeholder="Nombre y apellido"
                                            value={values.nombre_completo}
                                            onChange={handleTarget}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="identificacion" className="block text-sm font-medium text-gray-700">Identificación</label>
                                        <input
                                            type="text"
                                            name="identificacion"
                                            placeholder="Identificación"
                                            value={values.identificacion}
                                            onChange={handleTarget}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
                                        <input
                                            type="tel"
                                            name="telefono"
                                            placeholder="Teléfono"
                                            value={values.telefono}
                                            onChange={handleTarget}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="correo" className="block text-sm font-medium text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            name="correo"
                                            placeholder="Email"
                                            value={values.correo}
                                            onChange={handleTarget}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Contraseña"
                                            value={values.password}
                                            onChange={handleTarget}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            required
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <label htmlFor="nombre_comercial" className="block text-sm font-medium text-gray-700">Nombre comercial</label>
                                        <input
                                            type="text"
                                            name="nombre_comercial"
                                            placeholder="Nombre comercial"
                                            value={values.nombre_comercial}
                                            onChange={handleTarget}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="razon_social" className="block text-sm font-medium text-gray-700">Razón social</label>
                                        <input
                                            type="text"
                                            name="razon_social"
                                            placeholder="Razón social"
                                            value={values.razon_social}
                                            onChange={handleTarget}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">Dirección</label>
                                        <input
                                            type="text"
                                            name="direccion"
                                            placeholder="Dirección"
                                            value={values.direccion}
                                            onChange={handleTarget}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="departamento" className="block text-sm font-medium text-gray-700">Departamento</label>
                                        <select
                                            value={selectedDepartment}
                                            name="departamento"
                                            required
                                            className="mt-1 block w-full border rounded-md border-gray-400 p-2 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                            onChange={(e) => {
                                                setSelectedDepartment(e.target.value);
                                                setSelectedCity('');
                                                handleTarget(e);  // Update useForm values
                                            }}
                                        >
                                            <option value="">Selecciona un departamento</option>
                                            {departments.map((dept, index) => (
                                                <option key={index} value={dept}>
                                                    {dept}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700">Ciudad</label>
                                        <select
                                            value={selectedCity}
                                            name="ciudad"
                                            required
                                            className="mt-1 block w-full border rounded-md border-gray-400 p-2 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                            onChange={(e) => {
                                                setSelectedCity(e.target.value);
                                                handleTarget(e);  // Update useForm values
                                            }}
                                            disabled={!selectedDepartment}
                                        >
                                            <option value="">Selecciona una ciudad</option>
                                            {cities.map((city, index) => (
                                                <option key={index} value={city}>
                                                    {city}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </>
                            )}
                            <div className="flex justify-between">
                                {step === 2 && (
                                    <button
                                        type="button"
                                        onClick={handlePrevious}
                                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
                                    >
                                        Anterior
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className={`px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 ${step === 1 ? 'w-full' : ''}`}
                                >
                                    {step === 1 ? 'Siguiente' : 'Registrar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <footer className="bg-gray-800 text-white text-center p-4  mt-[20px] mt-auto">
                    <p>&copy; {new Date().getFullYear()} Frutos de mi Tierra. Todos los derechos reservados.</p>
                </footer>
            </div>
        </>
    );
}
