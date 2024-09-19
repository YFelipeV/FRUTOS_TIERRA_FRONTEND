import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

export default function ModalImagen({ isModalOpen, setModalOpen, rowselect }) {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (rowselect && rowselect.url) {
      setImage(`${rowselect.url}`);
      setLoading(false);
      setError('');
    } else {
      setImage('');
      setLoading(false);
    }
  }, [rowselect]);

  const handleClose = () => setModalOpen(false);

  const handleImageError = () => {
    setImage('');
    setError('La imagen no se pudo cargar.');
  };

  return (
    <>
      <Modal size={'lg'} show={isModalOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Vista de Imagen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            {loading && <p>Cargando imagen...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {image ? (
              <img
                src={image}
                alt="Imagen"
                onError={handleImageError}
                className="w-full h-auto max-h-96 object-cover"
              />
            ) : (
              !loading && <p>No hay imagen disponible</p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-center'>
          <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
