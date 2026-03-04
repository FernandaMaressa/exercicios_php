<?php
// ============================================================
// Entrega 3: MySQL via PDO | Banco: novos_titans_db | Tabela: exercicio10
// ============================================================

require_once 'conexao.php';

// ─────────────────────────────────────────────
// FUNÇÕES AUXILIARES
// ─────────────────────────────────────────────

/** Classifica o consumo conforme as faixas do exercício */
function classificarConsumo(float $kwh): string {
    if ($kwh <= 100) {
        return 'Econômico';
    } elseif ($kwh <= 200) {
        return 'Moderado';
    } else {
        return 'Alto';
    }
}

/** Retorna a classe CSS da linha conforme a classificação */
function classeLinha(string $classificacao): string {
    return match($classificacao) {
        'Econômico' => 'linha-economico',
        'Moderado'  => 'linha-moderado',
        'Alto'      => 'linha-alto',
        default     => ''
    };
}

/** Formata a data de YYYY-MM-DD para DD/MM/YYYY */
function formatarData(string $data): string {
    $dt = DateTime::createFromFormat('Y-m-d', $data);
    return $dt ? $dt->format('d/m/Y') : $data;
}

// ─────────────────────────────────────────────
// PROCESSAMENTO DA AÇÃO
// ─────────────────────────────────────────────

$mensagem = '';
$tipo_msg = '';
$acao     = $_POST['acao'] ?? '';

