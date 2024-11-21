import React from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import Inicio from './componentes/Inicio';
import ListaDeGastos from './componentes/ListaDeGastos';
import GastosPorCategoria from './componentes/GastosPorCategoria';
import EditarGasto from './componentes/EditarGasto';
import InicioSesion from './componentes/InicioSesion';
import RegistroUsuarios from './componentes/RegistroUsuarios';
import { Helmet } from 'react-helmet';
import favicon from './imagenes/logo.png';
import { AuthProvider } from './contextos/AuthContext';
import RutaPrivada from './componentes/RutaPrivada';
import { TotalGastadoProvider } from './contextos/TotalGastadoDelMesContext';

const App = () => {
  return (
    <>
      <Helmet>
        <link rel='shortcut icon' href={favicon} type='image/x-icon'/>
      </Helmet>
      <AuthProvider>
        <TotalGastadoProvider>
        <Contenedor>
          <Routes>
            <Route path='/inicio-sesion' element={<InicioSesion/>}/>
            <Route path='/crear-cuenta' element={<RegistroUsuarios/>}/>

            <Route path='/' element={<RutaPrivada><Inicio/></RutaPrivada>} />
            <Route path='/lista' element={<RutaPrivada><ListaDeGastos/></RutaPrivada>} />
            <Route path='/categorias' element={<RutaPrivada><GastosPorCategoria/></RutaPrivada>} />
            <Route path='/editar/:id' element={<RutaPrivada><EditarGasto/></RutaPrivada>} />

            {/* <Route path='/' element={<Inicio/>}/>
            <Route path='/lista' element={<ListaDeGastos/>}/>
            <Route path='/categorias' element={<GastosPorCategoria/>}/>
            <Route path='/editar/:id' element={<EditarGasto/>}/>*/}
            
          </Routes>
        </Contenedor>
        </TotalGastadoProvider>
      </AuthProvider>
      <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio='none'>
        <path fillOpacity="1" d="M0,32L48,32C96,32,192,32,288,69.3C384,107,480,181,576,186.7C672,192,768,128,864,85.3C960,43,1056,21,1152,26.7C1248,32,1344,64,1392,80L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </Svg>
    </>
    
  );
}

const Contenedor = styled.div`
    background: #fff;
    width: 90%;
    max-width: 70rem; /*1110px*/
    height: 90vh;
    max-height: 50rem;  /* 800px */
    overflow-y: auto;
    box-shadow: 0px 1.25rem 2.5rem rgba(0,0,0,.05);
    border-radius: 0.625rem; /* 10px */
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    z-index: 100;
 
    @media(max-width: 60rem){ /* 950px */
        height: 95vh;
        max-height: none;
    }
`;

const Svg = styled.svg`
    height: 50vh;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 0;
    path {
        fill: rgba(135,182,194, .15);
    }
`;
 
export default App;
