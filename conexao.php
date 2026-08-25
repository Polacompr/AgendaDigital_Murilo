<?php

// ========================================
// CONFIGURAÇÕES DO BANCO DE DADOS
// ========================================

$host = "localhost";
$usuario = "root";
$senha = "";
$banco = "agenda_digital";


// ========================================
// CONECTAR AO BANCO
// ========================================

$conexao = mysqli_connect(
    $host,
    $usuario,
    $senha,
    $banco
);


// ========================================
// VERIFICAR CONEXÃO
// ========================================

if (!$conexao) {

    die(
        "Erro de conexão com o banco de dados: "
        . mysqli_connect_error()
    );
}


// ========================================
// DEFINIR CHARSET
// ========================================

mysqli_set_charset($conexao, "utf8mb4");

?>
