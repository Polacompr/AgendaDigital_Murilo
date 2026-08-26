<?php
session_start();
if (isset($_SESSION['usuario_id'])) {
 header("Location: index.php");
 exit();
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
 <meta charset="UTF-8">
 <title>Login - Agenda Digital</title>
 <link rel="stylesheet" href="css/style.css">
</head>
<body style="display: flex; justify-content: center; align-items: center; height: 100vh;">
 <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); width:
300px;">
 <h2> Entrar na Agenda</h2>

 <form action="php/autenticar.php" method="POST">
 <label>E-mail:</label><br>
 <input type="email" name="email" required style="width: 100%; margin-bottom: 10px;"><br>

 <label>Senha:</label><br>
 <input type="password" name="senha" required style="width: 100%; margin-bottom: 15px;"><br>

 <button type="submit" style="width: 100%;">Entrar</button>
 </form>
 </div>
</body>
</html>
