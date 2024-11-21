import {db} from './firebaseConfig';
import { updateDoc, doc } from 'firebase/firestore';

const editarGasto = async ({id, descripcion, cantidad, categoria, fecha}) => {
    return await updateDoc(doc(db, 'gastos', id), {
        descripcion: descripcion,
        cantidad: Number(cantidad),
        categoria: categoria,
        fecha: fecha,
    })
}

export default editarGasto;