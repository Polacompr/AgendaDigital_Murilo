<?php
include("conexao.php");

$tarefa = $_POST['tarefa'] ?? '';

if (trim($tarefa) !== '') {
    $stmt = $conexao->prepare("INSERT INTO tarefas (tarefa, status) VALUES (?, 0)");
    $stmt->bind_param("s", $tarefa);
    $stmt->execute();
}

header("Location: ../index.php");
exit;
