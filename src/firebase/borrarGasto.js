import { db } from "./firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";

const borrarGasto = async (id) => {
    await deleteDoc(doc(db, 'gastos', id))
}

export default borrarGasto;