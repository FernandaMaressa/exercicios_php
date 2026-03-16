<?php
// ============================================================
// processar.php — Calculadora de Múltiplos
// Entrega 3: Com banco de dados MySQL via PDO
// ============================================================

require_once 'conexao.php';

// ─────────────────────────────────────────────
// FUNÇÕES AUXILIARES
// ─────────────────────────────────────────────

/** Verifica se um valor é par */
function ehPar(float $valor): bool {
    return fmod(abs($valor), 2) == 0;
}

/** Retorna "Par" ou "Ímpar" */
function paridade(float $valor): string {
    return ehPar($valor) ? 'Par' : 'Ímpar';
}

/** Formata data de YYYY-MM-DD HH:MM:SS para DD/MM/YYYY HH:MM */
function formatarDataHora(string $data): string {
    $dt = DateTime::createFromFormat('Y-m-d H:i:s', $data);
    return $dt ? $dt->format('d/m/Y H:i') : $data;
}

// ─────────────────────────────────────────────
// RECEBER E VALIDAR DADOS
// ─────────────────────────────────────────────

$acao        = $_POST['acao']       ?? $_GET['acao']       ?? '';
$erro        = '';
$multiplos   = [];
$numero_base = null;
$limite      = 10;
$ordenacao   = 'crescente';
$filtro      = 'todos';

