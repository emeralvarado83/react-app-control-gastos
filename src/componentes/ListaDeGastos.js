import React from 'react';
import { Helmet } from 'react-helmet';
import {Header, Titulo} from './elementos/Header';
import BtnRegresar from './elementos/BtnRegresar';
import BarraTotalGastado from './BarraTotalGastado';
import UseObtenerGastos from '../hooks/useObtenerGastos';
import { Lista, ElementoLista, Categoria, Descripcion, Valor, Fecha, 
    ContenedorBotones, BotonAccion, BotonCargarMas, ContenedorBotonCentral, ContenedorSubtitulo, Subtitulo } 
    from './elementos/ElementosDeLista';
import IconoCategoria from './elementos/IconoCategoria';
import formatearCantidad from '../funciones/convertirAMoneda';
import {ReactComponent as IconoEditar} from './../imagenes/editar.svg';
import {ReactComponent as IconoBorrar} from './../imagenes/borrar.svg';
import { NavLink } from 'react-router-dom';
import Boton from './elementos/Boton';
import { fromUnixTime, format } from 'date-fns';
import { es } from 'date-fns/locale';
import borrarGasto from '../firebase/borrarGasto';

const ListaDeGastos = () => {
    // Hook que nos provee los gastos, la funcion para obtener mas gastos
    // y el estado para comprobar si hay mas gastos por cargar
    const [gastos, obtenerMasGastos, hayMasPorCargar] = UseObtenerGastos();

    // funcion para formatear la fecha, de formato unixtime a un formato legible
    const formatearFecha = (fecha) => {
        return format(fromUnixTime(fecha), "dd 'de' MMMM 'de' yyyy", {locale: es})
    }

    const fechaEsIgual = (gastos, index, gasto) => {
        if(index !== 0){
            const fechaActual = formatearFecha(gasto.fecha);
            const fechaAnterior = formatearFecha(gastos[index - 1].fecha);

            if(fechaActual === fechaAnterior){
                return true;
            } else {
                return false;
            }
        }
    }

    return (
        <>
            <Helmet>
                <title>Lista de Gastos</title>
            </Helmet>
            <Header>
                <BtnRegresar/>
                <Titulo>Lista de Gastos</Titulo>
            </Header>
            <Lista>
                {gastos.map((gasto, index) => {
                    return(
                        <div key={gasto.id}>
                            {!fechaEsIgual(gastos, index, gasto) && <Fecha>{formatearFecha(gasto.fecha)}</Fecha>}
                        <ElementoLista key={gasto.id}>
                            <Categoria>
                                <IconoCategoria id={gasto.categoria}/>
                                {gasto.categoria}
                            </Categoria>
                            <Descripcion>
                                {gasto.descripcion}
                            </Descripcion>
                            <Valor>
                                {formatearCantidad(gasto.cantidad)}
                            </Valor>
                            <ContenedorBotones>
                                <BotonAccion as={NavLink} to={`/editar/${gasto.id}`}>
                                    <IconoEditar/>
                                </BotonAccion>
                                <BotonAccion onClick={() => borrarGasto(gasto.id)}>
                                    <IconoBorrar/>
                                </BotonAccion>
                            </ContenedorBotones>
                        </ElementoLista>
                        </div>
                    )
                })}

                {hayMasPorCargar && 
                <ContenedorBotonCentral>
                    {/** ejecutamos la funcion para obtener mas gastos **/}
                    <BotonCargarMas onClick={() => obtenerMasGastos()}>Cargar Mas</BotonCargarMas>
                </ContenedorBotonCentral>
                }
                

                {gastos.length === 0 &&
                    <ContenedorSubtitulo>
                        <Subtitulo>No hay gastos por mostrar</Subtitulo>
                        <Boton as={NavLink} to={'/'}>Agregar Gasto</Boton>
                    </ContenedorSubtitulo>
                }
            </Lista>
            <BarraTotalGastado/>
        </>
    );
}
 
export default ListaDeGastos;