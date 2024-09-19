import React, { useEffect, useState } from 'react'
import { reqtsApiForm } from '../../../config/utils'
import Paginador from '../../../components/common/Paginador';
import Swal from 'sweetalert2';
import { alertMessage } from '../../../utils/Alerts';
import ModalUsuario from '../../../components/dashboard/usuarios/ModalUsuario';
import { Search } from "lucide-react"
import { Spinner } from 'react-bootstrap';

export default function Usuarios() {
    const [data, setdata] = useState([])
    const [isModalOpen, setModalOpen] = useState(false);
    const [rowselect, setrowselect] = useState(null);
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [showInhabilitados, setShowInhabilitados] = useState(false);
    const [loading, setLoading] = useState(false)


    const itemsPerPage = 6

    const filteredData = data && data.length > 0 && data
        .filter(finca =>
            finca.nombre_completo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (finca.ciudad && finca.ciudad.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (finca.departamento && finca.departamento.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .filter(slider => (showInhabilitados ? !slider.estado : slider.estado))


    // Paginación después de filtrar

    const pageCount = Math.ceil(filteredData.length / itemsPerPage);

    const paginatedData = filteredData && filteredData.length > 0 && filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const restartData = () => {
        setLoading(true)
        reqtsApiForm("v1/usuarios", "GET", {}, true)
            .then((res) => {
                setdata(res)
                setLoading(false)

            })
    }
    useEffect(() => {
        restartData()
    }, [])
    const handleUpdate = async (id) => {
        const estado = showInhabilitados ? true : false;
        try {
            await reqtsApiForm(`v1/usuarios/${id}`, "PUT", { estado }, true)
            restartData();
            alertMessage(2000, estado ? "Usuario habilitado con éxito" : "Usuario inhabilitado con éxito", 'success');
        } catch (error) {
            alertMessage(2000, "Error al actualizar el estado", 'error');
        }
    }


    return (
        <div className='bg-white rounded-lg shadow-md p-6 w-sreen' style={{ width: "100%", overflowX: "hidden" }}>
            <h2 className="text-2xl font-semibold mb-4">
                Listado de Usuarios {showInhabilitados ? "Inhabilitados" : "Habilitados"}
            </h2>
            {
                loading ? (
                    <div className='d-flex justify-content-center'>
                        <Spinner variant='success' animation='border' />

                    </div>
                ) : (
                    <>
                        <div className="flex items-center space-x-2 mb-4">

                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder={`Buscar cultivos ...`}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
                                />
                            </div>
                            <button
                                onClick={() => setShowInhabilitados(!showInhabilitados)} // Cambiar el filtro
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center"
                            >
                                {showInhabilitados ? "Ver Habilitados" : "Ver Inhabilitados"}
                            </button>
                        </div>


                        <div className="overflow-x-auto scroll-adside">
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {
                                            ['Nombre', 'Correo', 'Departamento', 'Telefono', 'Acciones']
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
                                            <td className="px-6 py-4  whitespace-normal break-words">{item.nombre_completo || ""}</td>
                                            <>
                                                <td className="px-6 py-4 whitespace-normal break-words">{item.correo}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.departamento || " "}-{item.ciudad || ""}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.telefono || ""}</td>
                                            </>


                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button onClick={() => {
                                                    setModalOpen(true)
                                                    setrowselect(item)

                                                }} className="bg-green-100 text-green-600 hover:bg-green-200 px-3 py-1 rounded-md mr-2">
                                                    Ver mas
                                                </button>
                                                <button className="bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 rounded-md" onClick={() => {
                                                    Swal.fire({
                                                        title: "Estas seguro de inhabilitar este usuario?",
                                                        icon: "warning",
                                                        showCancelButton: true,
                                                        confirmButtonColor: "#3085d6",
                                                        cancelButtonColor: "#d33",
                                                        cancelButtonText: "No,estoy seguro",
                                                        confirmButtonText: "Si,estoy seguro"
                                                    }).then((result) => {
                                                        if (result.isConfirmed) {
                                                            handleUpdate(item.id)
                                                        }
                                                    });
                                                }}>
                                                    {showInhabilitados ? " Habilitar" : " Inhabilitar"}

                                                </button>
                                            </td>
                                        </tr>
                                    )) || <tr><td> <p className='text-center w-100'>No hay  usuarios disponibles</p></td></tr>}
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
                        <ModalUsuario
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
