let nome = document.getElementById("nome");
let tipo = document.getElementById("tipo");
var myModal = new bootstrap.Modal(document.getElementById('exampleModal'))
let listagem = document.getElementById("listagem");
let pesquisar = document.getElementById("pesquisar").addEventListener("keyup", (e) => {
    buscarCard(e.target.value);
});

let dados = [];

function salvar() {

    if (nome.value == "" || tipo.value == "") {
        alert("Preencha todos os campos");
        return false;
    }

    dados.push({
        id: dados.length + 1,
        nome: nome.value,
        tipo: tipo.value,
        status: "Pendente"
    })

    listagem.innerHTML = "";

    dados.forEach((item, index) => {
        listagem.appendChild(criarItem(item, index));
        myModal.hide();
    });

    limparCampos();
}

function criarBotao(item){
    if(item.status == "Pendente"){
        return `<button class="btn btn-success" onClick="aprovar(${item.id})">Aprovar</button>`;
    }else{
        return "";
    }
}

function buscarCard(search){
    listagem.innerHTML = "";

    dados.forEach((item, index) => {
        if(item.nome.includes(search) || item.tipo.includes(search)){
            listagem.appendChild(criarItem(item, index));
        }
    });
}

function criarItem(item, index) {


    let html = `
        <div class="card">
            <div class="card-header dividir">
                <p>${item.nome}</p>
                <p>${item.status}</p>
            </div>
            <div class="card-body">
                <span class="badge text-bg-warning">${item.tipo}</span>
                <div class="col mt-4">
                    ${criarBotao(item)}
                    <button class="btn btn-danger" onClick="remover(${item.id})">Remover</button>
                </div>
            </div>
        </div>
    `;


    let div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = html;
    return div;
}

function limparCampos() {
    nome.value = "";
    tipo.value = "";
}

function remover(id){
    dados = dados.filter((item) => item.id != id);
    listagem.innerHTML = "";

    dados.forEach((item, index) => {
        listagem.appendChild(criarItem(item, index));
    });
}

function aprovar(id){
    dados = dados.map((item) => {
        if(item.id == id){
            item.status = "Aprovado";
        }
        return item;
    });
    listagem.innerHTML = "";

    dados.forEach((item, index) => {
        listagem.appendChild(criarItem(item, index));
    });
}