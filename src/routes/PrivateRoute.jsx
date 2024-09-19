import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

// Función que verifica si el token es válido y no ha expirado
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;


  try {
    const decoded = jwtDecode(token); // Decodifica el token
   

    const currentTime = Date.now() / 1000; // Obtener el tiempo actual en segundos
    
    // Verificar si el token ha expirado
    if (decoded.exp && decoded.exp < currentTime) {
      localStorage.removeItem('token'); // Elimina el token si ha expirado
      return false;
    }

    return true; // El token es válido
  } catch (error) {
    // Si hay un error al decodificar (token inválido), retorna false
    return false;
  }
};

// Componente PrivateRoute
const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
