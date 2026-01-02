<?php
$atletas = [
    $_POST['nome1'] => $_POST['tempo1'],
    $_POST['nome2'] => $_POST['tempo2'],
    $_POST['nome3'] => $_POST['tempo3']
];

asort($atletas);
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Pódio da Corrida</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="podio-container">
    <h1>PÓDIO DA CORRIDA 🏆</h1>

    <div class="podio">
        <?php
        $posicao = 1;
        foreach ($atletas as $nome => $tempo) {
            echo "
            <div class='lugar lugar-$posicao'>
                <strong>{$posicao}º Lugar</strong>
                <p>$nome</p>
                <span>$tempo segundos</span>
            </div>";
            $posicao++;
        }
        ?>
    </div>

    <a href="index.php">
        <button>Voltar</button>
    </a>
</div>

</body>
</html>
