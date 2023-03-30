import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  getAuth,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  // getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  // getDocs,
  db,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';

import {
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
} from '../src/firebase/firebase';

import { redirecionarPagina } from '../src/redirecionar-pagina';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    currentUser: {
      uid: '5555',
      displayName: 'Usuário de teste',
    },
  })),
  GoogleAuthProvider: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithPopup: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  updateProfile: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  deleteDoc: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn(),
  arrayUnion: jest.fn(),
  arrayRemove: jest.fn(),
  setDoc: jest.fn(),
  signOut: jest.fn(),
  addDoc: jest.fn(),
  collection: jest.fn(),
  getDocs: jest.fn(),
  db: jest.fn(),
  getDoc: jest.fn(),
  orderBy: jest.fn(),
  query: jest.fn(),
}));

describe('firebase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // função de autenticarUsuario
  describe('autenticarUsuario', () => {
    it('deve ser uma função', () => {
      expect(typeof autenticarUsuario).toBe('function');
    });
    it('autentica dados do login e libera a página do feed ', async () => {
      signInWithEmailAndPassword.mockResolvedValue();
      await autenticarUsuario('teste@teste.com', '123456');
      expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    });
  });

  // função de criar usuário

  describe('criarUsuario', () => {
    it('a função deve criar uma conta de usuário utilizando o seu nome, email e senha', async () => {
      createUserWithEmailAndPassword.mockResolvedValueOnce();

      const email = 'teste@teste.com';
      const senha = '12345678';
      const nomeTutor = 'João';
      const nomeCao = 'Luigi';
      await criarUsuario(email, senha, nomeTutor, nomeCao);

      expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(getAuth(), email, senha);
      expect(updateProfile).toHaveBeenCalledTimes(1);
      expect(updateProfile).toHaveBeenCalledWith(getAuth().currentUser, { displayName: nomeTutor });
    });
  });

  // logar com o google
  describe('logarGoogle', () => {
    it('deve logar usuário com a sua conta google e criar usuário na coleção se não existir', async () => {
      // mock da função getDoc que retorna um usuário que não existe na coleção
      getDoc.mockResolvedValue({ exists: () => false });

      signInWithPopup.mockResolvedValue();
      setDoc.mockResolvedValue();

      await logarGoogle();

      expect(signInWithPopup).toHaveBeenCalledTimes(1);
      expect(getDoc).toHaveBeenCalledTimes(1);
      expect(getDoc).toHaveBeenCalledWith(doc(db, 'usuarios', getAuth().currentUser.uid));
      expect(setDoc).toHaveBeenCalledTimes(1);
    });
  });

  // redefinir senha
  describe('redefinirSenha', () => {
    it('a função deve logar usuário com a sua conta google', () => {
      sendPasswordResetEmail.mockResolvedValue();
      redefinirSenha();
      expect(sendPasswordResetEmail).toHaveBeenCalledTimes(1);
    });
  });

  // criarPost
  it('deve criar um post e guardar na coleção', async () => {
    addDoc.mockResolvedValueOnce({ id: '1234' });
    const mockCollection = 'collection';
    collection.mockReturnValueOnce(mockCollection);

    const texto = 'postagem teste';
    const dataPostagem = new Date(Date.now()).toLocaleDateString();

    const post = {
      author: getAuth().currentUser.uid,
      data: dataPostagem,
      nomeTutor: getAuth().currentUser.displayName,
      texto,
      likes: [],
      id: '1234',
    };

    await criarPost(texto);

    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(addDoc).toHaveBeenCalledWith(mockCollection, post);
    expect(collection).toHaveBeenCalledTimes(1);
    await expect(collection).toHaveBeenCalledWith(undefined, 'posts');
  });
  // obter post
  describe('obterPosts', () => {
    it('deve retornar um array de posts', async () => {
      getDocs.mockResolvedValue([
        {
          id: 'PwGTKDq5TzR072lIieVOUCEtwcP2',
          data: () => ({ texto: 'Post 1', data: new Date(2023, 3, 15) }),
        },
        {
          id: 'Ii0jdAZ99BUQIpW9sCRNKavigUR2',
          data: () => ({ texto: 'Post 2', data: new Date(2023, 3, 14) }),
        },
      ]);
      const posts = await obterPosts();
      expect(posts).toEqual([
        { id: 'PwGTKDq5TzR072lIieVOUCEtwcP2', texto: 'Post 1', data: new Date(2023, 3, 15) },
        { id: 'Ii0jdAZ99BUQIpW9sCRNKavigUR2', texto: 'Post 2', data: new Date(2023, 3, 14) },
      ]);
      expect(getDocs).toHaveBeenCalledWith(query(collection(db, 'posts'), orderBy('data', 'desc')));
    });
  });

  // obterNomeUsuario

  // verificaUsuarioLogado
  describe('verificarUsuarioLogado', () => {
    it('deve redirecionar para o feed se o usuário estiver logado', () => {
      onAuthStateChanged.mockResolvedValue();
      verificaUsuarioLogado();
      expect(onAuthStateChanged).toHaveBeenCalledTimes(1);
    });
  });

  // botão de deletar
  describe('deletarPost', () => {
    it('deve ser uma função', () => {
      expect(typeof deletarPost).toBe('function');
    });
    it('a função deve deletar uma publicação a partir do id do usuário', () => {
      const mockPostRef = {};
      const mockPostColecao = {
        posts: {
          postId: '1234',
        },
      };

      doc.mockReturnValueOnce(mockPostRef);
      deleteDoc.mockResolvedValueOnce(mockPostRef);

      deletarPost(mockPostColecao.posts.postId);

      expect(doc).toHaveBeenCalledTimes(1);
      expect(doc).toHaveBeenCalledWith(undefined, 'posts', mockPostColecao.posts.postId);
      expect(deleteDoc).toHaveBeenCalledTimes(1);
      expect(deleteDoc).toHaveBeenCalledWith(mockPostRef);
    });
  });

  // editar
  describe('editarPost', () => {
    it('deve ser uma função', () => {
      expect(typeof editarPost).toBe('function');
    });
    it('a função deve editar uma publicação', () => {
      const userId = 'id do usuario';
      const postParaSerEditado = 'texto a ser editado';
      const dataPostagem = new Date(Date.now()).toLocaleDateString();
      updateDoc.mockResolvedValue();
      editarPost(userId, postParaSerEditado);
      expect(doc).toHaveBeenCalledTimes(1);
      expect(doc).toHaveBeenCalledWith(undefined, 'posts', userId);
      expect(updateDoc).toHaveBeenCalledTimes(1);
      expect(updateDoc).toHaveBeenCalledWith(undefined, {
        texto: postParaSerEditado,
        data: dataPostagem,
      });
    });
  });

  // botão de curtir
  describe('curtir', () => {
    it('deve ser uma função', () => {
      expect(typeof curtir).toBe('function');
    });
    it('a função deve adicionar uma curtida no post', () => {
      curtir('testIdPost', 'testUserName');
      expect(arrayUnion).toHaveBeenCalledTimes(1);
      expect(arrayUnion).toHaveBeenCalledWith('testUserName');
      expect(updateDoc).toHaveBeenCalledTimes(1);
      expect(updateDoc).toHaveBeenCalledWith(undefined, { likes: undefined });
    });
  });

  // descurtir
  describe('descurtir', () => {
    it('deve ser uma função', () => {
      expect(typeof descurtir).toBe('function');
    });
    it('a função deve remover a curtida de um post', () => {
      descurtir('testIdPost', 'testUserName');
      expect(arrayRemove).toHaveBeenCalledTimes(1);
      expect(arrayRemove).toHaveBeenCalledWith('testUserName');
      expect(updateDoc).toHaveBeenCalledTimes(1);
      expect(updateDoc).toHaveBeenCalledWith(undefined, { likes: undefined });
    });
  });

  // sair

  describe('sair', () => {
    it(' a função deve deslogar o usuario', () => {
      signOut.mockResolvedValue({
        user: {},
      });
      sair();
      expect(signOut).toHaveBeenCalledTimes(1);
    });
  });

  // editar nome do cão

  describe('editarNomeCao', () => {
    it('deve atualizar o nome do cachorro no banco de dados', async () => {
      // definir o novo nome do cachorro
      const novoNomeCao = 'Bolinha';

      // definir o documento a ser atualizado
      const documento = doc(db, 'usuarios', getAuth().currentUser.uid);

      // chamar a função editarNomeCao
      await editarNomeCao(novoNomeCao);

      // verificar se a função updateDoc foi chamada com os argumentos corretos
      expect(updateDoc).toHaveBeenCalledWith(documento, {
        nomeCao: novoNomeCao,
      });
    });
  });

  // obter nome usuário
  describe('obterNomeUsuario', () => {
    it('deve retornar um objeto com as informações do usuário', async () => {
      const uid = '5555';
      const displayName = 'Usuário de teste';
      const email = 'usuario123@example.com';
      const nomeTutor = 'Tutor do Cão';
      const nomeCao = 'Rex';
      getDoc.mockReturnValue({
        data: jest.fn().mockReturnValue({
          email,
          nomeTutor,
          nomeCao,
        }),
      });

      const resultado = await obterNomeUsuario();
      expect(resultado).toEqual({
        uid,
        displayName,
        email,
        nomeTutor,
        nomeCao,
      });
    });
  });
});

// redirecionarPagina
const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const dom = new JSDOM('<!doctype html><html><body></body></html>');

global.window = dom.window;
global.document = dom.window.document;

describe('redirecionarPagina', () => {
  it('deve redirecionar para a página correta', () => {
    redirecionarPagina('#pagina');
    expect(window.location.hash).toEqual('#pagina');
  });
});
