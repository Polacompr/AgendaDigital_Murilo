<?php
include 'conexao.php';

$dados = json_decode(file_get_contents("php://input"), true);
$id = $dados['id_tarefa'] ?? 0;

if ($id > 0) {
    $stmt = $conexao->prepare("DELETE FROM tarefas WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    echo json_encode(["status" => "sucesso"]);
} else {
    echo json_encode(["status" => "erro"]);
}
