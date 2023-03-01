//export default () => {
const inputReset = document.querySelector("#clique-esqueceu");
inputReset.addEventListener('click', function () {
    const resetPassaword = document.getElementById('root');
    const template = `
    <button class="btn-voltar"><a href="index.html">Voltar</a></button>
    <div class="tela-principal">
      <div class="logo-tela">
        <img src="./img/logo/logo.png" class="img-logo" alt="logo-dogTips">
      </div>
      <div class="estilo-card">
        <form>
          <label class="label-esqueceu-senha">Para redefinir sua senha, informe o endereço de e-mail cadastrado: </label>
          <div class="input-card">
            <i class="fas fa-envelope"></i>
            <input type="email" id="email" placeholder="E-mail" minlength="4" required />
          </div>
          <button type="submit" class="btn-redefinir-senha">Redefinir senha</button>
      </div>
      </form>
      <p id="msg-redefine-senha"></p>
    </div>
        `
    resetPassaword.innerHTML = template;

    const buttonReset = document.querySelector(".btn-redefinir-senha");
    buttonReset.addEventListener('click', function (e) {
        e.preventDefault();
        const textReset = document.querySelector("#msg-redefine-senha");
        textReset.innerHTML = "Em breve, você receberá um e-mail com todas as instruções para redefinir sua senha."
    }
    );
}
);


//}