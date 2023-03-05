import firebaseConfig from './firebase-config.js';
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// aqui vamos criar as const que autenticar, registrar...