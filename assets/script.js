const baseURL = "http://localhost:3004/paletas";

async function findAllPaletas() {
    const response = await fetch(`${baseURL}/all-paletas`);

    const paletas = await response.json();

    paletas.forEach(function (paleta) {
        document.querySelector("#paletaList").insertAdjacentHTML(
            "beforeend",
            `
    <div class="PaletaListaItem">
        <div>
            <div class="PaletaListaItem__sabor">${paleta.sabor}</div>
            <div class="PaletaListaItem__preco">R$ ${paleta.preco}</div>
            <div class="PaletaListaItem__descricao">${paleta.descricao}</div>
        </div>
        <img class="PaletaListaItem__foto" src="${paleta.foto}" alt="Paleta de ${paleta.sabor}" />
    </div>
    `
        );
    });
}

async function findByIdPaletas() {
    const id = document.querySelector("#idPaleta").value;

    const response = await fetch(`${baseURL}/paleta/${id}`);
    const paleta = await response.json();

    const paletaEscolhidaDiv = document.querySelector("#paletaEscolhida");

    paletaEscolhidaDiv.innerHTML = `
  <div class="PaletaCardItem">
  <div>
      <div class="PaletaCardItem__sabor">${paleta.sabor}</div>
      <div class="PaletaCardItem__preco">R$ ${paleta.preco}</div>
      <div class="PaletaCardItem__descricao">${paleta.descricao}</div>
  </div>
  <img class="PaletaCardItem__foto" src="${paleta.foto}" alt="Paleta de ${paleta.sabor}" />
</div>`;
}

findAllPaletas();

function abrirModalCadastro() {
    document.querySelector(".modal-overlay").style.display = "flex";
}

function fecharModalCadastro() {
    document.querySelector(".modal-overlay").style.display = "none";

    document.querySelector("#sabor").value = "";
    document.querySelector("#preco").value = 0;
    document.querySelector("#descricao").value = "";
    document.querySelector("#foto").value = "";
}

async function createPaleta() {
    const sabor = document.querySelector("#sabor").value;
    const preco = document.querySelector("#preco").value;
    const descricao = document.querySelector("#descricao").value;
    const foto = document.querySelector("#foto").value;

    const paleta = {
        sabor,
        preco,
        descricao,
        foto,
    };

    const response = await fetch(`${baseURL}/create`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(paleta),
    });

    const novaPaleta = await response.json();

    const html = `
  <div class="PaletaListaItem">
    <div>
        <div class="PaletaListaItem__sabor">${novaPaleta.sabor}</div>
        <div class="PaletaListaItem__preco">R$ ${novaPaleta.preco}</div>
        <div class="PaletaListaItem__descricao">${novaPaleta.descricao}</div>
    </div>
    <img class="PaletaListaItem__foto" src="${novaPaleta.foto}" alt="Paleta de ${novaPaleta.sabor}" />
  </div>`;

    document.querySelector("#paletaList").insertAdjacentHTML("beforeend", html);

    fecharModalCadastro();
}