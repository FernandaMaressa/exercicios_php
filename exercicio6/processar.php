<?php
$valor = isset($_POST['valor']) ? floatval($_POST['valor']) : 0;
$cupom = isset($_POST['cupom']) ? intval($_POST['cupom']) : 0;
// Validação adicional
if ($valor <= 0) {
    header('Location: index.php');
    exit;
}
$desconto = 0;
$nomeCupom = "";
$classe = "";
$percentualDesconto = 0;

/* Processamento com switch case */
switch ($cupom) {
    case 1:
        $desconto = 0.05;
        $percentualDesconto = 5;
        $nomeCupom = "BRONZE";
        $classe = "bronze";
        break;
    case 2:
        $desconto = 0.10;
        $percentualDesconto = 10;
        $nomeCupom = "PRATA";
        $classe = "prata";
        break;
    case 3:
        $desconto = 0.15;
        $percentualDesconto = 15;
        $nomeCupom = "OURO";
        $classe = "ouro";
        break;
    case 4:
        $desconto = 0.20;
        $percentualDesconto = 20;
        $nomeCupom = "PLATINA";
        $classe = "platina";
        break;
    case 5:
        $desconto = 0.25;
        $percentualDesconto = 25;
        $nomeCupom = "DIAMANTE";
        $classe = "diamante";
        break;
    default:
        $desconto = 0;
        $percentualDesconto = 0;
        $nomeCupom = "INVÁLIDO";
        $classe = "invalido";
}

$valorEconomizado = $valor * $desconto;
$valorFinal = $valor - $valorEconomizado;
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultado do Desconto</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="container">
    <h1>Resultado do Desconto</h1>
    <div class="resultado <?= $classe ?>">
        <?php if ($cupom >= 1 && $cupom <= 5): ?>
            <h2>✓ Cupom <?= htmlspecialchars($nomeCupom) ?> Aplicado</h2>
            <p><strong>Desconto:</strong> <?= $percentualDesconto ?>%</p>
        <?php else: ?>
            <h2>✗ Cupom Inválido! Nenhum desconto aplicado.</h2>
        <?php endif; ?>

        <hr>

        <p><strong>Valor Original:</strong> R$ <?= number_format($valor, 2, ',', '.') ?></p>
        <?php if ($valorEconomizado > 0): ?>
            <p><strong>Valor Economizado:</strong> R$ <?= number_format($valorEconomizado, 2, ',', '.') ?></p>
        <?php endif; ?>

        <p class="valor-final"><strong>Valor Final:</strong> R$ <?= number_format($valorFinal, 2, ',', '.') ?></p>
    </div>

    <a href="index.php">
        <button type="button">← Voltar</button>
    </a>
</div>

</body>
</html>
