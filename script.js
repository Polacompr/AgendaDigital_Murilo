// INPUT

let inputTarefa = document.getElementById("inputTarefa");

// LISTA

let lista = document.getElementById("listaTarefas");

// CONTADOR

let contador = document.getElementById("contador");

let total = 0;

// ============================
// ADICIONAR TAREFA
// ============================

function adicionarTarefa(){

    let tarefa = inputTarefa.value.trim();

    if(tarefa === ""){
        alert("Digite uma tarefa.");
        inputTarefa.focus();
        return;
    }

    let item = document.createElement("li");

// Texto da tarefa
let texto = document.createElement("span");
texto.innerText = tarefa;

// Botão X
let botaoExcluir = document.createElement("button");
botaoExcluir.innerText = "❌";
botaoExcluir.className = "btn-excluir";

// Marcar como concluída ao clicar no texto
texto.onclick = function () {

    if (texto.style.textDecoration === "line-through") {

        texto.style.textDecoration = "none";
        texto.style.opacity = "1";

    } else {

        texto.style.textDecoration = "line-through";
        texto.style.opacity = "0.6";

    }

};

// Excluir tarefa
botaoExcluir.onclick = function (event) {

    event.stopPropagation(); // impede conflito com outros cliques

    lista.removeChild(item);

    total--;

    contador.innerHTML = "Total de tarefas: " + total;

};

// Adiciona os elementos no <li>
item.appendChild(texto);
item.appendChild(botaoExcluir);

lista.appendChild(item);

total++;

contador.innerHTML = "Total de tarefas: " + total;

inputTarefa.value = "";
inputTarefa.focus();
}

// ============================
// TROCAR TELAS
// ============================

function mostrarTela(tela){

    let telas =
    document.querySelectorAll(".tela");

    telas.forEach(function(item){

        item.classList.remove("ativa");

    });

    document
    .getElementById(tela)
    .classList.add("ativa");

}

// ============================
// ALTERAR TEMA
// ============================

function alterarTema(){

    let escolha =
    document.getElementById("tema").value;

    if(escolha === "escuro"){

        document.body.classList.add("escuro");

        localStorage.setItem(
            "tema",
            "escuro"
        );

    }else{

        document.body.classList.remove("escuro");

        localStorage.setItem(
            "tema",
            "claro"
        );

    }

}

// ============================
// CARREGAR TEMA
// ============================

window.onload = function(){

    let temaSalvo =
    localStorage.getItem("tema");

    if(temaSalvo === "escuro"){

        document.body.classList.add("escuro");

        document
        .getElementById("tema")
        .value = "escuro";

    }

}
