<?php
include 'conexao.php';

$id = $_POST['id_tarefa'] ?? 0;
$novaTarefa = $_POST['descricao_tarefa'] ?? '';

if ($id > 0 && trim($novaTarefa) !== '') {
    $stmt = $conexao->prepare("UPDATE tarefas SET tarefa = ? WHERE id = ?");
    $stmt->bind_param("si", $novaTarefa, $id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "sucesso", "mensagem" => "Tarefa alterada!"]);
    } else {
        echo json_encode(["status" => "erro", "mensagem" => "Erro ao alterar."]);
    }
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Dados inválidos."]);
}
