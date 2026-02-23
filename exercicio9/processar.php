<?php
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: index.php");
    exit;
}

$frase = isset($_POST['frase']) ? trim($_POST['frase']) : '';

if (empty($frase)) {
    header("Location: index.php");
    exit;
}

$fraseMinuscula = mb_strtolower($frase, 'UTF-8');
$consoantes = 'bcdfghjklmnpqrstvwxyz';
$vogais = 'aeiouáéíóúâêôãõ';
$totalConsoantes = 0;
$totalVogais = 0;
$totalLetras = 0;
$listaConsoantes = [];
$tamanho = mb_strlen($fraseMinuscula);

for ($i = 0; $i < $tamanho; $i++) {
    $caractere = mb_substr($fraseMinuscula, $i, 1);
    if (mb_strpos($consoantes, $caractere) !== false) {
        $totalConsoantes++;
        $totalLetras++;
        $listaConsoantes[] = $caractere;
    }
    elseif (mb_strpos($vogais, $caractere) !== false) {
        $totalVogais++;
        $totalLetras++;
    }
}

$porcentagemConsoantes = $totalLetras > 0 ? ($totalConsoantes / $totalLetras) * 100 : 0;
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultado da Análise</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container resultado-page">
    <div class="header">
        <h1>Resultado da Análise</h1>
    </div>

    <div class="frase-analisada">
        <h3>Frase analisada:</h3>
        <p>"<?= htmlspecialchars($frase) ?>"</p>
    </div>

    <div class="estatisticas">
        <div class="stat-card consoantes">
            <div class="stat-icon">🔵</div>
            <div class="stat-numero"><?= $totalConsoantes ?></div>
            <div class="stat-label">Consoantes</div>
        </div>

        <div class="stat-card vogais">
            <div class="stat-icon">🟢</div>
            <div class="stat-numero"><?= $totalVogais ?></div>
            <div class="stat-label">Vogais</div>
        </div>

        <div class="stat-card total">
            <div class="stat-icon">⚪</div>
            <div class="stat-numero"><?= $totalLetras ?></div>
            <div class="stat-label">Total de Letras</div>
        </div>

        <div class="stat-card porcentagem">
            <div class="stat-icon">📊</div>
            <div class="stat-numero"><?= number_format($porcentagemConsoantes, 2) ?>%</div>
            <div class="stat-label">Porcentagem de Consoantes</div>
        </div>
    </div>

    <?php if ($totalConsoantes > 0): ?>
    <div class="lista-consoantes">
        <h3>Consoantes encontradas:</h3>
        <div class="consoantes-grid">
            <?php foreach ($listaConsoantes as $consoante): ?>
                <div class="consoante-item">
                    <span class="consoante-letra"><?= htmlspecialchars($consoante) ?></span>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
    <?php endif; ?>

    <a href="index.php">
        <button type="button" class="btn-voltar">↻ Nova Análise</button>
    </a>
</div>

</body>
</html>