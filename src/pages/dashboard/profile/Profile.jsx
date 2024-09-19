import React, { useEffect, useState } from 'react';
import useForm from '../../../hooks/useForm';
import { reqtsApiForm } from '../../../config/utils';
import Swal from 'sweetalert2';

export default function Profile() {
    const { handleTarget, navigate, resetValues, values,setValues } = useForm({
        nombre_completo: '',
        nombre_comercial: '',
        razon_social: '',
        identificacion: '',
        telefono: '',
        correo: '',
        password: '',
        direccion: '',
        departamento: '',
        ciudad: '',
        estado: true
    });

    useEffect(() => {
        const usuario_id = localStorage.getItem('id_usuario');
        reqtsApiForm(`v1/auth/profile/${usuario_id}`, 'GET', {},true)
            .then((res) => {
                if(res.status){
                    setValues(res.profile)
                }
            })
            .catch((error) => console.error('Error fetching profile:', error));
    }, []);

const handleSubmit = (e) => {
    e.preventDefault();
    const usuario_id = localStorage.getItem('id_usuario');
    reqtsApiForm(`v1//auth/profile/${usuario_id}`, "PUT", values,true)
        .then((res) => {
            console.log(res)
            if (res.status) {                
                Swal.fire({
                    timer:2000,
                    icon:'success',
                    title:"Datos actualizados con exito"
                })
            }
        })

};

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Tus datos</h2>
            <form className="space-y-4">
                {[
                    { label: 'Nombre', name: 'nombre_completo' },
                    { label: 'Email', name: 'correo' },
                    { label: 'Teléfono', name: 'telefono' },
                    { label: 'Dirección', name: 'direccion' },
                    { label: 'Nombre comercial', name: 'nombre_comercial' },
                    { label: 'Razón social', name: 'razon_social' },
                    { label: 'Identificación', name: 'identificacion' },
                    { label: 'Departamento', name: 'departamento' },
                    { label: 'Ciudad', name: 'ciudad' }
                ].map((field) => (
                    <div key={field.name}>
                        <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                            {field.label}
                        </label>
                        <input
                            type={field.name === 'correo' ? 'email' : 'text'}
                            id={field.name}
                            name={field.name}
                            value={values[field.name] || ''} // Usa el valor del formulario
                            onChange={handleTarget} // Maneja los cambios en el formulario
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                ))}
                <button
                    type="button"
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    onClick={(e)=>handleSubmit(e)}
                >
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
}
