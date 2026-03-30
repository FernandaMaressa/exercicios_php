<?php
/**
 * processar.php — Processamento central
 *
 * Fluxo:
 *   pontuacao == -1  → busca tudo, monta resumo na session, redireciona para resultado.php
 *   pontuacao válida → valida, classifica, insere no BD, volta para index.php
 *   inválida         → mensagem de erro, volta para index.php
 */

session_start();

require_once __DIR__ . '/conexao.php';
require_once __DIR__ . '/funcoes.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.php');
    exit;
}
$pontuacao = validarPontuacao($_POST['pontuacao'] ?? null);

if ($pontuacao === null) {
    $_SESSION['mensagem']      = 'Valor inválido. Digite um número entre 0.0 e 10.0, ou -1 para encerrar.';
    $_SESSION['tipo_mensagem'] = 'error';
    header('Location: index.php');
    exit;
}

if ($pontuacao === -1.0) {

    $stmt      = $pdo->query('SELECT id, pontuacao, nivel, data_cadastro FROM pontuacoes ORDER BY data_cadastro DESC');
    $registros = $stmt->fetchAll();
    $total     = count($registros);

    $bons = array_reduce($registros, fn(int $c, array $r) => $c + ($r['nivel'] === 'BOM' ? 1 : 0), 0);

    $valores = array_column($registros, 'pontuacao');

    $_SESSION['resumo'] = [
        'total'      => $total,
        'bons'       => $bons,
        'percentual' => calcularPercentual($bons, $total),
        'maior'      => $total > 0 ? max($valores) : '—',
        'menor'      => $total > 0 ? min($valores) : '—',
        'media'      => $total > 0 ? round(array_sum($valores) / $total, 1) : '—',
        'registros'  => $registros,
    ];

    header('Location: resultado.php');
    exit;
}

try {
    $nivel = classificarNivel($pontuacao);

    $stmt = $pdo->prepare('INSERT INTO pontuacoes (pontuacao, nivel) VALUES (:pontuacao, :nivel)');
    $stmt->execute([':pontuacao' => $pontuacao, ':nivel' => $nivel]);

    $_SESSION['mensagem']      = "Pontuação {$pontuacao} registrada como {$nivel} com sucesso!";
    $_SESSION['tipo_mensagem'] = 'success';

} catch (InvalidArgumentException) {
    $_SESSION['mensagem']      = 'Pontuação fora do intervalo válido (0.0 a 10.0).';
    $_SESSION['tipo_mensagem'] = 'error';
} catch (PDOException) {
    $_SESSION['mensagem']      = 'Erro ao salvar no banco de dados. Tente novamente.';
    $_SESSION['tipo_mensagem'] = 'error';
}

header('Location: index.php');
exit;