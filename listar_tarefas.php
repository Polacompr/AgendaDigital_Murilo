<?php
include 'conexao.php';
$sql = "SELECT * FROM Tarefa ORDER BY id_tarefa DESC";
$resultado = $conn->query($sql);
$tarefas = array();
while($linha = $resultado->fetch_assoc()) {
 $tarefas[] = $linha;
}
// Retorna os dados para o JavaScript
header('Content-Type: application/json');
echo json_encode($tarefas);
?>
