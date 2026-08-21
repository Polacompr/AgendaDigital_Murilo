<?php
include 'conexao.php';
// Recebe os dados
$id = $_POST['id'] ?? 0;
$nova_descricao = $_POST['descricao_tarefa'] ?? '';
if ($id > 0 && !empty($nova_descricao)) {
 $stmt = $conn->prepare("UPDATE Tarefa SET descricao_tarefa = ? WHERE id_tarefa = ?");
 $stmt->bind_param("si", $nova_descricao, $id);

 if ($stmt->execute()) {
 echo json_encode(["status" => "sucesso", "mensagem" => "Tarefa alterada!"]);
 } else {
 echo json_encode(["status" => "erro", "mensagem" => "Erro ao alterar."]);
 }
}
?>
