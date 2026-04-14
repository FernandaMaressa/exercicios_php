<?php
session_start();

/* ═══════════════════════════════════════════════════════════════
   processar.php
   Responsabilidade: receber POST, validar campos, classificar
   a venda, salvar no banco via PDO e gravar resultado na session.
═══════════════════════════════════════════════════════════════ */

/* ── 1. Garante que só aceita POST ─────────────────────────── */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.php');
    exit;
}

/* ── 2. Coleta os valores recebidos ────────────────────────── */
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
if ($quantidade === '') {
    $erros['quantidade'] = 'O campo quantidade é obrigatório.';
} elseif (!is_numeric($quantidade)) {
    $erros['quantidade'] = 'Informe um número válido.';
} elseif ((int)$quantidade < 0 || (int)$quantidade > 100) {
    $erros['quantidade'] = 'Quantidade deve ser entre 0 e 100.';
}

// Valor médio
if ($valor_medio === '') {
    $erros['valor_medio'] = 'O campo valor médio é obrigatório.';
} elseif (!is_numeric($valor_medio)) {
    $erros['valor_medio'] = 'Informe um valor numérico válido.';
} elseif ((float)$valor_medio < 0 || (float)$valor_medio > 500) {
    $erros['valor_medio'] = 'Valor deve ser entre R$ 0,00 e R$ 500,00.';
}

// Satisfação
if ($satisfacao === '') {
    $erros['satisfacao'] = 'O campo satisfação é obrigatório.';
} elseif (!is_numeric($satisfacao)) {
    $erros['satisfacao'] = 'Informe uma nota numérica válida.';
} elseif ((float)$satisfacao < 0 || (float)$satisfacao > 10) {
    $erros['satisfacao'] = 'Satisfação deve ser entre 0,0 e 10,0.';
}

/* ── 4. Se há erros, devolve ao formulário ─────────────────── */
if (!empty($erros)) {
    $_SESSION['erros']   = $erros;
    $_SESSION['valores'] = $valores;
    header('Location: index.php');
    exit;
}

/* ── 5. Converte para os tipos corretos ────────────────────── */
$qtd = (int)   $quantidade;
$val = (float) $valor_medio;
$sat = (float) $satisfacao;

/* ── 6. Regras de classificação ────────────────────────────── */
$c1 = ($qtd >= 50);
$c2 = ($val >= 200.00);
$c3 = ($sat >= 9.0);
$topAtingidos = (int)$c1 + (int)$c2 + (int)$c3;
$temZero      = ($qtd === 0 || $val == 0.0 || $sat == 0.0);

if ($c1 && $c2 && $c3) {
    $classificacao = 'Diamante';

} elseif ($topAtingidos >= 2 && !$temZero) {
    $classificacao = 'Ouro';

} elseif ($qtd >= 30 && $val >= 100.00 && $sat >= 7.0) {
    $classificacao = 'Prata';

} elseif (($sat >= 5.0 && $sat <= 6.9 && !$temZero) || ($qtd >= 10 && $qtd <= 29)) {
    $classificacao = 'Bronze';

} else {
    $classificacao = 'Insuficiente';
}

/* ── 7. Salva no banco via PDO ─────────────────────────────── */
require_once __DIR__ . '/conexao.php';

try {
    $stmt = $pdo->prepare('
        INSERT INTO exercicio14 (quantidade, valor_medio, satisfacao, classificacao)
        VALUES (:quantidade, :valor_medio, :satisfacao, :classificacao)
    ');

    $stmt->execute([
        ':quantidade'    => $qtd,
        ':valor_medio'   => $val,
        ':satisfacao'    => $sat,
        ':classificacao' => $classificacao,
    ]);

} catch (PDOException $e) {
    $_SESSION['mensagem_erro'] = 'Erro ao salvar no banco de dados.';
    header('Location: index.php');
    exit;
}

/* ── 8. Grava resultado na session ─────────────────────────── */
$_SESSION['resultado'] = [
    'quantidade'    => $qtd,
    'valor_medio'   => $val,
    'satisfacao'    => $sat,
    'classificacao' => $classificacao,
];

/* ── 9. Redireciona para a página principal ────────────────── */
header('Location: index.php');
exit;