import registro from './pages/registro/registro.js';
import login from './pages/login/login.js';
import redefinirSenha from './pages/redefinir-senha/redefinir-senha';
import feed from './pages/feed/feed';
import sobre from './pages/sobre/sobre';
import { verificaUsuarioLogado } from './firebase/firebase.js';
import { redirecionarPagina } from './redirecionar-pagina.js';

const main = document.querySelector('#root');

const init = async () => {
  console.log(`passando pelo init ${window.location.hash}`);
  main.innerHTML = '';
  switch (window.location.hash) {
    case ' ':
      main.appendChild(login());
      break;
    case '#login':
      main.appendChild(login());
      break;
    case '#redefinirSenha':
      main.appendChild(redefinirSenha());
      break;
    case '#registro':
      main.appendChild(registro());
      break;
    case '#sobre':
      main.appendChild(sobre());
      break;
    case '#feed':
      main.appendChild(await feed());
      break;
    default: main.appendChild(login());
      break;
  }
};

window.addEventListener('hashchange', async () => {
  console.log('hash changed');
  await init();
});

window.addEventListener('load', async () => {
  verificaUsuarioLogado(async (user) => {
    if (user) {
      // verifica se usuario ta logado, se tiver ele chama init p/ carregar a pag q está
      await init();
    } else {
      // se nao tiver logado, manda p/ o login
      redirecionarPagina('#login');
    }
  });
});
