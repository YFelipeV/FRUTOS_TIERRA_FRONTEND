import React from 'react'
import useForm from '../../hooks/useForm'
import { reqtsApiForm, setLogin } from '../../config/utils'
import { toast, ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'

export default function Login() {
    const { handleTarget, values, navigate } = useForm({
        correo: "",
        password: ""
    })

    const handleOnsumbit = async (e) => {
        e.preventDefault()
        const res = await reqtsApiForm("v1/auth/signin", "POST", values)
        if (res.status === 200) {
            toast.success("inicio de session exitoso ")
            setLogin(res.token, res.id_usuario)
            return navigate("/dashboard")
        } else {
            toast.error(res && res.message || res.details || "")

        }
    }
    return (
        <>
            <ToastContainer
                position='top-center'
            />
            <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
                <div className="flex-grow flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                        <Link to={"/"}>
                        <h1 className="text-3xl font-bold mb-6 text-center">
                            <span className="text-black">Frutos de mi </span>
                            <span className="text-green-500">Tierra</span>
                        </h1>
                        </Link>
                       
                        <h2 className="text-2xl font-semibold mb-6 text-center">Inicia sesión</h2>
                        <form onSubmit={handleOnsumbit} className="space-y-4">
                            <div>
                                <input
                                    type="email"
                                    name='correo'
                                    placeholder="Email"
                                    value={values.correo}
                                    onChange={handleTarget}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder="Contraseña"
                                    value={values.password}
                                    name='password'
                                    onChange={handleTarget}

                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
                            >
                                Ingresar
                            </button>
                        </form>
                        <p className="mt-4 text-center text-sm text-gray-600">
                            ¿No tienes una cuenta?{' '}
                            <Link to={"/registro"} className="text-green-500 hover:underline">
                                Regístrate
                            </Link>
                        </p>
                        <p className="mt-4 text-center text-xs text-gray-500">
                            Al iniciar sesión o crear una cuenta, aceptas nuestras{' '}
                            <a href="#" className="text-green-500 hover:underline">
                                Políticas de Privacidad
                            </a>{' '}
                            y{' '}
                            <a href="#" className="text-green-500 hover:underline">
                                Términos y Condiciones
                            </a>
                        </p>
                    </div>
                </div>
                <footer className="bg-gray-800 text-white text-center p-4  mt-[20px] mt-auto">
                    <p>&copy; {new Date().getFullYear()} Frutos de mi Tierra. Todos los derechos reservados.</p>
                </footer>
            </div>
        </>

    )
}
