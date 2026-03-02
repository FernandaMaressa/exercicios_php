<?php
// ============================================================
// // Entrega 2: Sem banco de dados (mock array)
// Na entrega 3, vou substituir o mock pelo conexao.php + MySQL
// ============================================================
// MOCK DE DADOS — vou substituir por MySQL na entrega 3
// Na entrega 3, vou remover este array e usar:
//   require_once 'conexao.php';
// e as funções de INSERT/SELECT com PDO
// ─────────────────────────────────────────────
$consumos_mock = [
    ['id' => 1,  'data_consumo' => '2026-02-10', 'consumo_kwh' => 85.00,  'classificacao' => 'Econômico'],
    ['id' => 2,  'data_consumo' => '2026-02-11', 'consumo_kwh' => 130.00, 'classificacao' => 'Moderado'],
    ['id' => 3,  'data_consumo' => '2026-02-12', 'consumo_kwh' => 240.00, 'classificacao' => 'Alto'],
    ['id' => 4,  'data_consumo' => '2026-02-13', 'consumo_kwh' => 95.50,  'classificacao' => 'Econômico'],
    ['id' => 5,  'data_consumo' => '2026-02-14', 'consumo_kwh' => 175.00, 'classificacao' => 'Moderado'],
    ['id' => 6,  'data_consumo' => '2026-02-15', 'consumo_kwh' => 210.00, 'classificacao' => 'Alto'],
    ['id' => 7,  'data_consumo' => '2026-02-16', 'consumo_kwh' => 99.00,  'classificacao' => 'Econômico'],
    ['id' => 8,  'data_consumo' => '2026-02-17', 'consumo_kwh' => 160.00, 'classificacao' => 'Moderado'],
    ['id' => 9,  'data_consumo' => '2026-02-18', 'consumo_kwh' => 220.00, 'classificacao' => 'Alto'],
    ['id' => 10, 'data_consumo' => '2026-02-19', 'consumo_kwh' => 140.00, 'classificacao' => 'Moderado'],
];

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

function classeLinha(string $classificacao): string {
    return match($classificacao) {
        'Econômico' => 'linha-economico',
        'Moderado'  => 'linha-moderado',
        'Alto'      => 'linha-alto',
        default     => ''
    };
}

function formatarData(string $data): string {
    $dt = DateTime::createFromFormat('Y-m-d', $data);
    return $dt ? $dt->format('d/m/Y') : $data;
}


// PROCESSAMENTO DA AÇÃO

$mensagem = '';
$tipo_msg = '';
$acao     = $_POST['acao'] ?? '';

//AÇÃO: REGISTRAR
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

        // Entrega 3: vou substituir pelo INSERT no MySQL 
        $consumos_mock[] = [
            'id'            => count($consumos_mock) + 1,
            'data_consumo'  => $data_consumo,
            'consumo_kwh'   => $consumo_kwh,
            'classificacao' => $classificacao,
        ];
        // Nota da dev: como não temos banco, os dados não persistem. O registro só existe durante esta execução.

        $mensagem = 'Consumo registrado com sucesso!';
        $tipo_msg = 'sucesso';
    }
}

//AÇÃO INVÁLIDA: redireciona
if ($acao !== 'registrar' && $acao !== 'relatorio') {
    header('Location: index.php');
    exit;
}

// Ordenando por data_consumo ASC 
usort($consumos_mock, fn($a, $b) => strcmp($a['data_consumo'], $b['data_consumo']));

// CÁLCULO DAS ESTATÍSTICAS 
$total    = count($consumos_mock);
$qtd_eco  = 0;
$qtd_mod  = 0;
$qtd_alto = 0;
$soma_kwh = 0;
$maior    = PHP_FLOAT_MIN;
$menor    = PHP_FLOAT_MAX;

foreach ($consumos_mock as $r) {
    $kwh = $r['consumo_kwh'];
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

if ($total === 0) { $maior = 0; $menor = 0; }
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

    <!-- CARD: ESTATÍSTICAS  -->
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

    <!-- CARD: TABELA DE REGISTROS -->
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
                    <?php foreach ($consumos_mock as $r): ?>
                    <tr class="<?= classeLinha($r['classificacao']) ?>">
                        <td><?= formatarData($r['data_consumo']) ?></td>
                        <td><?= number_format($r['consumo_kwh'], 2, ',', '.') ?> kWh</td>
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