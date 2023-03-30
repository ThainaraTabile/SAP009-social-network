import {
  criarPost,
  obterPosts,
  obterNomeUsuario,
  deletarPost,
  editarPost,
  curtir,
  descurtir,
  sair,
  editarNomeCao,
} from '../../firebase/firebase';
import { redirecionarPagina } from '../../redirecionar-pagina';

import ilustracaoLogo from '../../img/logo/logo.png';
import coracaoDeslike from '../../img/icones-feed/like-pata-3.png';
import coracaoPreenchido from '../../img/icones-feed/like-pata-2.png';

export default async () => {
  const usuarioLogado = await obterNomeUsuario();
  const container = document.createElement('div');
  // TESTAR a limpeza do container
  const template = `
    <div class="feed-desktop>"
        <div class="main">
            <div class="barra-feed">
                <i class="fa-solid fa-bars fa-2x icon-menu" id="burguer"></i>
                <menu id="itens">
                    <ul>
                        <li class="barra-itens"><a href="#">feed</a></li>
                        <li class="barra-itens"><a href="#sobre">sobre</a></li>
                        <li class="barra-itens"><a id="btnSair" class="btn-sair"type="button">sair</a></li>
                    </ul>
                </menu>
                <div class="info-usuario">
                <h2>Seja bem-vindo(a)!</h2>
                <div class="perfil">
                    <div class="tutor">
                        <i class="fa-solid fa-circle-user fa-3x icon-usuário"></i>
                        <p class="texto-feed">@${usuarioLogado.displayName}</p>
                    </div>
                    <div class="cao">
                        <i class="fa-solid fa-paw fa-3x icon-cão"></i>
                        <p class="texto-feed" id="cadastro-cao">@${usuarioLogado.nomeCao}</p>
                        <div class="input-nome-cao"></div>
                    </div>
                </div>    
                </div>
            </div>
                <div class="tela-principal">
                    <div class="logo-tela-feed">
                        <img src="${ilustracaoLogo}" class="img-logo-feed" alt="logo-dogTips">
                    </div>
                    <div class="div-postagem-tutor">
                        <textarea class="texto-tutor" id="texto-tutor"name="texto-tutor" cols="50" rows="4" placeholder="O que gostaria de compartilhar?"></textarea>
                        <button class="btn-publicar" id="btn-publicar">publicar</button>
                    </div>
                        <span id="alerta-publicacao" class="alerta-publicacao"></span>
                        </div>
                        <div id="postagens" class="postagens"></div>
                </div>
        </div>
    </div>
        `;
  container.innerHTML = template;

  const iconeMenu = container.querySelector('#burguer');
  iconeMenu.addEventListener('click', () => {
    const itens = container.querySelector('#itens');
    if (itens.style.display === 'block') {
      itens.style.display = 'none';
    } else {
      itens.style.display = 'block';
    }
  });

  if (usuarioLogado.nomeCao === '') {
    const divInptNomeCao = container.querySelector('.input-nome-cao');
    divInptNomeCao.innerHTML = ` <input type="text" class="nome-cao" id="nome-cao" placeholder=" insira o nome do cão">
    <button class="btn-salvar-nome-cao" id="btn-salvar-nome-cao">salvar</button>`;

    const salvarBtn = divInptNomeCao.querySelector('.btn-salvar-nome-cao');
    salvarBtn.addEventListener('click', async () => {
      const novoNomeCao = divInptNomeCao.querySelector('#nome-cao').value;
      await editarNomeCao(novoNomeCao);
      container.querySelector('#cadastro-cao').textContent = `@${novoNomeCao}`;
      divInptNomeCao.setAttribute('style', 'display: none');
    });
  }

  const exibirPost = (post) => {
    const posts = document.querySelector('#postagens');
    const containerPost = document.createElement('div');
    const templatePost = `
          <div class="div-postagem-anteriores-tutor">
            <div id="icone-superiores">
              <i class="fa-solid fa-circle-user fa-2x icon-usuario-txt"></i>
              <p class="tutor-txt-area">${post.nomeTutor}</p>
              <p class="data-postagem">${post.data}</p>
            </div>
            <textarea class="texto-tutor-postado" id="texto-tutor-postado" style='resize:none' disabled>${post.texto}</textarea>
            <div id="icones-inferiores">
              <button class="btn-curtir" id="btn-curtir" >
              <img ${post.likes.includes(usuarioLogado.uid) ? `src="${coracaoPreenchido}"` : `src="${coracaoDeslike}"`}>  ${post.likes.length}
              </button>
              <p class="numero-curtidas"></p>
              ${post.author === usuarioLogado.uid ? `
              <button class="btn-editar">
              <i class="fa-sharp fa-solid fa-pencil" id="btn-editar" type="button"></i>
              </button>
              ` : ''}
              ${post.author === usuarioLogado.uid ? `
                <button class="btn-deletar">
                  <i class="fa-solid fa-trash-can" id="btn-deletar" type="button"></i>
                </button>
              ` : ''}
            <div class="caixa-deletar" id="caixa-deletar-${post.id}">
                <div class="modal">
                    <p class="txt-excluir">Tem certeza que deseja excluir?</p>
                    <div class="btn-caixa">
                        <button class="btn-excluir" id='btn-excluir'>Excluir</button>
                        <button class="btn-cancelar" id="btn-cancelar">Cancelar</button>
                    </div>
                </div>
            </div>
          </div>
        `;
    containerPost.innerHTML = templatePost;
    posts.appendChild(containerPost);

    if (post.author === usuarioLogado.uid) {
      const btnDeletar = containerPost.querySelector('#btn-deletar');
      btnDeletar.addEventListener('click', () => {
        const modal = document.getElementById(`caixa-deletar-${post.id}`);
        modal.style.display = 'block';

        const btnCancelar = modal.querySelector('#btn-cancelar');
        btnCancelar.addEventListener('click', () => {
          modal.style.display = 'none';
        });

        const btnExcluir = modal.querySelector('#btn-excluir');
        btnExcluir.addEventListener('click', () => {
          deletarPost(post.id);
          containerPost.remove();
          modal.style.display = 'none';
        });
      });
    }

    if (post.author === usuarioLogado.uid) {
      const btnEditar = containerPost.querySelector('#btn-editar');
      btnEditar.addEventListener('click', (e) => {
        const textArea = containerPost.querySelector('#texto-tutor-postado');
        textArea.removeAttribute('disabled');
        btnEditar.removeEventListener('click', e);
        btnEditar.addEventListener('click', () => {
          textArea.setAttribute('disabled', 'true');
          editarPost(post.id, textArea.value);
        });
      });
    }

    const btnCurtir = containerPost.querySelector('#btn-curtir');
    btnCurtir.addEventListener('click', () => {
      if (post.likes.includes(usuarioLogado.uid)) {
        descurtir(post.id, usuarioLogado.uid);
        post.likes.splice(post.likes.indexOf(usuarioLogado.uid));
        btnCurtir.innerHTML = `<img class='btn-curtir' src='${coracaoDeslike}' alt='descurtir'><p class='numero-curtidas'>${post.likes.length}</p>`;
      } else {
        curtir(post.id, usuarioLogado.uid);
        post.likes.push(usuarioLogado.uid);
        btnCurtir.innerHTML = `<img class='btn-curtir' src='${coracaoPreenchido}' alt='curtido'><p class='numero-curtidas'>${post.likes.length}</p>`;
      }
      btnCurtir.querySelector('p').innerText = post.likes.length;
    });
  };
  // limpar a parte das postagens antes de chamar a função obterPosts
  obterPosts().then((posts) => {
    posts.innerHTML = '';
    posts.forEach((post) => exibirPost(post));
  });

  const btnPublicar = container.querySelector('#btn-publicar');
  const alertaPublicacao = container.querySelector('#alerta-publicacao');
  btnPublicar.addEventListener('click', async () => {
    const textoTutor = container.querySelector('#texto-tutor');
    const textPost = textoTutor.value;

    if (textPost !== '') {
      try {
        const novoPost = await criarPost(textPost);
        // espera o criarPost e dps exibe o post
        exibirPost(novoPost);
        textoTutor.value = '';
      } catch (error) {
        alertaPublicacao.setAttribute('style', 'display: block');
        alertaPublicacao.innerHTML = 'Ocorreu um erro, tente novamente.';
      }
    } else {
      alertaPublicacao.setAttribute('style', 'display: block');
      alertaPublicacao.innerHTML = 'Por favor, escreva algo antes de publicar!';
    }
  });

  const btnSair = container.querySelector('#btnSair');
  btnSair.addEventListener('click', () => {
    sair()
      .then(() => {
        redirecionarPagina('#login');
      })
      .catch(() => {
        redirecionarPagina('#feed');
      });
  });

  return container;
};
