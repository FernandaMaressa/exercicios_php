<?php
$numero = $_POST["numero"];
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Resultado</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
    <h2>Resultado</h2>

    <?php
    if ($numero % 4 == 0) {
        echo "<p>Múltiplo de 4</p>";
    } elseif ($numero % 6 == 0) {
        echo "<p>Múltiplo de 6</p>";
    } elseif ($numero % 9 == 0) {
        echo "<p>Múltiplo de 9</p>";
    } else {
        echo "<p>Não é múltiplo de 4, 6 ou 9</p>";
    }
    ?>

    <br>
    <a href="index.php">
        <button>Voltar</button>
    </a>
</div>

</body>
</html>
