export default () => {
    const container = document.createElement("div")
    const template = `
    <div class="main">
    <div class="txt-entrar"> 
    <h3>Já possui cadastro?</h3>
     <p class="txt-entrar">Clique no botão abaixo e veja as últimas atualizações dos seus amigos.</p>
     <button class="btn-entrar"><a href="#login">Entrar</a></button>
     <img src="./img/illustrations/good_dogg.png" class="ilustracao-cadastro" alt="ilustração-cadastro">
 </div>
 <div class="tela-principal">
     <div class="logo-tela">
     <img src="./img/logo/logo.png" id="logo" alt="logo-dogTips">
      </div>
      <div class="estilo-card">
     <form>
         <label for="nome-tutor">Nome do tutor:</label>
         <div class="input-card">
             <i class="fas fa-user"></i>
             <input type="text" id="nome-tutor" placeholder="Seu nome" minlength="3" required/>
         </div>
         <label for="nome-cao">Nome do Cão:</label>
         <div class="input-card">
             <i class="fas fa-paw"></i>
             <input type="text" id="nome-cao" placeholder="Nome do cãozinho" minlength="3" required/> 
         </div>
         <label for="email">E-mail:</label>
         <div class="input-card">
             <i class="fas fa-envelope"></i>
             <input type="email" id="email" placeholder="nome@hotmail.com" minlength="4" required/>
         </div>
         <label for="password">Senha:</label>
         <div class="input-card">
             <i class="fas fa-lock"></i>
             <input type="password" id="password" placeholder="******" required/>
         </div>
         <div class="espaço-entrar">
         <button type="submit" value="cadastrar" id="cadastrar" class="btn-cadastrar" onclick="cadastrar()">CADASTRAR</button>
         </div>
         <p class="text-cadastro-google">Ou cadastre-se com o Google</p>
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

