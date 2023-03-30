export const initializeApp = jest.fn();
export const getAuth = jest.fn();
export const GoogleAuthProvider = jest.fn();
export const signInWithEmailAndPassword = jest.fn();
export const createUserWithEmailAndPassword = jest.fn();
export const signInWithPopup = jest.fn();
export const sendPasswordResetEmail = jest.fn();
export const mockAuth = {
  createUserWithEmailAndPassword: jest.fn(),
  currentUser: {
    uid: 'abc123',
    email: 'teste@teste.com',
    password: '12345678',
    nomeTutor: 'João',
    nomeCao: 'Luigi',
  },
};
export const signOut = jest.fn();
