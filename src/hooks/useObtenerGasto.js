import {useState, useEffect} from 'react';
import {db} from './../firebase/firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const useObtenerGasto = (id) => {
    const navigate = useNavigate();
    const [gasto, cambiarGasto] = useState('');

    useEffect(() => {
        const obtenerGasto = async() => {
            const documento = await getDoc(doc(db, 'gastos', id));

            if(documento.exists){
                cambiarGasto(documento);
            } else {
                navigate('/lista');
            }
        }

        obtenerGasto();
    }, [navigate, id]);
    
    return [gasto];
}
 
export default useObtenerGasto;