<?php
include 'conexao.php';
// Recebe os dados via GET ou POST
$id = $_GET['id'] ?? 0;
$status = $_GET['status'] ?? 0; // 1 para concluída, 0 para pendente
if ($id > 0) {
 $stmt = $conn->prepare("UPDATE Tarefa SET status_tarefa = ? WHERE id_tarefa = ?");
 $stmt->bind_param("ii", $status, $id);

 if ($stmt->execute()) {
 echo json_encode(["status" => "sucesso", "mensagem" => "Tarefa atualizada!"]);
 } else {
 echo json_encode(["status" => "erro", "mensagem" => "Erro ao atualizar."]);
 }
}
?>
