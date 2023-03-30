import {
  initializeApp,
} from 'firebase/app';

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  orderBy,
  query,
} from 'firebase/firestore';

import {
  firebaseConfig,
} from './firebase-config';

// import {
//   redirecionarPagina,
// } from '../redirecionar-pagina';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);
// FIRESTORE
const db = getFirestore(app);

// autenticar usuário
function autenticarUsuario(email, senha) {
  return signInWithEmailAndPassword(auth, email, senha);
}

// registrar novo usuário
async function criarUsuario(email, senha, nomeTutor, nomeCao) {
  await createUserWithEmailAndPassword(auth, email, senha);
  await updateProfile(auth.currentUser, {
    displayName: nomeTutor,
  });

  const usuario = {
    email,
    nomeTutor,
    nomeCao,
  };

  await setDoc(doc(db, 'usuarios', auth.currentUser.uid), usuario);
}

// login com google
async function logarGoogle() {
  await signInWithPopup(auth, provider);
  // Verifica se o usuário que acabou de logar com o google já existe na collection de usuarios.
  // Caso não exista cria o usuário na collection
  const usuario = await getDoc(doc(db, 'usuarios', auth.currentUser.uid));
  if (!usuario.exists()) {
    const usuarioGoogle = {
      email: auth.currentUser.email,
      nomeTutor: auth.currentUser.displayName,
      nomeCao: '',
    };

    await setDoc(doc(db, 'usuarios', auth.currentUser.uid), usuarioGoogle);
    console.log('usuarioCriado');
  }
}

// editar nomeCao login com google
const editarNomeCao = async (novoNomeCao) => {
  await updateDoc(doc(db, 'usuarios', auth.currentUser.uid), {
    nomeCao: novoNomeCao,
  });
};

// redefinir senha
const redefinirSenha = (email) => sendPasswordResetEmail(auth, email);

// criando um post
const criarPost = async (textPost) => {
  const dataCriacao = Date.now();
  const dataAtual = new Date(dataCriacao);
  const dataPostagem = dataAtual.toLocaleDateString();

  const post = {
    author: auth.currentUser.uid,
    nomeTutor: auth.currentUser.displayName,
    texto: textPost,
    likes: [],
    data: dataPostagem,
  };
  const docRef = await addDoc(collection(db, 'posts'), post);
  post.id = docRef.id;
  return post;
};

// o código define uma função que obtém todos os documentos da coleção "posts" do Firestore,
// extrai o valor do campo "texto" de cada documento
// e retorna um array contendo todos os textos dos documentos.
const obterPosts = async () => {
  const textos = [];
  const ordenarPost = query(collection(db, 'posts'), orderBy('data', 'desc'));
  const colecaoPosts = await getDocs(ordenarPost);
  colecaoPosts.forEach((post) => {
    const data = post.data();
    data.id = post.id;
    textos.push(data);
  });
  return textos;
};

// coleta todas as informações do usuário
const obterNomeUsuario = async () => {
  console.log(auth.currentUser);
  const usuarioRef = await getDoc(doc(db, 'usuarios', auth.currentUser.uid));
  console.log(auth.currentUser.uid);
  console.log(usuarioRef);
  const usuario = {
    uid: auth.currentUser.uid,
    displayName: auth.currentUser.displayName,
    email: usuarioRef.data().email,
    nomeTutor: usuarioRef.data().nomeTutor,
    nomeCao: usuarioRef.data().nomeCao,
  };

  return usuario;
};

// ao invés de definir uma função anonimima 'user',
// estamos recebendo a função'verificando'como parametro
const verificaUsuarioLogado = (verificando) => {
  onAuthStateChanged(auth, verificando);
};

// excluir post
const deletarPost = (postId) => {
  const postRef = doc(db, 'posts', postId);
  deleteDoc(postRef);
};

// editar Post
const editarPost = (postId, textPost) => {
  const dataCriacao = Date.now();
  const dataAtual = new Date(dataCriacao);
  const dataPostagem = dataAtual.toLocaleDateString();
  updateDoc(doc(db, 'posts', postId), {
    texto: textPost,
    data: dataPostagem,
  });
};

// curtit post
function curtir(postId, uid) {
  updateDoc(doc(db, 'posts', postId), {
    likes: arrayUnion(uid),
  });
}

// descurtir
function descurtir(postId, uid) {
  updateDoc(doc(db, 'posts', postId), {
    likes: arrayRemove(uid),
  });
}

// opção de sair
const sair = () => signOut(auth);

export {
  autenticarUsuario,
  criarUsuario,
  logarGoogle,
  redefinirSenha,
  criarPost,
  obterPosts,
  obterNomeUsuario,
  verificaUsuarioLogado,
  deletarPost,
  editarPost,
  curtir,
  descurtir,
  sair,
  editarNomeCao,
};
