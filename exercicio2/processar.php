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

  if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $numero = intval($_POST["numero"]);

    $multiplo4 = ($numero % 4 === 0);
    $multiplo6 = ($numero % 6 === 0);
    $multiplo9 = ($numero % 9 === 0);

    $mensagens = [];

    if ($multiplo4) $mensagens[] = "4";
    if ($multiplo6) $mensagens[] = "6";
    if ($multiplo9) $mensagens[] = "9";

    if (count($mensagens) === 0) {
        echo "O número $numero NÃO é múltiplo de 4, 6 ou 9.";
    } 
    else {
        echo "O número $numero é múltiplo de: " . implode(", ", $mensagens) . ".";
    }
}
?>


    <br>
    <a href="index.php">
        <button>Voltar</button>
    </a>
</div>

</body>
</html>
