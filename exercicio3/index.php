<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Simulador de Empréstimo</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
    <h1>Simulador de Empréstimo Bancário</h2>

    <form action="processar.php" method="POST">
        <label>Nome do Cliente</label>
        <input type="text" name="nome" required>

        <label>Salário Mensal (R$)</label>
        <input type="number" name="salario" step="0.01" required>

        <label>Valor do Empréstimo (R$)</label>
        <input type="number" name="valor_emprestimo" step="0.01" required>

        <label>Número de Parcelas</label>
        <select name="num_parcelas" required>
            <option value="12">12x</option>
            <option value="24">24x</option>
            <option value="36">36x</option>
            <option value="48">48x</option>
        </select>

        <button type="submit">Simular Empréstimo</button>
    </form>
</div>

</body>
</html>
