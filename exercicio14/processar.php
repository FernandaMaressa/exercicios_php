<?php
session_start();

/* ═══════════════════════════════════════════════════════════════
   processar.php
   Responsabilidade: receber POST, validar campos, classificar
   a venda e gravar resultado na session para exibição no index.
   Na entrega 2 este arquivo receberá a persistência via PDO.
═══════════════════════════════════════════════════════════════ */

/* ── 1. Garante que só aceita POST ─────────────────────────── */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.php');
    exit;
}

/* ── 2. Coleta e sanitiza os valores recebidos ─────────────── */
$quantidade  = $_POST['quantidade']  ?? '';
$valor_medio = $_POST['valor_medio'] ?? '';
$satisfacao  = $_POST['satisfacao']  ?? '';

$erros  = [];
$valores = [
    'quantidade'  => $quantidade,
    'valor_medio' => $valor_medio,
    'satisfacao'  => $satisfacao,
];

/* ── 3. Validação ──────────────────────────────────────────── */

// Quantidade
if ($quantidade === '' || $quantidade === null) {
    $erros['quantidade'] = 'O campo quantidade é obrigatório.';
} elseif (!is_numeric($quantidade)) {
    $erros['quantidade'] = 'Informe um número válido.';
} elseif ((int)$quantidade < 0 || (int)$quantidade > 100) {
    $erros['quantidade'] = 'Quantidade deve ser entre 0 e 100.';
}

// Valor médio
if ($valor_medio === '' || $valor_medio === null) {
    $erros['valor_medio'] = 'O campo valor médio é obrigatório.';
} elseif (!is_numeric($valor_medio)) {
    $erros['valor_medio'] = 'Informe um valor numérico válido.';
} elseif ((float)$valor_medio < 0 || (float)$valor_medio > 500) {
    $erros['valor_medio'] = 'Valor deve ser entre R$ 0,00 e R$ 500,00.';
}

// Satisfação
if ($satisfacao === '' || $satisfacao === null) {
    $erros['satisfacao'] = 'O campo satisfação é obrigatório.';
} elseif (!is_numeric($satisfacao)) {
    $erros['satisfacao'] = 'Informe uma nota numérica válida.';
} elseif ((float)$satisfacao < 0 || (float)$satisfacao > 10) {
    $erros['satisfacao'] = 'Satisfação deve ser entre 0,0 e 10,0.';
}

/* ── 4. Se há erros, devolve ao formulário com mensagens ───── */
if (!empty($erros)) {
    $_SESSION['erros']  = $erros;
    $_SESSION['valores'] = $valores;
    header('Location: index.php');
    exit;
}

/* ── 5. Converte para os tipos corretos ─────────────────────── */
$qtd  = (int)   $quantidade;
$val  = (float) $valor_medio;
$sat  = (float) $satisfacao;

/* ── 6. Regras de classificação ─────────────────────────────── */
/*
   Critérios "top" (para Diamante/Ouro):
     C1 = quantidade  >= 50
     C2 = valor_medio >= 200
     C3 = satisfacao  >= 9.0
*/

$c1 = ($qtd >= 50);
$c2 = ($val >= 200.00);
$c3 = ($sat >= 9.0);
$topAtingidos = (int)$c1 + (int)$c2 + (int)$c3;

$temZero = ($qtd === 0 || $val == 0 || $sat == 0);

if ($c1 && $c2 && $c3) {
    // Todos os 3 critérios top → Diamante
    $classificacao = 'Diamante';

} elseif ($topAtingidos >= 2 && !$temZero) {
    // Pelo menos 2 critérios top e nenhum valor zero → Ouro
    $classificacao = 'Ouro';

} elseif ($qtd >= 30 && $val >= 100.00 && $sat >= 7.0) {
    // Critérios intermediários → Prata
    $classificacao = 'Prata';

} elseif (($sat >= 5.0 && $sat <= 6.9 && !$temZero) || ($qtd >= 10 && $qtd <= 29)) {
    // Satisfação entre 5 e 6.9 OU quantidade entre 10 e 29 → Bronze
    $classificacao = 'Bronze';

} else {
    // Qualquer valor zero, satisfação < 5 ou quantidade < 10 → Insuficiente
    $classificacao = 'Insuficiente';
}

/* ── 7. Grava resultado na session ──────────────────────────── */
$_SESSION['resultado'] = [
    'quantidade'    => $qtd,
    'valor_medio'   => $val,
    'satisfacao'    => $sat,
    'classificacao' => $classificacao,
];

/* ── 8. Redireciona para a página principal ─────────────────── */
header('Location: index.php');
exit;