import register from "./pages/register/register.js";
import login from "./pages/login/login.js";
import reset from "./pages/reset-password/reset-login";
import feed from "./pages/feed/feed";

const main = document.querySelector("#root")
const init = () => {
    window.addEventListener("hashchange", () => {
        main.innerHTML = "";
        switch (window.location.hash) {
            case " ":
                main.appendChild(login());
                break;
            case "#login":
                main.appendChild(login());
                break;
            case "#reset":
                main.appendChild(reset());
                break;
            case "#register":
                main.appendChild(register());
                break;
            case "#feed":
            main.appendChild(feed());    
        }
    })
}

window.addEventListener("load", () => {
    main.appendChild(login());
    init()
})
// para requisitar preenchimento de dados corretos no input
const camposDoFormulario = document.querySelectorAll("[required]");
camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
});

function verificaCampo(campo) {

}

