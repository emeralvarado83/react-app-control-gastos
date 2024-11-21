import React from 'react';
import { Helmet } from 'react-helmet';
import {Header, Titulo} from './elementos/Header';
import BtnRegresar from './elementos/BtnRegresar';
import BarraTotalGastado from './BarraTotalGastado';
import FormularioGastos from './FormularioGastos';
import { useParams } from 'react-router-dom';
import useObtenerGasto from '../hooks/useObtenerGasto';

const EditarGasto = () => {
    const {id} = useParams();

    const [gasto] = useObtenerGasto(id);

    console.log(gasto);

    return (
        <>
            <Helmet>
                <title>Editar Gasto</title>
            </Helmet>
            <Header>
                <BtnRegresar ruta='/lista'/>
                <Titulo>Editar Gasto</Titulo>
            </Header>
            <FormularioGastos gasto={gasto}/>
            <BarraTotalGastado/>
        </>
    );
}
 
export default EditarGasto;