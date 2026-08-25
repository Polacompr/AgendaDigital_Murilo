<!DOCTYPE html>
<html lang="pt-BR">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Minha Agenda</title>

    <link rel="stylesheet" href="/agenda_digital/css/style.css">

</head>

<body>

    <div class="dashboard">

        <!-- MENU LATERAL -->
        <aside class="menu">

            <h2>🚀 Minha Agenda</h2>

            <nav>

                <a onclick="mostrarTela('inicio')">
                    🏠 Início
                </a>

                <a onclick="mostrarTela('tarefas')">
                    📋 Tarefas
                </a>

                <a onclick="mostrarTela('config')">
                    ⚙ Configuração
                </a>

            </nav>

        </aside>

        <!-- CONTEÚDO -->
        <section class="conteudo">

            <!-- TELA INÍCIO -->
            <div id="inicio" class="tela ativa">

                <h1>🚀 Minha Agenda Digital</h1>

                <div class="inicio-topo">

                    <div class="texto">

                        <h2>Organize suas tarefas de forma inteligente</h2>

                        <p>
                            Este aplicativo foi desenvolvido utilizando HTML, CSS e JavaScript.
                            O objetivo é criar uma ferramenta simples para acompanhar e organizar
                            tarefas do dia a dia.
                        </p>

                        <div class="card-info">
                            ✔ Cadastro de tarefas
                        </div>

                        <div class="card-info">
                            ✔ Interface Dashboard
                        </div>

                        <div class="card-info">
                            ✔ Tema claro e escuro
                        </div>

                        <div class="card-info">
                            ✔ Armazenamento no navegador
                        </div>

                        <a href="https://developer.mozilla.org/pt-BR/docs/Learn"
                            target="_blank">
                            🌐 Aprender mais sobre desenvolvimento Web
                        </a>

                    </div>

                    <div class="imagem">

                        <img
                            src="https://img.magnific.com/psd-gratuitas/ilustracao-masculina-de-desenvolvedor-de-icone-3d-nft_629802-6.jpg?semt=ais_hybrid&w=740&q=80"
                            alt="Programador">

                    </div>

                </div>

            </div>

            <!-- TELA TAREFAS -->
            <div id="tarefas" class="tela">

                <h1>Minhas tarefas</h1>

                <!-- FORMULÁRIO DE CADASTRO -->
                <form action="php/salvar.php" method="POST">

                    <input
                        type="text"
                        name="tarefa"
                        placeholder="Digite uma tarefa..."
                        required>

                    <button type="submit">
                        Adicionar tarefa
                    </button>

                </form>

                <!-- LISTA DE TAREFAS -->
                <ul id="listaTarefas"></ul>

                <!-- CONTADOR -->
                <p id="contador">
                    Total de tarefas: 0
                </p>

            </div>

            <!-- TELA CONFIGURAÇÃO -->
            <div id="config" class="tela">

                <h1>Configuração</h1>

                <label for="tema">
                    Tema:
                </label>

                <select
                    id="tema"
                    onchange="alterarTema()">

                    <option value="claro">
                        Claro ☀️
                    </option>

                    <option value="escuro">
                        Escuro 🌙
                    </option>

                </select>

            </div>

        </section>

    </div>

    <!-- RODAPÉ -->
    <footer>
        Desenvolvido por Murilo Pasdiora
    </footer>

    <!-- JAVASCRIPT -->
    <script src="js/script.js"></script>

</body>

</html>
