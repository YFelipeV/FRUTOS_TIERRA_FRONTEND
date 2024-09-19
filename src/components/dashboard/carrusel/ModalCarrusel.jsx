import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.css';
import { reqtsApiFormData } from '../../../config/utils';
import Swal from 'sweetalert2';

export default function ModalCarrusel({ isModalOpen, setModalOpen, rowselect, restartData }) {
  const [formData, setFormData] = useState({ imagenes: [] });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (rowselect) {
      setFormData(rowselect);
    } else {
      setFormData({ imagenes: [] });
    }
  }, [rowselect]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));

    if (imageFiles.length !== files.length) {
      setError("Solo se permiten archivos de imagen.");
      return;
    } else {
      setError("");
    }

    const imagePreviews = imageFiles.map(file => URL.createObjectURL(file));

    setFormData(prevState => ({
      ...prevState,
      imagenes: imagePreviews
    }));

    setImages(imageFiles);
    setCurrentSlide(0);
  };

  const handleClose = () => setModalOpen(false);

  // Funciones para manejar el carrusel
  const nextSlide = () => {
    if (formData.imagenes.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % formData.imagenes.length);
    }
  };

  const prevSlide = () => {
    if (formData.imagenes.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + formData.imagenes.length) % formData.imagenes.length);
    }
  };

  // Función para guardar imágenes
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (images.length === 0) {
      Swal.fire({
        title: 'Error',
        text: 'No se han seleccionado imágenes.',
        icon: 'error',
        timer: 2000
      });
      return;
    }

    const newFormData = new FormData();
    images.forEach((image, index) => {
      newFormData.append(`imagenes[${index}]`, image);
    });

    const method = 'POST';
    const url = `v1/slider`;
    const message = "Imágenes subidas con éxito";

    reqtsApiFormData(url, method, newFormData,true)
      .then((res) => {
        if (res.status) {
          Swal.fire({
            title: message || "",
            icon: 'success',
            timer: 2000
          });
          setFormData({ imagenes: [] });
          setImages([]);
          restartData();
          handleClose();
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al subir las imágenes.',
          icon: 'error',
          timer: 2000
        });
      });
  };

  return (
    <>
      <Modal size={'lg'} show={isModalOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Subir Imágenes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mt-1">
            <div className="p-3">
              <div className="space-y-4">
                {/* Input para subir imágenes */}
                <div>
                  <label htmlFor="imagenes" className="block text-sm font-medium text-gray-700">Cargar imágenes</label>
                  <input
                    type="file"
                    id="imagenes"
                    name="imagenes"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-1 block w-full border rounded-md border-gray-400 p-2 focus:border-green-500"
                  />
                  {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>

                {/* Previsualización de imágenes en el slider */}
                {formData.imagenes.length > 0 ? (
                  <div className="relative mt-4">
                    <div className="overflow-hidden h-[400px] relative">
                      {formData.imagenes.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`Slide ${index + 1}`}
                          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
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
                      {formData.imagenes.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <p></p>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-center'>
          <Button type='submit' variant="success" onClick={handleOnSubmit}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
