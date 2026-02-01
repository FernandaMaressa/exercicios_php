<?php
// Valida se foi enviado via POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: index.php");
    exit;
}

// Recebe e valida os dados
$nomeSala = isset($_POST['nome_sala']) ? htmlspecialchars(trim($_POST['nome_sala'])) : '';
$responsavel = isset($_POST['responsavel']) ? htmlspecialchars(trim($_POST['responsavel'])) : '';
$periodo = isset($_POST['periodo']) ? $_POST['periodo'] : '';

// Validação adicional
if (empty($nomeSala) || empty($responsavel) || empty($periodo)) {
    header("Location: index.php");
    exit;
}

// Determina duração usando switch case
switch ($periodo) {
    case "Manhã":
        $duracao = 2;
        break;
    case "Tarde":
        $duracao = 3;
        break;
    case "Noite":
        $duracao = 4;
        break;
    default:
        header("Location: index.php");
        exit;
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comprovante de Reserva</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="comprovante">
    <h2>✅ Comprovante de Reserva</h2>
    <p><strong>Sala:</strong> <?= $nomeSala ?></p>
    <p><strong>Responsável:</strong> <?= $responsavel ?></p>
    <p><strong>Período:</strong> <?= $periodo ?></p>
    <p><strong>Duração máxima permitida:</strong> <?= $duracao ?> horas</p>
    
    <a href="index.php">
        <button type="button">Nova Reserva</button>
    </a>
</div>

</body>
</html>
