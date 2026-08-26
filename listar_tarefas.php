<?php
include 'conexao.php';

$sql = "SELECT * FROM tarefas ORDER BY id DESC";
$resultado = $conexao->query($sql);

$tarefas = [];
if ($resultado) {
    while ($linha = $resultado->fetch_assoc()) {
        $tarefas[] = $linha;
    }
}

header('Content-Type: application/json');
echo json_encode($tarefas);
