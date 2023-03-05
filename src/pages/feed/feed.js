export default () => {
    const container = document.createElement("div")
    const template = `
        <div class="main">
            <div class="txt-novo-usuario"> 
                <h3>Primeira vez aqui?</h3>
                </div>
                </div>
                `
                container.innerHTML = template;

                return container; 
            }
