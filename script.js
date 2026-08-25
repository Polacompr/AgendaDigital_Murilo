// ========================================
// TROCAR TELAS
// ========================================

function mostrarTela(tela) {

    const telas = document.querySelectorAll(".tela");

    telas.forEach(function (item) {
        item.classList.remove("ativa");
    });

    const telaSelecionada = document.getElementById(tela);

    if (telaSelecionada) {
        telaSelecionada.classList.add("ativa");
    }
}


// ========================================
// ALTERAR TEMA
// ========================================

function alterarTema() {

    const escolha = document.getElementById("tema").value;

    if (escolha === "escuro") {

        document.body.classList.add("escuro");

        localStorage.setItem("tema", "escuro");

    } else {

        document.body.classList.remove("escuro");

        localStorage.setItem("tema", "claro");
    }
}


// ========================================
// CARREGAR TEMA SALVO
// ========================================

function carregarTema() {

    const temaSalvo = localStorage.getItem("tema");
    const seletorTema = document.getElementById("tema");

    if (temaSalvo === "escuro") {

        document.body.classList.add("escuro");

        if (seletorTema) {
            seletorTema.value = "escuro";
        }

    } else {

        document.body.classList.remove("escuro");

        if (seletorTema) {
            seletorTema.value = "claro";
        }
    }
}


// ========================================
// ATUALIZAR CONTADOR
// ========================================

function atualizarContador(total) {

    const contador = document.getElementById("contador");

    if (contador) {
        contador.innerText = "Total de tarefas: " + total;
    }
}


// ========================================
// CARREGAR TAREFAS
// ========================================

function carregarTarefas() {

    fetch("php/listar_tarefas.php")

        .then(function (response) {

            if (!response.ok) {
                throw new Error("Erro ao buscar as tarefas.");
            }

            return response.json();
        })

        .then(function (tarefas) {

            const lista = document.getElementById("listaTarefas");

            if (!lista) {
                return;
            }

            // Limpa a lista
            lista.innerHTML = "";

            // Adiciona cada tarefa
            tarefas.forEach(function (tarefa) {

                const item = document.createElement("li");

                // Checkbox
                const checkbox = document.createElement("input");

                checkbox.type = "checkbox";

                checkbox.checked = Number(tarefa.status_tarefa) === 1;

                checkbox.onchange = function () {
                    alternarStatus(
                        tarefa.id_tarefa,
                        checkbox.checked
                    );
                };


                // Texto da tarefa
                const texto = document.createElement("span");

                texto.innerText = tarefa.descricao_tarefa;

                if (checkbox.checked) {
                    texto.classList.add("concluida");
                }


                // Botão editar
                const botaoEditar = document.createElement("button");

                botaoEditar.innerText = "✏️";

                botaoEditar.className = "btn-editar";

                botaoEditar.onclick = function () {

                    editarTarefa(
                        tarefa.id_tarefa,
                        tarefa.descricao_tarefa
                    );

                };


                // Botão excluir
                const botaoExcluir = document.createElement("button");

                botaoExcluir.innerText = "❌";

                botaoExcluir.className = "btn-excluir";

                botaoExcluir.onclick = function () {

                    deletarTarefa(tarefa.id_tarefa);

                };


                // Monta o <li>
                item.appendChild(checkbox);
                item.appendChild(texto);
                item.appendChild(botaoEditar);
                item.appendChild(botaoExcluir);

                lista.appendChild(item);

            });


            // Atualiza contador
            atualizarContador(tarefas.length);

        })

        .catch(function (erro) {

            console.error("Erro:", erro);

        });
}


// ========================================
// ALTERAR STATUS DA TAREFA
// ========================================

function alternarStatus(id, concluida) {

    fetch("php/atualizar_status.php", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            id_tarefa: id,
            status_tarefa: concluida ? 1 : 0
        })

    })

        .then(function (response) {

            if (!response.ok) {
                throw new Error("Erro ao atualizar status.");
            }

            return response.json();

        })

        .then(function () {

            carregarTarefas();

        })

        .catch(function (erro) {

            console.error("Erro:", erro);

        });
}


// ========================================
// EXCLUIR TAREFA
// ========================================

function deletarTarefa(id) {

    const confirmar = confirm(
        "Tem certeza que deseja excluir esta tarefa?"
    );

    if (!confirmar) {
        return;
    }


    fetch("php/deletar_tarefa.php", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            id_tarefa: id
        })

    })

        .then(function (response) {

            if (!response.ok) {
                throw new Error("Erro ao excluir tarefa.");
            }

            return response.json();

        })

        .then(function () {

            carregarTarefas();

        })

        .catch(function (erro) {

            console.error("Erro:", erro);

        });
}


// ========================================
// EDITAR TAREFA
// ========================================

function editarTarefa(id, textoAtual) {

    const novoTexto = prompt(
        "Digite o novo texto da tarefa:",
        textoAtual
    );


    // Usuário cancelou
    if (novoTexto === null) {
        return;
    }


    // Texto vazio
    if (novoTexto.trim() === "") {

        alert("Digite uma descrição válida.");

        return;
    }


    const formData = new FormData();

    formData.append("id_tarefa", id);

    formData.append(
        "descricao_tarefa",
        novoTexto.trim()
    );


    fetch("php/editar_tarefa.php", {

        method: "POST",

        body: formData

    })

        .then(function (response) {

            if (!response.ok) {
                throw new Error("Erro ao editar tarefa.");
            }

            return response.json();

        })

        .then(function (dados) {

            if (dados.status === "sucesso") {

                carregarTarefas();

            } else {

                alert(
                    dados.mensagem ||
                    "Não foi possível editar a tarefa."
                );

            }

        })

        .catch(function (erro) {

            console.error("Erro:", erro);

        });
}


// ========================================
// QUANDO A PÁGINA CARREGAR
// ========================================

window.addEventListener("load", function () {

    carregarTema();

    carregarTarefas();

});
