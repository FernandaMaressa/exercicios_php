<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simulador de Descontos</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
    <h1>Simulador de Descontos</h1>

    <form action="processar.php" method="post">
        <label for="valor">Valor da Compra (R$)</label>
        <input type="number" id="valor" name="valor" step="0.01" min="0.01" required placeholder="0,00">

        <label for="cupom">Código do Cupom</label>
        <select id="cupom" name="cupom" required>
            <option value="">Selecione o cupom</option>
            <option value="1">1 - BRONZE (5% de desconto)</option>
            <option value="2">2 - PRATA (10% de desconto)</option>
            <option value="3">3 - OURO (15% de desconto)</option>
            <option value="4">4 - PLATINA (20% de desconto)</option>
            <option value="5">5 - DIAMANTE (25% de desconto)</option>
        </select>

        <button type="submit">Calcular Total</button>
    </form>
</div>

</body>
</html>
