import React from 'react';
import { useAuth } from '../contextos/AuthContext';
import { Navigate } from 'react-router-dom';

const RutaPrivada = ({children}) => {
    const {usuario} = useAuth();

    return usuario ? children : <Navigate to='/inicio-sesion'/>;
}

export default RutaPrivada;
