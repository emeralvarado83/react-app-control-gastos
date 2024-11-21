import React from 'react';
import { Helmet } from 'react-helmet';
import {Header, Titulo} from './elementos/Header';
import BtnRegresar from './elementos/BtnRegresar';
import BarraTotalGastado from './BarraTotalGastado';
import useObtenerGastosDelMesPorCategoria from '../hooks/useObtenerGastosDelMesPorCategoria';
import {ListaDeCategorias, ElementoListaCategorias, Categoria, Valor} from './elementos/ElementosDeLista';
import IconoCategoria from './elementos/IconoCategoria';
import formatearCantidad from '../funciones/convertirAMoneda';

const GastosPorCategoria = () => {
    const gastos = useObtenerGastosDelMesPorCategoria();
    return (
        <>
            <Helmet>
                <title>Gastos por Categoria</title>
            </Helmet>
            <Header>
                <BtnRegresar/>
                <Titulo>Gastos por Categoria</Titulo>
            </Header>
            <ListaDeCategorias>
                {gastos.map((gasto, index) => {
                    return(
                        <ElementoListaCategorias key={index}>
                            <Categoria>
                                <IconoCategoria nombre={gasto.categoria}/>
                                {gasto.categoria}
                            </Categoria>
                            <Valor>
                                {formatearCantidad(gasto.cantidad)}
                            </Valor>
                        </ElementoListaCategorias>
                    )
                })}
            </ListaDeCategorias>
            <BarraTotalGastado/>
        </>
    );
}
 
export default GastosPorCategoria;