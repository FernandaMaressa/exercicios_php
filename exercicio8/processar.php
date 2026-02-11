<?php
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: index.php");
    exit;
}

$numero = isset($_POST['numero']) ? intval($_POST['numero']) : 0;

if ($numero < 5 || $numero > 50) {
    header("Location: index.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contagem Regressiva</title>
    <link rel="stylesheet" href="style.css">
</head>
<body class="countdown-body">

<div class="countdown-container">
    <?php

    for ($i = $numero; $i >= 1; $i--) {
        echo "<div class='numero' data-delay='" . (($numero - $i) * 2) . "'>$i</div>";
    }
    ?>
    
    <div class="fim" data-delay="<?= ($numero * 2) ?>">
         FIM DA CONTAGEM! 
    </div>
</div>

<a href="index.php" class="btn-voltar" data-delay="<?= ($numero * 2 + 2) ?>">
    <button type="button">↻ Nova Contagem</button>
</a>

<script>

document.addEventListener('DOMContentLoaded', () => {
    const numeros = document.querySelectorAll('.numero');
    const fim = document.querySelector('.fim');
    const btnVoltar = document.querySelector('.btn-voltar');
    
    numeros.forEach(numero => {
        const delay = parseInt(numero.getAttribute('data-delay'));
        setTimeout(() => {
            numero.classList.add('show');
        }, delay * 1000);
    });
    
    const delayFim = parseInt(fim.getAttribute('data-delay'));
    setTimeout(() => {
        fim.classList.add('show');
    }, delayFim * 1000);
    
    const delayBtn = parseInt(btnVoltar.getAttribute('data-delay'));
    setTimeout(() => {
        btnVoltar.classList.add('show');
    }, delayBtn * 1000);
});
</script>

</body>
</html>
