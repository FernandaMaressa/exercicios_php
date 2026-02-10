<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contador Regressivo</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="container">
    <h1>Contador Regressivo</h1>
    
    <form action="processar.php" method="POST">
        <label for="numero">Número Inicial da Contagem:</label>
        <input type="number" id="numero" name="numero" min="5" max="50" required placeholder="Digite entre 5 e 50">
        
        <button type="submit">Iniciar Contagem Regressiva</button>
    </form>
</div>
</body>
</html>

