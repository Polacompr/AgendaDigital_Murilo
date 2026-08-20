<?php
include("conexao.php");
$tarefa = $_POST['tarefa'];
$sql = "INSERT INTO tarefas (tarefa)
 VALUES ('$tarefa')";
if(mysqli_query($conexao,$sql)){
 header("Location: ../index.php");
}else{
 echo "Erro ao salvar.";
}
?>
