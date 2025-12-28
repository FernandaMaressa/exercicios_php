<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $nome = $_POST["nome"];
    $salario = floatval($_POST["salario"]);
    $valorEmprestimo = floatval($_POST["valor_emprestimo"]);
    $parcelas = intval($_POST["num_parcelas"]);

    $prestacao = $valorEmprestimo / $parcelas;
    $limite = $salario * 0.30;
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Resultado da Simulação</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="resultado">
<h2>Resultado da Simulação</h2>

<?php
if ($prestacao <= $limite) {
    echo "<p>Parabéns <strong>$nome</strong>, empréstimo aprovado!</p>";
    echo "<p>Valor da prestação: R$ " . number_format($prestacao, 2, ',', '.') . "</p>";
} else {
    echo "<p><strong>$nome</strong>, empréstimo negado.</p>";
    echo "<p>A prestação excede 30% do seu salário.</p>";
}
?>

<br>
<a href="index.php">
    <button>Voltar</button>
</a>
</div>

</body>
</html>
