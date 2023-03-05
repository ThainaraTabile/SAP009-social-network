import firebaseConfig from './firebase-config.js';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// os imports acima são de funções do firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
//const analytics = getAnalytics(app);

// aqui vamos criar as const que autenticar, registrar...

function autenticarUsuario(email,senha) {
    return signInWithEmailAndPassword(auth, email, senha);
}

export {autenticarUsuario}