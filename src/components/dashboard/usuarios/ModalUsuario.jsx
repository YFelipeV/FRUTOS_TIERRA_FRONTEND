import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import { reqtsApiForm } from '../../../config/utils';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.css'


export default function ModalUsuario({ isModalOpen, setModalOpen, rowselect, restartData }) {
    const id_usuario = localStorage.getItem('id_usuario')
    const [showInhabilitados, setShowInhabilitados] = useState(false); 

    const [formData, setFormData] = useState({
        nombre: '',
        direccion: '',
        departamento: '',
        ciudad: '',
        usuarioId: id_usuario,
        cantidad: '',

    });
    useEffect(() => {
        if (rowselect) {
            setFormData(rowselect)
        } else {
            setFormData({
                nombre: '',
                direccion: '',
                departamento: '',
                ciudad: '',
                usuarioId: id_usuario,
                cantidad: '',
            })
        }
    }, [rowselect])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleClose = () => setModalOpen(false);



    return (
        <>
            <Modal size={'lg'} show={isModalOpen} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="mt-1 ">
                        <form className="p-3">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre completo </label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        value={formData.nombre_completo}
                                        readOnly={true}
                                        disabled
                                        className="mt-1 block w-full border rounded-md border-gray-400 p-2  focus:border-green-500  "
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="departamento" className="block text-sm font-medium text-gray-700">Departamento</label>
                                        <input
                                            type="text"
                                            id="departamento"
                                            name="direccion"
                                            value={formData.departamento}
                                            className="mt-1 block w-full border rounded-md border-gray-400 p-2  focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                            readOnly
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700">Cuidad</label>
                                        <input
                                            type="text"
                                            id="ciudad"
                                            name="ciudad"
                                            value={formData.ciudad}
                                            readOnly
                                            disabled
                                            className="mt-1 block w-full border rounded-md border-gray-400 p-2  focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">direccion</label>
                                    <input
                                        type="text"
                                        id="direccion"
                                        name="direccion"
                                        value={formData.direccion}
                                        readOnly
                                        disabled
                                        className="mt-1 block w-full border rounded-md border-gray-400 p-2  focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="identificacion" className="block text-sm font-medium text-gray-700">Identificacion</label>
                                    <input
                                        type="number"
                                        id="identificacion"
                                        name="identificacion"
                                        value={formData.identificacion}
                                        readOnly
                                        disabled
                                        className="mt-1 block w-full border rounded-md border-gray-400 p-2   focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="nombre_comercial" className="block text-sm font-medium text-gray-700">Nombre comercial</label>
                                        <input
                                            type="text"
                                            id="nombre_comercial"
                                            name="nombre_comercial"
                                            value={formData.nombre_comercial}
                                            className="mt-1 block w-full border rounded-md border-gray-400 p-2  focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                            readOnly
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="razon_social" className="block text-sm font-medium text-gray-700">Razon social</label>
                                        <input
                                            type="text"
                                            id="razon_social"
                                            name="razon_social"
                                            value={formData.razon_social}
                                            readOnly
                                            disabled
                                            className="mt-1 block w-full border rounded-md border-gray-400 p-2  focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-center'>


                </Modal.Footer>
            </Modal>
        </>
    )
}
