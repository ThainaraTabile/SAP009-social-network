export default () => {
    const container = document.createElement("div")
    const template = `
        <div class="main">
            <div class="txt-novo-usuario"> 
                <h3>Primeira vez aqui?</h3>
                <p class="txt-novo-usuario">Participe da nossa comunidade, cadastre seu cão e compartilhe 
                experiências! Você poderá seguir todos seus amigos e fazer novos. 
                Além de registrar a vida do seu cão, você poderá acompanhar 
                a vida de outros cãezinhos e interagir nas publicações. </p>
                <a href="#register">
                    <button class="btn-registrar">registre-se</button>
                </a>
                <img src="./img/illustrations/social_update.png" class="ilustracao-login" alt="ilustração-login">
            </div>
            <div class="tela-principal">
                <div class="logo-tela">
                    <img src="./img/logo/logo.png" class="img-logo" alt="logo-dogTips">
                </div>
                <div class="estilo-card">
                    <form>
                        <label for="email">E-mail:</label>
                        <div class="input-card">
                            <i class="fas fa-envelope"></i>
                            <input type="email" id="email" placeholder="nome@hotmail.com" minlength="4" required />
                        </div>
                        <label for="password">Senha:</label>
                        <div class="input-card">
                            <i class="fas fa-lock"></i>
                            <input type="password" id="password" placeholder="******" required/>
                        </div>
                        <p class="texto-centralizado"> Esqueceu sua senha?</p> 
                        <p class="texto-centralizado"><a href="#reset"id="clique-esqueceu">Clique aqui!</a></p>
                        <div class="espaço-acessar">
                            <button class="btn-acessar">ACESSAR</button>
                        </div>
                        <p class="texto-centralizado">Ou faça login com o Google</p>
                        <div class="cadastro-google"> 
                            <a href="#" id="register-google" class="icon-google">
                            <i class="fa-brands fa-google"></i>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    ` 
    container.innerHTML = template;

    return container; 
}
