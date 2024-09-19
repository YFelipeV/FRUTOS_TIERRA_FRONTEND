import React, { useEffect, useState } from 'react'
import { reqtsApiForm } from '../../../config/utils'
import Paginador from '../../../components/common/Paginador'
import { Check } from "lucide-react"
import Swal from 'sweetalert2'
import ModalCultivos from '../../../components/dashboard/cultivos/ModalCultivos'
import { ToastContainer } from 'react-toastify'
import SearchDashboard from '../../../components/common/SearchDashboard'
import { alertMessage } from '../../../utils/Alerts'
import { Spinner } from 'react-bootstrap'

export default function Cultivos() {
    const [data, setdata] = useState([])
    const [isModalOpen, setModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("")
    const [rowselect, setrowselect] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const itemsPerPage = 6


    // Filtrar cultivos según el término de búsqueda
    const filteredData = data && data.length > 0 && data.filter(cultivo =>
        cultivo.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (cultivo.ciudad && cultivo.ciudad.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (cultivo.departamento && cultivo.departamento.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    // Paginación después de filtrar
    const pageCount = Math.ceil(filteredData.length / itemsPerPage);

    const paginatedData = filteredData && filteredData.length > 0 && filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const restartData = () => {
        setLoading(true)
        reqtsApiForm("v1/cultivos", "GET", {},true)
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
                await reqtsApiForm(`v1/cultivos/${id}`, "DELETE",true);
                restartData();
                alertMessage(2000, "Cultivo eliminado con exito", 'success')
            } catch (error) {
                alertMessage(2000, "Error al eliminar", 'error');
            }
    }



    return (
        <div className='bg-white rounded-lg shadow-md p-6 w-100' style={{ width: "100%", overflowX: "hidden" }}>
            <h2 className="text-2xl font-semibold mb-4">
                Listado de tus cultivos
            </h2>
            <ToastContainer position='top-center' />
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
                        title={"Cultivos"}
    
    
                    />
    
    
                    <div className="overflow-x-auto scroll-adside">
                        <table className="min-w-full bg-white">
                            <thead className="bg-gray-50">
                                <tr>
                                    {
                                        ['Nombre', 'Fecha Inicio', 'Proyección', 'Fecha Finalización', 'Status', 'Acciones']
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
    
                                       
                                            <td className="px-6 py-4 whitespace-nowrap">{item.fecha_inicio ? new Date(item.fecha_inicio).toLocaleDateString() : ''}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.proyeccion}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.fecha_finalizacion ? new Date(item.fecha_finalizacion).toLocaleDateString() : ''}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.estado && <Check className="text-green-500" />}
                                            </td>
                                        
    
    
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button onClick={() => {
                                                setrowselect(item)
                                                setModalOpen(true)
                                            }} className="bg-green-100 text-green-600 hover:bg-green-200 px-3 py-1 rounded-md mr-2">
                                                Editar
                                            </button>
                                            <button className="bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 rounded-md"
                                                onClick={() => {
                                                    Swal.fire({
                                                        title: "Estas seguro de eliminar este cultivo?",
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
                                                        }
                                                    });
                                                }}
    
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                )) ||<tr><td> <p className='text-center w-100'>No hay  cultivos disponibles</p></td></tr>}
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
                                    filteredData={filteredData} 
                                    pageCount={pageCount}
                                />
                            )
    
                        }
    
                    </div>
                    <ModalCultivos isModalOpen={isModalOpen} setModalOpen={setModalOpen} restartData={restartData} rowselect={rowselect} />
    
                </>
                )

            }
           

        </div>
    )
}
