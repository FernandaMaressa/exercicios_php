<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Contador Regressivo</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
    <h1>Contagem Regressiva</h1>

    <form action="processar.php" method="POST">
        <label for="numero">Número inicial da Contagem:</label>
        <input type="number" name="numero" id="numero" min="5" max="50" required placeholder="Digite entre 5 e 50">

        <button type="submit">Iniciar Contagem</button>
    </form>
</div>

</body>
</html>
