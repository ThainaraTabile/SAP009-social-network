import { criarUsuario, logarGoogle } from '../../firebase/firebase';
import { redirecionarPagina } from '../../redirecionar-pagina';
import ilustracaoLogo from '../../img/logo/logo.png';
import ilustracaoRegistro from '../../img/illustrations/good_dogg.png';

export default () => {
  const container = document.createElement('div');
  const template = `
        <div class="main">
            <div class="txt-entrar"> 
                <h3>Já possui cadastro?</h3>
                <p class="txt-entrar">Clique no botão abaixo e veja as últimas atualizações dos seus amigos.</p>
                <button class="btn-entrar"><a href="#login">Entrar</a></button>
                <img src="${ilustracaoRegistro}" class="ilustracao-cadastro" alt="ilustração-cadastro">
            </div>
            <div class="tela-principal">
                <div class="logo-tela">
                    <img src="${ilustracaoLogo}" id="logo" alt="logo-dogTips">
                </div>
                <div class="estilo-card">
                    <form>
                        <div class="input-card">
                            <i class="fas fa-user"></i>
                            <label for="nometutor">
                                <input type="text" id="nometutor" placeholder="Seu nome" minlength="3" required/>
                            </label>
                        </div>
                        <div class="input-card">
                            <i class="fas fa-paw"></i>
                            <label for="nomecao">
                                <input type="text" id="nomecao" placeholder="Nome do cãozinho" minlength="3" required/> 
                            </label>
                        </div>
                        <div class="input-card">
                            <i class="fas fa-envelope"></i>
                            <label for="email">
                                <input type="email" id="email" placeholder="nome@dominio.com" minlength="4" required/>
                            </label>
                        </div>
                        <div class="input-card">
                            <i class="fas fa-lock"></i>
                            <label for="senha">
                                <input type="password" id="senha" placeholder="••••••" minlength="6" required/>
                            </label>
                        </div>
                        <div class="espaço-entrar">
                            <button type="submit" value="cadastrar" id="cadastrar" class="btn-cadastrar">CADASTRAR</button>
                        </div>
                        <p id="txtAlert" class="mensagem-vazia"><p>
                        <p class="text-cadastro-google">Ou cadastre-se com o Google</p>
                        <div class="cadastro-google"> 
                            <a href="#registro" id="registro-google" class="icon-google">
                                <i class="fa-brands fa-google"></i>
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        `;
  container.innerHTML = template;

  const btnCadastrar = container.querySelector('#cadastrar');
  btnCadastrar.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const senha = document.querySelector('#senha').value;
    const nomeCao = document.querySelector('#nomecao').value;
    const nomeTutor = document.querySelector('#nometutor').value;

    if (!email || !senha || !nomeCao || !nomeTutor) {
      // exibe uma mensagem de erro
      const msgCampoVazio = container.querySelector('#txtAlert');
      msgCampoVazio.innerHTML = 'Preencha todos os campos!';
    }

    criarUsuario(email, senha, nomeTutor, nomeCao)
      .then(() => {
        redirecionarPagina('#feed');
      })
      .catch((error) => {
        console.log(error);

        const emailCadastrado = container.querySelector('#txtAlert');

        if (error.code === 'auth/email-already-in-use') {
          emailCadastrado.innerHTML = 'Esse e-mail já está registrado!';
        }
      });
  });

  const selecionarGoogle = container.querySelector('#registro-google');
  selecionarGoogle.addEventListener('click', async () => {
    await logarGoogle();
    redirecionarPagina('#feed');
  });

  return container;
};
