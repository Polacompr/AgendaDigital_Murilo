<?php

include 'conexao.php';

$sql = "SELECT * FROM Tarefa ORDER BY id_tarefa DESC";

$resultado = $conexao->query($sql);

$tarefas = array();

while ($linha = $resultado->fetch_assoc()) {

    $tarefas[] = $linha;

}

header('Content-Type: application/json');

echo json_encode($tarefas);

?>
