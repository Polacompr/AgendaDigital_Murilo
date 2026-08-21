<?php
include 'conexao.php';
$id = $_GET['id'] ?? 0;
if ($id > 0) {
 $stmt = $conn->prepare("DELETE FROM Tarefa WHERE id_tarefa = ?");
 $stmt->bind_param("i", $id);
 $stmt->execute();

 echo json_encode(["status" => "sucesso"]);
}
?>
