<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Resultado</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Resultado da Contagem</h1>

        <div class="resultado">
        <?php
        if (isset($_POST["numero"])) {
            $inicio = $_POST["numero"];

            for ($i = $inicio; $i >= 1; $i--) {
                echo $i . "<br>";
            }

            echo "FIM DA CONTAGEM!";
        } else {
            echo "Nenhum número informado.";
        }
        ?>
        </div>

        <a href="index.php">
            <button>Nova Contagem</button>
        </a>

    </div>
</body>
</html>
