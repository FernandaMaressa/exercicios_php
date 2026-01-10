<?php
$nota1 = $_POST['nota1']; // Prova Teórica
$nota2 = $_POST['nota2']; // Trabalho Prático
$nota3 = $_POST['nota3']; // Participação

$media = ($nota1 + $nota2 + $nota3) / 3;

// Lógica conforme o Enunciado
if ($nota1 >= 8 && $nota2 >= 8 && $nota3 >= 8) {
    $classificacao = "Desempenho Excelente";
    $classe = "excelente";
    $mensagem = "Incrível! Você dominou todos os pilares da disciplina.";

} elseif (
    (($nota1 >= 7 && $nota2 >= 7) || ($nota1 >= 7 && $nota3 >= 7) || ($nota2 >= 7 && $nota3 >= 7)) &&
    ($nota1 >= 6 && $nota2 >= 6 && $nota3 >= 6)
) {
    $classificacao = "Desempenho Ótimo";
    $classe = "otimo";
    $mensagem = "Parabéns! Seu rendimento está acima da média.";

} elseif ($media >= 6 && ($nota1 >= 5 && $nota2 >= 5 && $nota3 >= 5)) {
    $classificacao = "Desempenho Bom";
    $classe = "bom";
    $mensagem = "Bom trabalho! Continue se dedicando para subir de nível.";

} elseif (($media >= 5 && $media <= 5.9) || ($nota1 >= 4 && $nota1 <= 4.9) || ($nota2 >= 4 && $nota2 <= 4.9) || ($nota3 >= 4 && $nota3 <= 4.9)) {
    $classificacao = "Desempenho Regular";
    $classe = "regular";
    $mensagem = "Você está no caminho, mas precisa reforçar alguns conceitos.";

} else {
    $classificacao = "Desempenho Insuficiente";
    $classe = "insuficiente";
    $mensagem = "Não desista! Procure o professor para um plano de recuperação.";
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Resultado da Avaliação</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
    <h1>Boletim</h1>

    <div class="resultado <?= $classe ?>">
        <p><strong>Média Final:</strong> <?= number_format($media, 1) ?></p>
        <hr style="margin: 10px 0; border: 0; border-top: 1px dashed #666;">
        <p style="font-size: 1.2em;"><?= $classificacao ?></p>
        <p style="margin-top: 10px; font-weight: normal; font-style: italic;">
            "<?= $mensagem ?>"
        </p>
    </div>

    <a href="index.php" style="text-decoration: none;">
        <button type="button" style="width: 100%;">Voltar ao Início</button>
    </a>
</div>

</body>
</html>
