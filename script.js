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

// Função executada ao carregar a página
async function carregarTarefas() {
    const resposta = await fetch('http://seu-backend/tarefas');
    const tarefas = await resposta.json();

    const lista = document.getElementById('listaTarefas');
    lista.innerHTML = ''; // Limpa a lista
    
    tarefas.forEach(tarefa => {
        lista.innerHTML += `
            <li>
                <input type="checkbox" ${tarefa.status_tarefa ? 'checked' : ''}
onchange="alternarStatus(${tarefa.id_tarefa}, this.checked)">
                <span class="${tarefa.status_tarefa ? 'concluida' : ''}">${tarefa.descricao_tarefa}</span>
                <button onclick="deletarTarefa(${tarefa.id_tarefa})"> </button>
            </li>
        `;
    });

    // Exemplo de como fica o botão dentro da tag <li>:
lista.innerHTML += `
<li>
<input type="checkbox" ${checado} onchange="atualizarStatus(${tarefa.id_tarefa}, this.checked)">
<span ${classeEstilo}>${tarefa.descricao_tarefa}</span>

<button onclick="editarTarefa(${tarefa.id_tarefa}, '${tarefa.descricao_tarefa}')"> </button>
<button onclick="deletarTarefa(${tarefa.id_tarefa})"> </button>
</li>
`;


    atualizarContador(tarefas.length);
}

function atualizarContador(total) {
    document.getElementById('contador').innerText = `Total de tarefas: ${total}`;
   }

async function alternarStatus(id, concluida) {
    await fetch(`http://seu-backend/tarefas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status_tarefa: concluida ? 1 : 0 })
    });
    carregarTarefas(); // Recarrega a lista
}

async function deletarTarefa(id) {
    await fetch(`http://seu-backend/tarefas/${id}`, {
        method: 'DELETE'
    });
    carregarTarefas(); // Recarrega a lista atualizada
}
   
function carregarTarefas() {
    // Chama o arquivo PHP que busca os dados no phpMyAdmin
    fetch('listar_tarefas.php')
    .then(response => response.json())
    .then(tarefas => {
    const lista = document.getElementById('listaTarefas');
    lista.innerHTML = ''; // Limpa a lista antes de preencher
   
    tarefas.forEach(tarefa => {
    lista.innerHTML += `
    <li>
    ${tarefa.descricao_tarefa}
    <button onclick="deletarTarefa(${tarefa.id_tarefa})"> </button>
    </li>
    `;
    });
    // Atualiza o contador na tela
    document.getElementById('contador').innerText = `Total de tarefas: ${tarefas.length}`;
    });
   }
   // Executa a função assim que a página abre
   window.onload = carregarTarefas;

// Função chamada ao clicar no botão de editar
function editarTarefa(id, textoAtual) {
    const novoTexto = prompt("Digite o novo texto da tarefa:", textoAtual);
   
    // Se o usuário digitou algo e não cancelou o prompt
    if (novoTexto !== null && novoTexto.trim() !== "") {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('descricao_tarefa', novoTexto);
    fetch('editar_tarefa.php', {
    method: 'POST',
    body: formData
    })
    .then(response => response.json())
    .then(dados => {
    if (dados.status === "sucesso") {
    carregarTarefas(); // Recarrega a lista com o texto atualizado
    }
    });
    }
   }
