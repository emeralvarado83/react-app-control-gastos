import React, {useState} from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import {Header, Titulo, ContenedorHeader} from './elementos/Header';
import Boton from './elementos/Boton';
import {Formulario, Input, ContenedorBoton} from './elementos/ElementosDeFormulario';
import {ReactComponent as login} from './../imagenes/login.svg';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from './../firebase/firebaseConfig';
import Alerta from './elementos/Alerta';

const Svg = styled(login)`
    width: 100%;
    max-height: 6.25rem;
    margin-bottom: 1.25rem;
`;

const InicioSesion = () => {
    const navigate = useNavigate();
    const [correo, cambiarCorreo] = useState('');
    const [password, cambiarPassword] = useState('');

    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});

    const handleChange = (e) => {
        e.preventDefault();
        if(e.target.name === 'email'){
            cambiarCorreo(e.target.value);
        } else if(e.target.name === 'password'){
            cambiarPassword(e.target.value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        cambiarEstadoAlerta(false);
        cambiarAlerta({});

        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
        if(!expresionRegular.test(correo)){
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Por favor ingresa un correo valido'
            });
            return;
        }

        if(correo === '' || password === ''){
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Por favor rellena todos los campos'
            });
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, correo, password);
            navigate('/');
        } catch (error) {
            cambiarEstadoAlerta(true);

            let mensaje;
            switch(error.code){
                case 'auth/wrong-password':
                    mensaje = 'La contraseña no es correcta.'
                    break;
                case 'auth/user-not-found':
                    mensaje = 'No existe una cuenta con el correo electrónico proporcionado.'
                break;
                case 'auth/invalid-email':
                    mensaje = 'El correo electrónico no es válido.'
                break;
                default:
                    mensaje = 'Hubo un error al intentar iniciar sesion.'
                break;
            }
            cambiarAlerta({tipo: 'error', mensaje: mensaje});
        }

    }

    return (
        <>
            <Helmet>
                <title>Iniciar Sesion</title>
            </Helmet>
            <Header>
                <ContenedorHeader>
                    <Titulo>Iniciar Sesion</Titulo>
                    <div>
                        <Boton to='/crear-cuenta'>Registrarse</Boton>
                    </div>
                </ContenedorHeader>
            </Header>
            <Formulario onSubmit={handleSubmit}>
                <Svg/>
                <Input 
                    type='email' 
                    name='email' 
                    placeholder='Correo' 
                    value={correo}
                    onChange={handleChange}
                />
                <Input 
                    type='password' 
                    name='password' 
                    placeholder='Contrasena'
                    value={password}
                    onChange={handleChange}
                />
                <ContenedorBoton>
                    <Boton as='button' primario type='submit'>Iniciar Sesion</Boton>
                </ContenedorBoton>
            </Formulario>

            <Alerta
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEstadoAlerta={cambiarEstadoAlerta}
            />
        </>
    );
}
 
export default InicioSesion;