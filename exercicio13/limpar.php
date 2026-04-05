<?php
/**
 * limpar.php — Remove todos os registros da tabela exercicio13 e reseta o AUTO_INCREMENT.
 */

session_start();

require_once __DIR__ . '/conexao.php';

try {
    $pdo->exec('DELETE FROM exercicio13');
    $pdo->exec('ALTER TABLE exercicio13 AUTO_INCREMENT = 1');

    $_SESSION['mensagem']      = 'Todas as pontuações foram removidas com sucesso.';
    $_SESSION['tipo_mensagem'] = 'info';

} catch (PDOException $e) {
    $_SESSION['mensagem']      = 'Erro ao limpar os registros: ' . $e->getMessage();
    $_SESSION['tipo_mensagem'] = 'error';
}

header('Location: index.php');
exit;