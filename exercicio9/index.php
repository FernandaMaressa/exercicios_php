<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Analisador de Consoantes</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
    <div class="header">
        <h1>Analisador de Consoantes</h1>
        <p class="subtitle">Descubra quantas consoantes existem em seu texto!</p>
    </div>

    <form action="processar.php" method="POST">
        <label for="frase">Digite sua frase para análise:</label>
        <textarea id="frase" name="frase" rows="4" required placeholder="Ex: Programação em PHP é incrível!"></textarea>

        <button type="submit">Analisar Consoantes</button>
    </form>

    <div class="info-box">
        <h3>ℹ️O que será analisado:</h3>
        <ul>
            <li>✓ Total de consoantes encontradas</li>
            <li>✓ Total de vogais encontradas</li>
            <li>✓ Porcentagem de consoantes</li>
            <li>✓ Lista detalhada de cada consoante</li>
        </ul>
    </div>
</div>

</body>
</html>
