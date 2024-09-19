import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap';
import { formatDateInput, reqtsApiForm, reqtsApiFormData } from '../../../config/utils';
import { ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.css'




export default function ModalCultivos({ isModalOpen, setModalOpen, rowselect, restartData }) {
    const [images, setImages] = useState([]);
    const [dataFincas, setDataFincas] = useState([]);
    const [dataCategorias, setdataCategorias] = useState([]);
    const [filesBd, setfilesBd] = useState([]);
    const id_usuario = localStorage.getItem('id_usuario')
    const [imagesToDelete, setImagesToDelete] = useState([]);
  
    const [formData, setFormData] = useState({
        nombreProducto: '',
        fechaInicio: '',
        proyeccion: '',
        fechaFinalizacion: '',
        finca: '',
        descripcionCorta: '',
        descripcionLarga: '',
        usuarioId: id_usuario,
        categoria: "",
        cantidad: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleImageDelete = (imageId) => {
        setfilesBd(prevFiles => prevFiles.filter(image => image.id !== imageId));
        setImagesToDelete(prevImagesToDelete => [...prevImagesToDelete, imageId]);
    };

    useEffect(() => {
        const id_usuario = localStorage.getItem('id_usuario')
        if (rowselect) {
            setFormData({
                nombreProducto: rowselect.nombre,
                fechaInicio: formatDateInput(rowselect.fecha_inicio),
                proyeccion: rowselect.proyeccion,
                fechaFinalizacion: formatDateInput(rowselect.fecha_finalizacion),
                finca: rowselect.finca.id,
                descripcionCorta: rowselect.descripcion_corta,
                descripcionLarga: rowselect.descripcion_larga,
                usuarioId: id_usuario,
                categoria: rowselect.categoria,
                cantidad: rowselect.cantidad
            })
            setfilesBd(rowselect.imagenes)
        } else {

            setFormData({
                nombreProducto: '',
                fechaInicio: '',
                proyeccion: '',
                fechaFinalizacion: '',
                finca: '',
                descripcionCorta: '',
                descripcionLarga: '',
                usuarioId: id_usuario,
                categoria: "",
                cantidad: ""

            });
            setfilesBd([]);
        }
    }, [rowselect])

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImages(prevImages => [...prevImages, ...files]);
    };

    useEffect(() => {
        const id_usuario = localStorage.getItem("id_usuario")
        reqtsApiForm(`v1/fincas/${id_usuario}`, "GET", {}, true)
            .then((res) => {
                setDataFincas(res)
            })

        reqtsApiForm("v1/categorias", "GET", {})
            .then((res) => {
                setdataCategorias(res)
            })
    }, [])

    const handleClose = () => setModalOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newformData = new FormData();
        const id_usuario = localStorage.getItem('id_usuario');

        // Agrega los campos del formulario
        newformData.append('nombreProducto', formData.nombreProducto);
        newformData.append('fechaInicio', formData.fechaInicio);
        newformData.append('proyeccion', formData.proyeccion);
        newformData.append('fechaFinalizacion', formData.fechaFinalizacion);
        newformData.append('finca', formData.finca);
        newformData.append('descripcionCorta', formData.descripcionCorta);
        newformData.append('usuarioId', formData.usuarioId);
        newformData.append('descripcionLarga', formData.descripcionLarga);
        newformData.append('cantidad', formData.cantidad);
        newformData.append('categoria', formData.categoria);

        // Agrega las imágenes nuevas al FormData
        images.forEach((image, index) => {
            newformData.append(`imagenes[${index}]`, image);
        });

        // Agrega los IDs de imágenes a eliminar
        newformData.append('imagenesAEliminar', JSON.stringify(imagesToDelete));

        const method = rowselect && rowselect.id ? 'PUT' : 'POST';
        const url = rowselect && rowselect.id ? `v1/cultivos/${rowselect.id}` : `v1/cultivos`;
        const message = rowselect && rowselect.id ? "Cultivo actualizado con éxito" : "Cultivo registrado con éxito";
        if (formData.nombreProducto && formData.fechaInicio && formData.proyeccion && formData.fechaFinalizacion && formData.finca &&
            formData.cantidad && formData.categoria) {
            // Llama a la API con FormData
            reqtsApiFormData(url, method, newformData, true)
                .then((res) => {
                    if (res.status) {
                        Swal.fire({
                            title: message || "",
                            icon: 'success',
                            timer: 2000
                        })
                        setFormData({
                            nombreProducto: '',
                            fechaInicio: '',
                            proyeccion: '',
                            fechaFinalizacion: '',
                            finca: '',
                            descripcionCorta: '',
                            descripcionLarga: '',
                            usuarioId: id_usuario,
                            categoria: "",
                            cantidad: ""
                        });
                        setImages([]);
                        setfilesBd([])
                        setImagesToDelete([])
                        restartData()
                        handleClose();
                    } else {
                        Swal.fire({
                            title: res.details || "",
                            icon: 'warning',
                            timer: 2000
                        })
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
        } else {
            Swal.fire({
                title: 'Complete todos los campos',
                icon: 'warning',
                timer: 2000
            })
        }
    };
    return (
        <>
            <ToastContainer position='center' />
            <Modal size={'lg'} show={isModalOpen} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cultivos</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="mt-1 ">
                        <form onSubmit={handleSubmit} className="p-3">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="nombreProducto" className="block text-sm font-medium text-gray-700">Nombre Producto</label>
                                    <input
                                        type="text"
                                        id="nombreProducto"
                                        name="nombreProducto"
                                        value={formData.nombreProducto}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border rounded-md border-gray-400 p-2  focus:border-green-500  "
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="fechaInicio" className="block text-sm font-medium text-gray-700">Fecha Inicio</label>
                                        <input
                                            type="date"
                                            id="fechaInicio"
                                            name="fechaInicio"
                                            value={formData.fechaInicio}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border rounded-md border-gray-400 p-2  focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="fechaFinalizacion" className="block text-sm font-medium text-gray-700">Fecha Finalización</label>
                                        <input
                                            type="date"
                                            id="fechaFinalizacion"
                                            name="fechaFinalizacion"
                                            value={formData.fechaFinalizacion}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border rounded-md border-gray-400 p-2  focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="proyeccion" className="block text-sm font-medium text-gray-700">Proyección</label>
                                    <input
                                        type="text"
                                        id="proyeccion"
                                        name="proyeccion"
                                        placeholder={"2 meses"}
                                        value={formData.proyeccion}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border rounded-md border-gray-400 p-2  focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700">Cantidad</label>
                                    <input
                                        type="text"
                                        id="cantidad"
                                        name="cantidad"
                                        value={formData.cantidad}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border rounded-md border-gray-400 p-2  focus:border-green-500  "
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Tipo de cultivo</label>
                                    <select required value={formData.categoria} onChange={handleChange}
                                        className="mt-1 block w-full border rounded-md border-gray-400 p-2  focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                        id="categoria"
                                        name="categoria"
                                    >
                                        <option disabled value={''}>Seleccione Tipo</option>
                                        {
                                            dataCategorias &&
                                            dataCategorias.length > 0 &&
                                            dataCategorias.map((item) => (
                                                <option key={item.nombre} value={item.nombre}>{item.nombre}</option>

                                            ))
                                        }
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="finca" className="block text-sm font-medium text-gray-700">Finca</label>
                                    <select required value={formData.finca} onChange={handleChange}
                                        className="mt-1 block w-full border rounded-md border-gray-400 p-2  focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                        id="finca"
                                        name="finca"
                                    >
                                        <option disabled value={''}>Seleccione Finca</option>
                                        {
                                            dataFincas &&
                                            dataFincas.length > 0 &&
                                            dataFincas.map((item) => (
                                                <option key={item.id} value={item.id}>{item.nombre}</option>

                                            ))
                                        }
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="descripcionCorta" className="block text-sm font-medium text-gray-700">Descripción Corta</label>
                                    <textarea
                                        type="text"
                                        id="descripcionCorta"
                                        name="descripcionCorta"
                                        value={formData.descripcionCorta}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border rounded-md border-gray-400 p-2  min-h-[200px] focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="descripcionLarga" className="block text-sm font-medium text-gray-700">Descripción Larga</label>
                                    <textarea
                                        id="descripcionLarga"
                                        name="descripcionLarga"
                                        value={formData.descripcionLarga}
                                        onChange={handleChange}
                                        rows="3"
                                        className="mt-1 block w-full border rounded-md border-gray-400 p-2 min-h-[400px]  focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                        required
                                    ></textarea>
                                </div>
                                <div>
                                    <label htmlFor="imagenes" className="block text-sm font-medium text-gray-700">Imágenes</label>
                                    <input
                                        type="file"
                                        id="imagenes"
                                        name="imagenes"
                                        onChange={handleImageUpload}
                                        multiple
                                        accept="image/*"
                                        className="mt-1 block w-full text-sm text-gray-500
  file:mr-4 file:py-2 file:px-4
  file:rounded-md file:border-0
  file:text-sm file:font-semibold
  file:bg-green-50 file:text-green-700
  hover:file:bg-green-100"
                                    />
                                </div>
                                {
                                    (filesBd && filesBd.length > 0 || images.length > 0) && (
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {filesBd.map((image) => (
                                                <div key={image.id} className="relative">
                                                    <img src={`${image.url}`} alt={`Existing ${image.id}`} className="h-20 w-20 object-cover rounded-md" />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleImageDelete(image.id)}
                                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                                                    >
                                                        X
                                                    </button>
                                                </div>
                                            ))}
                                            {images.map((image, index) => (
                                                <div key={index} className="relative">
                                                    <img src={URL.createObjectURL(image)} alt={`Uploaded ${index + 1}`} className="h-20 w-20 object-cover rounded-md" />
                                                    <button
                                                        type="button"
                                                        onClick={() => setImages(images.filter((_, i) => i !== index))}
                                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                                                    >
                                                        X
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                }


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


    )
}
