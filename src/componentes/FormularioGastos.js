import React, {useEffect, useState} from 'react';
import {ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton} from './elementos/ElementosDeFormulario';
import Boton from './elementos/Boton';
import {ReactComponent as IconoPlus} from './../imagenes/plus.svg';
import SelectCategorias from './SelectCategorias';
import MyDatePicker from './MyDatePicker';
import agregarGasto from '../firebase/AgregarGasto';
import { useAuth } from '../contextos/AuthContext';
import { getUnixTime } from 'date-fns';
import { fromUnixTime } from 'date-fns';
import Alerta from './elementos/Alerta';
import { useNavigate } from 'react-router-dom';
import editarGasto from '../firebase/editarGasto';

const FormularioGastos = ({gasto}) => {
    const navigate = useNavigate();
    const [inputDescripcion, cambiarInputDescripcion] = useState('');
    const [inputCantidad, cambiarInputCantidad] = useState('');
    const [opcion, cambiarOpcion] = useState('hogar');
    const [fecha, cambiarFecha] = useState(new Date());
    const {usuario} = useAuth();
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});


    useEffect(() => {
        // primero comprobamos si hay un gasto
        // si tenemos algun gasto establecemos el state del gasto
        
        if(gasto){
            // tambien hay que comprobar que el gasto sea del usuario
            // esto lo comprobamos con el uid guardado en el gasto con el uid del usuario
            if(gasto.data().idUsuario === usuario.uid){
                cambiarInputDescripcion(gasto.data().descripcion);
                cambiarInputCantidad(gasto.data().cantidad);
                cambiarOpcion(gasto.data().categoria);
                cambiarFecha(fromUnixTime(gasto.data().fecha));
            } else {
                navigate('/lista');
            }
        }
    }, [gasto, usuario, navigate]);



    const handleInput = (e) => {
        if(e.target.name === 'descripcion'){
            cambiarInputDescripcion(e.target.value);
        } else if(e.target.name === 'cantidad'){
            cambiarInputCantidad(e.target.value.replace(/[^0-9.]/g, ''));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let cantidad = parseFloat(inputCantidad).toFixed(2);

        if(inputDescripcion !== '' && inputCantidad !== ''){
            if(gasto){
                editarGasto({
                    id: gasto.id,
                    descripcion: inputDescripcion,
                    cantidad: cantidad,
                    categoria: opcion,
                    fecha: getUnixTime(fecha)
                })
                .then(() => {
                    navigate('/lista');
                })
                .catch((error) => {
                    console.log(error);
                })
            } else {
                agregarGasto({
                    descripcion: inputDescripcion,
                    cantidad: cantidad,
                    categoria: opcion,
                    fecha: getUnixTime(fecha),
                    idUsuario: usuario.uid
                })
                .then(() => {
                    cambiarInputDescripcion('');
                    cambiarInputCantidad('');
                    cambiarOpcion('hogar');
                    cambiarFecha(new Date());
                    cambiarEstadoAlerta(true);
                    cambiarAlerta({
                        tipo: 'exito',
                        mensaje: 'Gasto agregado exitosamente'
                    });
                })
                .catch((error) => {
                    cambiarEstadoAlerta(true);
                    cambiarAlerta({
                        tipo: 'error',
                        mensaje: 'Ocurrio un error al agregar el gasto'
                    });
                })
            }
        } else {
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Por favor rellena todos los campos'
            });
        }
        
    }

    return (
        <Formulario onSubmit={handleSubmit}>
            <ContenedorFiltros>
                <SelectCategorias opcion={opcion} cambiarOpcion={cambiarOpcion}/>
                <MyDatePicker fecha={fecha} cambiarFecha={cambiarFecha}/>
            </ContenedorFiltros>
            <div>
                <Input 
                    type='text' 
                    name='descripcion' 
                    placeholder='Descripcion'
                    value={inputDescripcion}
                    onChange={handleInput}
                />
                <InputGrande 
                    type='text' 
                    name='cantidad' 
                    placeholder='$0.00'
                    value={inputCantidad}
                    onChange={handleInput}
                />
            </div>
            <ContenedorBoton>
                <Boton as='button' type='submit' primario conIcono>
                    {gasto ? 'Editar Gasto' : 'Agregar Gasto'} <IconoPlus/>
                </Boton>
            </ContenedorBoton>
            <Alerta
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEstadoAlerta={cambiarEstadoAlerta}
            />
        </Formulario>
    );
}
 
export default FormularioGastos;