import React, {useState, useEffect, useContext} from 'react';
import { auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = React.createContext();

const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({children}) => {
    const [usuario, cambiarUsuario] = useState();
    // creamos un estado para saber cuando termina la comprobacion de onAuthStateChanged
    const [comprobando, cambiarComprobando] = useState(true);

    // efecto para ejecutar la comprobacion una sola vez
    useEffect(() => {
        const cancelarSuscripcion = onAuthStateChanged(auth, (usuario) => {
            cambiarUsuario(usuario);
            cambiarComprobando(false);
        });

        // cancelamos la suscripcion cuando cerramos sesion
        return cancelarSuscripcion;
    }, []);

    return (
        <AuthContext.Provider value={{usuario: usuario}}>
            {!comprobando && children}
        </AuthContext.Provider>
    );
}
 
export {AuthProvider, AuthContext, useAuth};