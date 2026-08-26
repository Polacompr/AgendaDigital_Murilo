<?php
include 'conexao.php';

$dados = json_decode(file_get_contents("php://input"), true);
$id = $dados['id_tarefa'] ?? 0;
$status = $dados['status_tarefa'] ?? 0;

if ($id > 0) {
    $stmt = $conexao->prepare("UPDATE tarefas SET status = ? WHERE id = ?");
    $stmt->bind_param("ii", $status, $id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "sucesso"]);
    } else {
        echo json_encode(["status" => "erro"]);
    }
} else {
    echo json_encode(["status" => "erro"]);
}
