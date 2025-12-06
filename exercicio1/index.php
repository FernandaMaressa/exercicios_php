<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Exercício 1 - Verificação de Idade</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
    <h2>Verificar Idade</h2>

    <form action="processar.php" method="POST">

        <div class="form-group">
            <label>Nome:</label>
            <input type="text" name="nome" required>
        </div>

        <div class="form-group">
            <label>Idade:</label>
            <input type="number" name="idade" required>
        </div>

        <button type="submit">Enviar</button>

    </form>
</div>

</body>
</html>
