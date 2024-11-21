import { useState, useEffect } from "react";
import {db} from './../firebase/firebaseConfig';
import { onSnapshot, query, collection, orderBy, where } from "firebase/firestore";
import { startOfMonth, endOfMonth, getUnixTime } from "date-fns";
import { useAuth } from "../contextos/AuthContext";

const useObtenerGastosDelMes = () => {
    const [gastos, cambiarGastos] = useState([]);
    const {usuario} = useAuth();
    
    useEffect(() => {
        const inicioDeMes = getUnixTime(startOfMonth(new Date()));
        const finDeMes = getUnixTime(endOfMonth(new Date()));

        // comprobamos si hay un usuario logeado para obtener sus gastos del mes
        if(usuario){
            // realizamos la consulta a la base de datos
            const consulta = query(
                collection(db, 'gastos'),
                orderBy('fecha', 'desc'),
                where('fecha', '>=', inicioDeMes),
                where('fecha', '<=', finDeMes),
                where('idUsuario', '==', usuario.uid),
            );

            // usamos onsnapshot para establecer los gastos del estado
            const unsuscribe = onSnapshot(consulta, (snapshot) => {
                cambiarGastos(snapshot.docs.map((documento) => {
                    return {...documento.data(), id: documento.id}
                }))
            }, (error) => {console.log(error)})

            return unsuscribe;
        }

    }, [usuario]);

    return gastos;
}
 
export default useObtenerGastosDelMes;