<?php
session_start();

/* ═══════════════════════════════════════════════════════════════
   limpar.php
   Responsabilidade: apagar todos os registros da tabela
   exercicio14 e redirecionar de volta ao index.php.
═══════════════════════════════════════════════════════════════ */

/* ── 1. Garante que só aceita POST ─────────────────────────── */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.php');
    exit;
}

/* ── 2. Conecta ao banco e apaga todos os registros ────────── */
require_once __DIR__ . '/conexao.php';

try {
    $stmt = $pdo->prepare('DELETE FROM exercicio14');
    $stmt->execute();
    $_SESSION['mensagem'] = 'Histórico apagado com sucesso.';

} catch (PDOException $e) {
    $_SESSION['mensagem_erro'] = 'Erro ao limpar o histórico.';
}

/* ── 3. Redireciona ─────────────────────────────────────────── */
header('Location: index.php');
exit;