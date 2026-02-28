<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EcoVolt • Sistema de Monitoramento de Energia</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<header>
    <div class="logo-area">
        <img src="img/ecovolt.png" alt="EcoVolt Logo">
    </div>
</header>

<main>
    <section class="form-container">
        <h2>Registrar Consumo Diário</h2>

        <form action="processar.php" method="POST">

            <label for="data">Data do Consumo: </label>
            <input type="date" id="data" name="data_consumo" required>

            <label for="kwh">Consumo em kWh: </label>
            <input type="number" id="kwh" name="consumo_kwh" step="0.01" required min="0.01">

            <button type="submit" name="acao" value="registrar" class="btn azul">Registrar Consumo</button>

            <button type="submit" name="acao" value="relatorio" class="btn branco">Ver Relatório e Estatísticas</button>

        </form>
    </section>
</main>

<footer>
    <p>EcoVolt • Sistema de Monitoramento de Energia</p>
</footer>

</body>
</html>