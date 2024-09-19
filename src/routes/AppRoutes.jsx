import React from 'react'
import { Route , Routes } from 'react-router-dom'
import LandingPage from '../pages/ladingPage/LandingPage'
import Store from '../pages/store/Store'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Cultivos from '../pages/dashboard/cultivos/Cultivos'
import Fincas from '../pages/dashboard/fincas/Fincas'
import Dashboard from '../pages/dashboard/Dashboard'
import Profile from '../pages/dashboard/profile/Profile'
import ProductDetail from '../pages/store/ProductDetail'
import Sliders from '../pages/dashboard/sliders/Sliders'
import Usuarios from '../pages/dashboard/usuarios/Usuarios'
import PrivateRoute from './PrivateRoute'



export default function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/store' element={<Store />} />
            <Route path='/product/:id' element={<ProductDetail/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/registro' element={<Register/>} />
            <Route  element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />}>
                <Route  index  element={<Cultivos />} />
                <Route  path="fincas" element={<Fincas />} />
                <Route path="perfil" element={<Profile />} />
                <Route path="carrusel" element={<Sliders />} />
                <Route path="usuarios" element={<Usuarios />} />
            </Route>
            </Route>

        </Routes>
    )
}
