<?php
$n1 = $_POST['nome1'] ?? 'Atleta 1';
$t1 = floatval($_POST['tempo1'] ?? 0);
$n2 = $_POST['nome2'] ?? 'Atleta 2';
$t2 = floatval($_POST['tempo2'] ?? 0);
$n3 = $_POST['nome3'] ?? 'Atleta 3';
$t3 = floatval($_POST['tempo3'] ?? 0);

if ($t1 <= 0 || $t2 <= 0 || $t3 <= 0) {
    die("Erro: Todos os atletas devem ter um tempo maior que zero. <a href='index.php'>Voltar</a>");
}

if ($t1 < $t2 && $t1 < $t3) {
    $primNome = $n1; $primTempo = $t1;
    if ($t2 < $t3) {
        $segNome = $n2; $segTempo = $t2;
        $terNome = $n3; $terTempo = $t3;
    } else {
        $segNome = $n3; $segTempo = $t3;
        $terNome = $n2; $terTempo = $t2;
    }
} elseif ($t2 < $t1 && $t2 < $t3) {
    $primNome = $n2; $primTempo = $t2;
    if ($t1 < $t3) {
        $segNome = $n1; $segTempo = $t1;
        $terNome = $n3; $terTempo = $t3;
    } else {
        $segNome = $n3; $segTempo = $t3;
        $terNome = $n1; $terTempo = $t1;
    }
} else {
    $primNome = $n3; $primTempo = $t3;
    if ($t1 < $t2) {
        $segNome = $n1; $segTempo = $t1;
        $terNome = $n2; $terTempo = $t2;
    } else {
        $segNome = $n2; $segTempo = $t2;
        $terNome = $n1; $terTempo = $t1;
    }
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Resultado - Pódio</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
    <h1>🏆 PÓDIO FINAL 🏆</h1>

    <div class="atleta">
        <label>🥇 1º LUGAR</label>
        <p><strong><?= $primNome ?></strong> - <?= $primTempo ?> segundos</p>
    </div>

    <div class="atleta">
        <label>🥈 2º LUGAR</label>
        <p><strong><?= $segNome ?></strong> - <?= $segTempo ?> segundos</p>
    </div>

    <div class="atleta">
        <label>🥉 3º LUGAR</label>
        <p><strong><?= $terNome ?></strong> - <?= $terTempo ?> segundos</p>
    </div>

    <a href="index.php" style="text-decoration: none;">
        <button type="button" style="width: 100%;">VOLTAR</button>
    </a>
</div>

</body>
</html>