if ($acao === 'calcular') {

    // Receber
    $numero_base_raw = $_POST['numero_base'] ?? '';
    $limite_raw      = $_POST['limite']      ?? '10';
    $ordenacao       = $_POST['ordenacao']   ?? 'crescente';
    $filtro          = $_POST['filtro']      ?? 'todos';

    // Validar número base
    if ($numero_base_raw === '' || !is_numeric($numero_base_raw)) {
        $erro = 'Informe um número base válido (inteiro ou decimal).';
    } else {
        $numero_base = floatval($numero_base_raw);
    }

    // Validar limite
    if (!$erro) {
        $limite = intval($limite_raw);
        if ($limite < 1) {
            $erro = 'A quantidade de múltiplos deve ser maior que zero.';
        }
    }

    // Validar ordenação
    if (!$erro && !in_array($ordenacao, ['crescente', 'decrescente'])) {
        $ordenacao = 'crescente';
    }

    // Validar filtro
    if (!$erro && !in_array($filtro, ['todos', 'pares', 'impares'])) {
        $filtro = 'todos';
    }

    // ── Calcular múltiplos ────────────────────
    if (!$erro) {
        $todos_multiplos = [];

        for ($i = 1; $i <= $limite; $i++) {
            $valor = $numero_base * $i;
            $todos_multiplos[] = [
                'indice'   => $i,
                'valor'    => $valor,
                'paridade' => paridade($valor),
            ];
        }

        // ── Aplicar filtro ────────────────────
        if ($filtro === 'pares') {
            $multiplos = array_values(array_filter(
                $todos_multiplos,
                fn($m) => ehPar($m['valor'])
            ));
        } elseif ($filtro === 'impares') {
            $multiplos = array_values(array_filter(
                $todos_multiplos,
                fn($m) => !ehPar($m['valor'])
            ));
        } else {
            $multiplos = $todos_multiplos;
        }

        // ── Aplicar ordenação ─────────────────
        if ($ordenacao === 'decrescente') {
            usort($multiplos, fn($a, $b) => $b['valor'] <=> $a['valor']);
        }

        // ── Salvar cada múltiplo no banco ─────
        $stmt = $pdo->prepare('
            INSERT INTO exercicio11
                (numero_base, indice, valor, paridade, ordenacao, filtro)
            VALUES
                (:numero_base, :indice, :valor, :paridade, :ordenacao, :filtro)
        ');

        foreach ($multiplos as $m) {
            $stmt->execute([
                ':numero_base' => $numero_base,
                ':indice'      => $m['indice'],
                ':valor'       => $m['valor'],
                ':paridade'    => $m['paridade'],
                ':ordenacao'   => $ordenacao,
                ':filtro'      => $filtro,
            ]);
        }
    }

} elseif ($acao !== 'historico') {
    header('Location: index.php');
    exit;
}

// ─────────────────────────────────────────────
// HISTÓRICO — filtros e ordenação via MySQL
// ─────────────────────────────────────────────

$filtro_base = $_GET['filtro_base'] ?? $_POST['filtro_base'] ?? '';
$filtro_data = $_GET['filtro_data'] ?? $_POST['filtro_data'] ?? '';
$ordem_hist  = $_GET['ordem_hist']  ?? $_POST['ordem_hist']  ?? 'data_desc';

// Montar query dinâmica
$where      = [];
$params     = [];

if ($filtro_base !== '') {
    $where[]              = 'numero_base = :filtro_base';
    $params[':filtro_base'] = floatval($filtro_base);
}

if ($filtro_data !== '') {
    $where[]              = 'DATE(data_calculo) = :filtro_data';
    $params[':filtro_data'] = $filtro_data;
}

$clausula_where = $where ? ('WHERE ' . implode(' AND ', $where)) : '';

$order_map = [
    'data_desc'  => 'data_calculo DESC',
    'data_asc'   => 'data_calculo ASC',
    'base_asc'   => 'numero_base ASC',
    'base_desc'  => 'numero_base DESC',
];

$order_sql = $order_map[$ordem_hist] ?? 'data_calculo DESC';

$stmt_hist = $pdo->prepare("
    SELECT id, numero_base, indice, valor, paridade, ordenacao, filtro,
           data_calculo
    FROM exercicio11
    $clausula_where
    ORDER BY $order_sql
");
$stmt_hist->execute($params);
$historico_filtrado = $stmt_hist->fetchAll();
$total_historico    = count($historico_filtrado);

?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculadora de Múltiplos — Resultado</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<header>
    <div class="header-icon">✕</div>
    <div class="header-text">
        <h1>Calculadora de Múltiplos</h1>
        <span>Exercício 11 — Resultado</span>
    </div>
</header>

<main class="relatorio-main">

    <?php if ($acao === 'calcular'): ?>

        <?php if ($erro): ?>
        <div class="card" id="card-erro">
            <div class="card-body">
                <p class="msg-erro"><?= htmlspecialchars($erro) ?></p>
            </div>
        </div>

        <?php elseif (empty($multiplos)): ?>
        <div class="card" id="card-sem-resultado">
            <div class="card-body">
                <p class="msg-aviso" id="msg-sem-resultado">
                    Nenhum múltiplo encontrado com o filtro selecionado.
                    Tente aumentar a quantidade de múltiplos ou alterar o filtro.
                </p>
            </div>
        </div>

        <?php else: ?>
        <!-- ── Resumo ── -->
        <section class="card" id="card-resumo">
            <div class="card-header">
                <h2>Resumo</h2>
                <span class="badge-info">
                    base: <?= number_format($numero_base, 2, ',', '.') ?>
                </span>
            </div>
            <div class="card-body">
                <div class="resumo-grid">

                    <div class="resumo-item destaque">
                        <div class="resumo-label">Número base</div>
                        <div class="resumo-valor" id="resumo-base">
                            <?= number_format($numero_base, 2, ',', '.') ?>
                        </div>
                    </div>

                    <div class="resumo-item">
                        <div class="resumo-label">Múltiplos exibidos</div>
                        <div class="resumo-valor" id="resumo-total">
                            <?= count($multiplos) ?>
                        </div>
                    </div>

                    <div class="resumo-item">
                        <div class="resumo-label">Ordenação</div>
                        <div class="resumo-valor" id="resumo-ordenacao" style="font-size:14px;text-transform:capitalize;">
                            <?= htmlspecialchars($ordenacao) ?>
                        </div>
                    </div>

                    <div class="resumo-item">
                        <div class="resumo-label">Filtro aplicado</div>
                        <div class="resumo-valor" id="resumo-filtro" style="font-size:14px;text-transform:capitalize;">
                            <?= htmlspecialchars($filtro) ?>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <!-- ── Tabela de múltiplos ── -->
        <section class="card" id="card-multiplos">
            <div class="card-header">
                <h2>Múltiplos Calculados</h2>
                <span class="badge-info"><?= count($multiplos) ?> resultado(s)</span>
            </div>
            <div class="card-body">
                <div class="table-wrapper">
                    <table id="tabela-multiplos">
                        <thead>
                            <tr>
                                <th>Posição</th>
                                <th>Valor do Múltiplo</th>
                                <th>Par / Ímpar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($multiplos as $pos => $m): ?>
                            <tr>
                                <td class="col-posicao"><?= ($pos + 1) ?>º</td>
                                <td class="col-valor">
                                    <?= number_format($m['valor'], 2, ',', '.') ?>
                                </td>
                                <td>
                                    <span class="badge <?= strtolower($m['paridade']) === 'par' ? 'par' : 'impar' ?>">
                                        <?= htmlspecialchars($m['paridade']) ?>
                                    </span>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        <?php endif; ?>

    <?php endif; ?>

    <!-- ── Histórico de cálculos ── -->
    <section class="card" id="card-historico">
        <div class="card-header">
            <h2>Histórico de Cálculos</h2>
            <span class="badge-info"><?= $total_historico ?> registro(s)</span>
        </div>

        <form class="filtros-form" method="GET" action="processar.php" id="form-historico">
            <input type="hidden" name="acao" value="historico">

            <div class="filtro-group">
                <label for="filtro_base">Número base</label>
                <input
                    type="number"
                    id="filtro_base"
                    name="filtro_base"
                    placeholder="Ex: 5"
                    step="any"
                    value="<?= htmlspecialchars($filtro_base) ?>"
                >
            </div>

            <div class="filtro-group">
                <label for="filtro_data">Data</label>
                <input
                    type="date"
                    id="filtro_data"
                    name="filtro_data"
                    value="<?= htmlspecialchars($filtro_data) ?>"
                >
            </div>

            <div class="filtro-group">
                <label for="ordem_hist">Ordenar por</label>
                <div class="select-wrapper">
                    <select id="ordem_hist" name="ordem_hist">
                        <option value="data_desc"  <?= $ordem_hist === 'data_desc'  ? 'selected' : '' ?>>Data (mais recente)</option>
                        <option value="data_asc"   <?= $ordem_hist === 'data_asc'   ? 'selected' : '' ?>>Data (mais antiga)</option>
                        <option value="base_asc"   <?= $ordem_hist === 'base_asc'   ? 'selected' : '' ?>>Número base (A→Z)</option>
                        <option value="base_desc"  <?= $ordem_hist === 'base_desc'  ? 'selected' : '' ?>>Número base (Z→A)</option>
                    </select>
                </div>
            </div>

            <button type="submit" class="btn-filtrar" id="btn-filtrar">Filtrar</button>
            <a href="processar.php?acao=historico" class="btn-limpar" id="btn-limpar">Limpar</a>
        </form>

        <div class="card-body">
            <div class="table-wrapper">
                <?php if ($total_historico === 0): ?>
                    <p class="sem-dados" id="historico-sem-dados">
                        Nenhum registro encontrado.
                    </p>
                <?php else: ?>
                <table id="tabela-historico">
                    <thead>
                        <tr>
                            <th>Base</th>
                            <th>Índice</th>
                            <th>Valor</th>
                            <th>Par/Ímpar</th>
                            <th>Ordenação</th>
                            <th>Filtro</th>
                            <th>Data/Hora</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($historico_filtrado as $r): ?>
                        <tr>
                            <td class="col-valor">
                                <?= number_format(floatval($r['numero_base']), 2, ',', '.') ?>
                            </td>
                            <td class="col-posicao"><?= $r['indice'] ?>º</td>
                            <td class="col-valor">
                                <?= number_format(floatval($r['valor']), 2, ',', '.') ?>
                            </td>
                            <td>
                                <span class="badge <?= strtolower($r['paridade']) === 'par' ? 'par' : 'impar' ?>">
                                    <?= htmlspecialchars($r['paridade']) ?>
                                </span>
                            </td>
                            <td style="text-transform:capitalize;">
                                <?= htmlspecialchars($r['ordenacao']) ?>
                            </td>
                            <td style="text-transform:capitalize;">
                                <?= htmlspecialchars($r['filtro']) ?>
                            </td>
                            <td style="font-size:12px;color:#6b7280;">
                                <?= formatarDataHora($r['data_calculo']) ?>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
                <?php endif; ?>
            </div>
        </div>
    </section>

    <a href="index.php" class="btn-voltar" id="btn-voltar">← Voltar ao Formulário</a>

</main>

<footer>
   <p>© Fernanda Maressa Dev</p>
</footer>

</body>
</html>