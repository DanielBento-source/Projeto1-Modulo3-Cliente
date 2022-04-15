const baseUrl = "http://localhost:3004/paletas"

async function findAllPaletas() {
    const response = await fetch(`${baseUrl}/all-paletas`)

    const paletas = await response.json();

    paletas.forEach(function (paleta) {
        document.querySelector("#paletaList").insertAdjacentHTML("beforeEnd",
            `
            <div class="PaletaListaItem">
                        <div>
                            <div class="PaletaListaItem__sabor">${paleta.flavor}</div>
                            <div class="PaletaListaItem__preco">R$ ${paleta.price}</div>
                            <div class="PaletaListaItem__descricao">${paleta.description}</div>
                        </div>
                        <img class="PaletaListaItem__foto" src=${paleta.image}
                            alt="Paleta de ${paleta.flavor}" />
            </div>
        `)
    });
}

async function findByIdPaletas() {
    const id = document.querySelector("#idPaleta").value
    const response = await fetch(`${baseUrl}/paleta/${id}`)
    const paleta = await response.json()

    const paletaEscolhidaDiv = document.querySelector('#paletaEscolhida');

    paletaEscolhidaDiv.innerHTML = `<div class="PaletaCardItem">
    <div>
        <div class="PaletaCardItem__sabor">${paleta.flavor}</div>
        <div class="PaletaCardItem__preco">R$ ${paleta.price}</div>
        <div class="PaletaCardItem__descricao">${paleta.description}</div>
    </div>
    <img class="PaletaListaItem__foto" src=${paleta.image}
        alt="Paleta de ${paleta.flavor}" />
</div>`
}


findAllPaletas();

function abrirModalCadastro() {
    document.querySelector(".modal-overlay").style.display = "flex";
}

function fecharModalCadastro() {
    document.querySelector(".modal-overlay").style.display = "none";
}