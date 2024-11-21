import {db} from './firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

const agregarGasto = ({descripcion, cantidad, categoria, fecha, idUsuario}) => {
    return addDoc(collection(db, 'gastos'), {
        descripcion: descripcion,
        cantidad: Number(cantidad),
        categoria: categoria,
        fecha: fecha,
        idUsuario: idUsuario
    })
}

export default agregarGasto;