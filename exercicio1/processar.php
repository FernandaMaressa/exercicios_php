<?php
$nome = $_POST["nome"];
$idade = $_POST["idade"];
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
    if ($idade >= 18) {
        echo "<p>$nome, você é MAIOR de idade.</p>";
    } else {
        echo "<p>$nome, você é MENOR de idade.</p>";
    }
    ?>

    <br>
    <a href="index.php">
        <button>Voltar</button>
    </a>
</div>

</body>
</html>
