<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Avaliação de Desempenho Escolar</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
    <h1>Avaliação de Desempenho</h1>

    <form action="processar.php" method="POST">
        <label>Nota da Prova Teórica: </label>
        <input type="number" name="nota1" step="0.1" min="0" max="10" required>

        <label>Nota do Trabalho Prático: </label>
        <input type="number" name="nota2" step="0.1" min="0" max="10" required>

        <label>Nota de Participação: </label>
        <input type="number" name="nota3" step="0.1" min="0" max="10" required>

        <button type="submit">Avaliar Desempenho</button>
    </form>
</div>

</body>
</html>
