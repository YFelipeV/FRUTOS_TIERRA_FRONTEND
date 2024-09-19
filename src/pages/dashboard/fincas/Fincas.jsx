import React, { useEffect, useState } from 'react'
import { reqtsApiForm } from '../../../config/utils'
import Paginador from '../../../components/common/Paginador';
import Swal from 'sweetalert2';
import ModalFincas from '../../../components/dashboard/fincas/ModalFincas';
import SearchDashboard from '../../../components/common/SearchDashboard';
import { alertMessage } from '../../../utils/Alerts';
import { Spinner } from 'react-bootstrap';

export default function Fincas() {
    const [data, setdata] = useState([])
    const [isModalOpen, setModalOpen] = useState(false);
    const [rowselect, setrowselect] = useState(null);
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const itemsPerPage = 6

    const filteredData = data && data.length > 0 &&  data.filter(finca =>
        finca.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (finca.ciudad && finca.ciudad.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (finca.departamento && finca.departamento.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    // Paginación después de filtrar

    const pageCount = Math.ceil(filteredData.length / itemsPerPage);

    const paginatedData =filteredData && filteredData.length > 0 &&  filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const restartData = () => {
        setLoading(true)
        reqtsApiForm("v1/fincas", "GET", {},true)
            .then((res) => {
                setdata(res)
                setLoading(false)
            })
    }
    useEffect(() => {
        restartData()

    }, [])
    const handleDelete = async (id) => {  
            try {
                await reqtsApiForm(`v1/fincas/${id}`, "DELETE", true);
                restartData();
                alertMessage(2000, "Finca eliminada con exito", 'success')
            } catch (error) {
                console.error('Error updating status:', error);
                alertMessage(2000, "Error al eliminar", 'error');
            }
    }


    return (
        <div className='bg-white rounded-lg shadow-md p-6 w-sreen' style={{ width: "100%", overflowX: "hidden" }}>
            <h2 className="text-2xl font-semibold mb-4">
                Listado de tus Fincas
            </h2>
            {
                loading ? (
                    <div className='d-flex justify-content-center'>
                        <Spinner variant='success' animation='border'/>

                    </div>
                ):(
                    <>
                    <SearchDashboard
                        setSearchTerm={setSearchTerm}
                        searchTerm={searchTerm}
                        setrowselect={setrowselect}
                        setModalOpen={setModalOpen}
                        title={"Fincas"}
    
                    />
    
    
                    <div className="overflow-x-auto scroll-adside">
                        <table className="min-w-full bg-white">
                            <thead className="bg-gray-50">
                                <tr>
                                    {
                                        ['Nombre', 'Ubicación', 'Tamaño', 'Cultivos', 'Acciones']
                                            .map((header) => (
                                                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    {header}
                                                </th>
                                            ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {paginatedData && paginatedData.length > 0 && paginatedData.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.nombre}</td>
    
                                        <>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.departamento}-{item.ciudad}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.cantidad}</td>
                                            <td className="px-6 py-4 whitespace-nowrap"> <p className='text-green-600'>Cultivos: <span>{item.cultivos.length}</span></p> </td>
                                        </>
    
    
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button onClick={() => {
                                                setModalOpen(true)
                                                setrowselect(item)
    
                                            }} className="bg-green-100 text-green-600 hover:bg-green-200 px-3 py-1 rounded-md mr-2">
                                                Editar
                                            </button>
                                            <button className="bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 rounded-md" onClick={() => {
                                                Swal.fire({
                                                    title: "Estas seguro de eliminar esta finca?",
                                                    text: "Si eliminas esta finca no podras volver recuperarla!",
                                                    icon: "warning",
                                                    showCancelButton: true,
                                                    confirmButtonColor: "#3085d6",
                                                    cancelButtonColor: "#d33",
                                                    cancelButtonText: "No,estoy seguro",
                                                    confirmButtonText: "Si,estoy seguro"
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        handleDelete(item.id)
                                                        Swal.fire({
                                                            title: "Finca eliminada con exito",
                                                            icon: "success",
                                                            timer: 2000
                                                        });
                                                    }
                                                });
                                            }}>
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                    )) ||<tr><td> <p className='text-center w-100'>No hay  fincas disponibles</p></td></tr>}
    
                            </tbody>
                        </table>
                    </div>
    
                    <div className="mt-4 flex justify-center">
                    {
                            data &&
                            data.length > 0 && (
                                <Paginador
                                    itemsPerPage={itemsPerPage}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    filteredData={filteredData} // Use filteredData here
                                    pageCount={pageCount}
                                />
                            )
    
                        }
                    </div>
                    <ModalFincas
                        setModalOpen={setModalOpen}
                        isModalOpen={isModalOpen}
                        rowselect={rowselect}
                        restartData={restartData}
                        pageCount={pageCount}
                    />
                </>
                )
            }

           

        </div>
    )
}
