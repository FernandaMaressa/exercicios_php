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
        <input type="number" id="cupom" name="cupom" required placeholder="Digite o código (1 a 5)">
        
        <div class="cupom-info">
            <p><strong>Cupons disponíveis:</strong></p>
            <ul>
                <li>1 - BRONZE (5%)</li>
                <li>2 - PRATA (10%)</li>
                <li>3 - OURO (15%)</li>
                <li>4 - PLATINA (20%)</li>
                <li>5 - DIAMANTE (25%)</li>
            </ul>
        </div>
        
        <button type="submit">Calcular Total</button>
    </form>
</div>
</body>
</html>