// ── AÇÃO: REGISTRAR ──────────────────────────
if ($acao === 'registrar') {
    $data_consumo = trim($_POST['data_consumo'] ?? '');
    $consumo_kwh  = floatval($_POST['consumo_kwh'] ?? 0);

    if (empty($data_consumo)) {
        $mensagem = 'Erro: Informe a data do consumo.';
        $tipo_msg = 'erro';
    } elseif ($consumo_kwh <= 0) {
        $mensagem = 'Erro: O consumo deve ser maior que zero.';
        $tipo_msg = 'erro';
    } else {
        $classificacao = classificarConsumo($consumo_kwh);

        $stmt = $pdo->prepare('
            INSERT INTO exercicio10 (data_consumo, consumo_kwh, classificacao)
            VALUES (:data_consumo, :consumo_kwh, :classificacao)
        ');
        $stmt->execute([
            ':data_consumo'  => $data_consumo,
            ':consumo_kwh'   => $consumo_kwh,
            ':classificacao' => $classificacao,
        ]);

        $mensagem = 'Consumo registrado com sucesso!';
        $tipo_msg = 'sucesso';
    }
}

// ── AÇÃO INVÁLIDA: redireciona ───────────────
if ($acao !== 'registrar' && $acao !== 'relatorio') {
    header('Location: index.php');
    exit;
}

// ── BUSCAR TODOS OS REGISTROS ORDENADOS POR DATA ──
$stmt = $pdo->query('
    SELECT id, data_consumo, consumo_kwh, classificacao
    FROM exercicio10
    ORDER BY data_consumo ASC
');
$consumos = $stmt->fetchAll();

// ── CÁLCULO DAS ESTATÍSTICAS ─────────────────
$total    = count($consumos);
$qtd_eco  = 0;
$qtd_mod  = 0;
$qtd_alto = 0;
$soma_kwh = 0;
$maior    = 0;
$menor    = PHP_FLOAT_MAX;

foreach ($consumos as $r) {
    $kwh = floatval($r['consumo_kwh']);
    $soma_kwh += $kwh;
    if ($kwh > $maior) $maior = $kwh;
    if ($kwh < $menor) $menor = $kwh;
    if ($r['classificacao'] === 'Econômico')    $qtd_eco++;
    elseif ($r['classificacao'] === 'Moderado') $qtd_mod++;
    elseif ($r['classificacao'] === 'Alto')     $qtd_alto++;
}

$media    = $total > 0 ? $soma_kwh / $total : 0;
$pct_eco  = $total > 0 ? round(($qtd_eco  / $total) * 100) : 0;
$pct_mod  = $total > 0 ? round(($qtd_mod  / $total) * 100) : 0;
$pct_alto = $total > 0 ? round(($qtd_alto / $total) * 100) : 0;

if ($total === 0) { $menor = 0; }
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EcoVolt • Relatório de Consumo</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<header>
    <div class="logo-area">
        <img src="img/ecovolt.png" alt="EcoVolt Logo">
    </div>
</header>

<main class="relatorio-main">

    <?php if ($mensagem): ?>
    <div class="card-relatorio">
        <p class="msg-<?= $tipo_msg ?>"><?= htmlspecialchars($mensagem) ?></p>
    </div>
    <?php endif; ?>

    <!-- ── CARD: ESTATÍSTICAS ── -->
    <section class="card-relatorio" id="estatisticas">
        <h2>📊 Estatísticas Gerais</h2>
        <div class="stats-grid">

            <div class="stat-item">
                <span class="stat-label">Total de registros</span>
                <span class="stat-valor" id="stat-total">
                    <?= $total ?> dia<?= $total !== 1 ? 's' : '' ?>
                </span>
            </div>

            <div class="stat-item">
                <span class="stat-label">Média geral</span>
                <span class="stat-valor" id="stat-media">
                    <?= number_format($media, 1, ',', '.') ?> kWh
                </span>
            </div>

            <div class="stat-item">
                <span class="stat-label">Maior consumo</span>
                <span class="stat-valor" id="stat-maior">
                    <?= number_format($maior, 1, ',', '.') ?> kWh
                </span>
            </div>

            <div class="stat-item">
                <span class="stat-label">Menor consumo</span>
                <span class="stat-valor" id="stat-menor">
                    <?= number_format($menor, 1, ',', '.') ?> kWh
                </span>
            </div>

            <div class="stat-item economico">
                <span class="stat-label">🟢 Econômico</span>
                <span class="stat-valor" id="stat-eco">
                    <?= $qtd_eco ?> dia<?= $qtd_eco !== 1 ? 's' : '' ?> (<?= $pct_eco ?>%)
                </span>
            </div>

            <div class="stat-item moderado">
                <span class="stat-label">🟡 Moderado</span>
                <span class="stat-valor" id="stat-mod">
                    <?= $qtd_mod ?> dia<?= $qtd_mod !== 1 ? 's' : '' ?> (<?= $pct_mod ?>%)
                </span>
            </div>

            <div class="stat-item alto">
                <span class="stat-label">🔴 Alto</span>
                <span class="stat-valor" id="stat-alto">
                    <?= $qtd_alto ?> dia<?= $qtd_alto !== 1 ? 's' : '' ?> (<?= $pct_alto ?>%)
                </span>
            </div>

        </div>
    </section>

    <!-- ── CARD: TABELA DE REGISTROS ── -->
    <section class="card-relatorio" id="tabela-registros">
        <h2>📋 Registros de Consumo</h2>
        <div class="table-wrapper">
            <?php if ($total === 0): ?>
                <p class="sem-dados">Nenhum registro encontrado.</p>
            <?php else: ?>
            <table>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Consumo (kWh)</th>
                        <th>Classificação</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($consumos as $r): ?>
                    <tr class="<?= classeLinha($r['classificacao']) ?>">
                        <td><?= formatarData($r['data_consumo']) ?></td>
                        <td><?= number_format(floatval($r['consumo_kwh']), 2, ',', '.') ?> kWh</td>
                        <td><?= htmlspecialchars($r['classificacao']) ?></td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
            <?php endif; ?>
        </div>
    </section>

    <a href="index.php" class="btn-voltar" id="btn-voltar">← Voltar ao Formulário</a>

</main>

<footer>
    <p>EcoVolt • Sistema de Monitoramento de Energia</p>
</footer>

</body>
</html>