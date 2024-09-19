import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { reqtsApiForm } from '../../../config/utils';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.css';
import { colombiaData } from '../../../data/colombiaData';

export default function ModalFincas({ isModalOpen, setModalOpen, rowselect, restartData }) {
    const id_usuario = localStorage.getItem('id_usuario');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const departments = colombiaData.map(d => d.name);
    const cities = colombiaData.find(d => d.name === selectedDepartment)?.municipalities || [];

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
            setFormData(prev => ({
                ...prev,
                ...rowselect,
                departamento: rowselect.departamento,
                ciudad: rowselect.ciudad
            }));
            setSelectedDepartment(rowselect.departamento || '');
            setSelectedCity(rowselect.ciudad || '');
        } else {
            setFormData({
                nombre: '',
                direccion: '',
                departamento: '',
                ciudad: '',
                usuarioId: id_usuario,
                cantidad: '',
            });
            setSelectedDepartment('');
            setSelectedCity('');
        }
    }, [rowselect]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleClose = () => setModalOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Actualiza formData con los valores seleccionados
        const updatedFormData = {
            ...formData,
            departamento: selectedDepartment,
            ciudad: selectedCity
        };

        if (updatedFormData.nombre && updatedFormData.direccion && updatedFormData.departamento && updatedFormData.ciudad && updatedFormData.cantidad) {
            const method = rowselect && rowselect.id ? 'PUT' : 'POST';
            const url = rowselect && rowselect.id ? `v1/fincas/${rowselect.id}` : `v1/fincas`;
            const message = rowselect && rowselect.id ? "Finca actualizada con exito" : "Finca registrada con exito";

            reqtsApiForm(url, method, updatedFormData,true)
                .then((res) => {
                    if (res.status) {
                        Swal.fire({
                            timer: 2000,
                            icon: 'success',
                            title: message
                        });
                        setFormData({
                            nombre: '',
                            direccion: '',
                            departamento: '',
                            ciudad: '',
                            usuarioId: id_usuario,
                            cantidad: '',
                        });
                        setSelectedDepartment('');
                        setSelectedCity('');
                        restartData();
                        handleClose();
                    }
                });
            return;
        } else {
            Swal.fire({
                title: 'Complete todos los campos',
                icon: 'warning',
                timer: 2000
            });
        }
    };

    return (
        <>
            <Modal size={'lg'} show={isModalOpen} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Fincas</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mt-1 ">
                        <form onSubmit={handleSubmit} className="p-3">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border rounded-md border-gray-400 p-2 focus:border-green-500"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">Direccion</label>
                                        <input
                                            type="text"
                                            id="direccion"
                                            name="direccion"
                                            value={formData.direccion}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border rounded-md border-gray-400 p-2 focus:border-green-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="departamento" className="block text-sm font-medium text-gray-700">Departamento</label>
                                        <select
                                            value={selectedDepartment}
                                            name="departamento"
                                            required
                                            className="mt-1 block w-full border rounded-md border-gray-400 p-2 focus:border-green-500"
                                            onChange={(e) => {
                                                setSelectedDepartment(e.target.value);
                                                setSelectedCity('');
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
                                </div>
                                <div>
                                    <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700">Ciudad</label>
                                    <select
                                        value={selectedCity}
                                        name="ciudad"
                                        required
                                        className="mt-1 block w-full border rounded-md border-gray-400 p-2 focus:border-green-500"
                                        onChange={(e) => setSelectedCity(e.target.value)}
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
                                <div>
                                    <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700">Terreno/ Metros</label>
                                    <input
                                        type="number"
                                        id="cantidad"
                                        name="cantidad"
                                        value={formData.cantidad}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border rounded-md border-gray-400 p-2 focus:border-green-500"
                                        required
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-center'>
                    <Button variant="success" onClick={handleSubmit}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
