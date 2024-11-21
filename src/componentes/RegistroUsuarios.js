import React, {useState} from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import {Header, Titulo, ContenedorHeader} from './elementos/Header';
import Boton from './elementos/Boton';
import {Formulario, Input, ContenedorBoton} from './elementos/ElementosDeFormulario';
import {ReactComponent as registro} from './../imagenes/registro.svg';
import {auth} from './../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Alerta from './elementos/Alerta';

const Svg = styled(registro)`
    width: 100%;
    max-height: 6.25rem;
    margin-bottom: 1.25rem;
`;

const RegistroUsuarios = () => {
    const navigate = useNavigate();
    const [correo, cambiarCorreo] = useState('');
    const [password, cambiarPassword] = useState('');
    const [password2, cambiarPassword2] = useState('');

    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});

    const handleChange = (e) => {
        e.preventDefault();
        if(e.target.name === 'email'){
            cambiarCorreo(e.target.value);
        } else if(e.target.name === 'password'){
            cambiarPassword(e.target.value);
        } else if(e.target.name === 'password2'){
            cambiarPassword2(e.target.value);
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

        if(correo === '' || password === '' || password2 === ''){
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Por favor rellena todos los campos'
            });
            return;
        }

        if(password !== password2){
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Las contraseñas no son iguales'
            });
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, correo, password);
            navigate('/');
        } catch (error) {
            cambiarEstadoAlerta(true);

            let mensaje;
            switch(error.code){
                case 'auth/invalid-password':
                    mensaje = 'La contraseña tiene que ser de al menos 6 caracteres.'
                    break;
                case 'auth/email-already-in-use':
                    mensaje = 'Ya existe una cuenta con el correo electrónico proporcionado.'
                break;
                case 'auth/invalid-email':
                    mensaje = 'El correo electrónico no es válido.'
                break;
                default:
                    mensaje = 'Hubo un error al intentar crear la cuenta.'
                break;
            }
            cambiarAlerta({tipo: 'error', mensaje: mensaje});
        }

    }

    return (
        <>
            <Helmet>
                <title>Crear Cuenta</title>
            </Helmet>
            <Header>
                <ContenedorHeader>
                    <Titulo>Crear Cuenta</Titulo>
                    <div>
                        <Boton to='/inicio-sesion'>Iniciar Sesion</Boton>
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
                <Input 
                    type='password' 
                    name='password2' 
                    placeholder='Repetir Contrasena'
                    value={password2}
                    onChange={handleChange}
                />
                <ContenedorBoton>
                    <Boton as='button' primario type='submit'>Crear cuenta</Boton>
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
 
export default RegistroUsuarios;