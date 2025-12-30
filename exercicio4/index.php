<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Exercício 4 - Pódio da Corrida</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
    <h1>Classificação da Corrida 🏁</h1>

    <form action="processar.php" method="post">
        <div class="atleta">
            <label>Atleta 1</label>
            <input type="text" name="nome1" placeholder="Nome: " required>
            <input type="number" name="tempo1" placeholder="Tempo (segundos): " required>
        </div>

        <div class="atleta">
            <label>Atleta 2</label>
            <input type="text" name="nome2" placeholder="Nome: " required>
            <input type="number" name="tempo2" placeholder="Tempo (segundos): " required>
        </div>

        <div class="atleta">
            <label>Atleta 3</label>
            <input type="text" name="nome3" placeholder="Nome: " required>
            <input type="number" name="tempo3" placeholder="Tempo (segundos): " required>
        </div>

        <button type="submit">VER PÓDIO</button>
    </form>
</div>

</body>
</html>
