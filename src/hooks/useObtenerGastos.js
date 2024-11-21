import {useState, useEffect} from 'react';
import {db} from './../firebase/firebaseConfig';
import { onSnapshot, collection, query, orderBy, where, limit, startAfter } from 'firebase/firestore';
import { useAuth } from '../contextos/AuthContext';

const UseObtenerGastos = () => {
    const {usuario} = useAuth();
    const [gastos, cambiarGastos] = useState([]);
    const[ultimoGasto, cambiarUltimoGasto] = useState(null);
    const[hayMasPorCargar, cambiarHayMasPorCargar] = useState(false);

    const obtenerMasGastos = () => {
        const consulta = query(
            collection(db, 'gastos'),
            where('idUsuario', '==', usuario.uid),
            orderBy('fecha', 'desc'),
            limit(10),
            startAfter(ultimoGasto)
        );

        onSnapshot(consulta, (snapshot) => {
            if(snapshot.docs.length > 0){
                cambiarUltimoGasto(snapshot.docs[snapshot.docs.length - 1]);

                cambiarGastos(gastos.concat(snapshot.docs.map((gasto) => {
                    return {...gasto.data(), id: gasto.id}
                })))
            } else {
                cambiarHayMasPorCargar(false);
            }
        }, error => {console.log(error)})
    }

    useEffect(() => {
        const consulta = query(
            collection(db, 'gastos'),
            where('idUsuario', '==', usuario.uid),
            orderBy('fecha', 'desc'),
            limit(10)
        );

        const unsuscribe = onSnapshot(consulta, (snapshot) => {
            if(snapshot.docs.length > 0){
                cambiarUltimoGasto(snapshot.docs[snapshot.docs.length - 1]);
                cambiarHayMasPorCargar(true);
            } else {
                cambiarHayMasPorCargar(false);
            }
            cambiarGastos(snapshot.docs.map((gasto) => {
                return {...gasto.data(), id: gasto.id}
            }))
        });

        return unsuscribe;

    }, [usuario]);

    return [gastos, obtenerMasGastos, hayMasPorCargar];
}
 
export default UseObtenerGastos;