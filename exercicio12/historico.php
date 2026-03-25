<?php
// ============================================================
// historico.php — Escada da Motivação • Exercício 12
// Lista todos os registros, filtros, resumo e recriação visual
// ============================================================

require_once 'conexao.php';

// ── 1. Filtros via GET ───────────────────────────────────────
$filtroMeta = isset($_GET['filtro_meta']) ? trim($_GET['filtro_meta']) : '';
$filtroData = isset($_GET['filtro_data']) ? trim($_GET['filtro_data']) : '';

// ── 2. Montar query com filtros opcionais ────────────────────
$where      = [];
$parametros = [];

if ($filtroMeta !== '') {
    $where[]              = 'meta LIKE :meta';
    $parametros[':meta']  = '%' . mb_strtoupper($filtroMeta) . '%';
}

if ($filtroData !== '') {
    $where[]              = 'DATE(data_hora) = :data';
    $parametros[':data']  = $filtroData;
}

$clausula = !empty($where) ? 'WHERE ' . implode(' AND ', $where) : '';

$stmt = $pdo->prepare(
    "SELECT id, meta, niveis, direcao, data_hora
     FROM exercicio12
     $clausula
     ORDER BY data_hora DESC"
);
$stmt->execute($parametros);
$registros = $stmt->fetchAll();

// ── 3. Resumo geral (sempre sem filtro) ──────────────────────
$stmtTotal = $pdo->query('SELECT COUNT(*) AS total FROM exercicio12');
$total     = (int) $stmtTotal->fetchColumn();

$stmtMaisUsada = $pdo->query(
    'SELECT meta, COUNT(*) AS qtd
     FROM exercicio12
     GROUP BY meta
     ORDER BY qtd DESC
     LIMIT 1'
);
$maisUsada = $stmtMaisUsada->fetch();

$stmtMaior = $pdo->query(
    'SELECT meta, niveis, direcao, data_hora
     FROM exercicio12
     ORDER BY niveis DESC, data_hora DESC
     LIMIT 1'
);
$maiorEscada = $stmtMaior->fetch();

// ── 4. Recriar escada por clique (?ver=ID) ───────────────────
$escadaRecriada  = null;
$registroVer     = null;

if (isset($_GET['ver']) && is_numeric($_GET['ver'])) {
    $stmtVer = $pdo->prepare(
        'SELECT id, meta, niveis, direcao, data_hora
         FROM exercicio12
         WHERE id = :id'
    );
    $stmtVer->execute([':id' => (int) $_GET['ver']]);
    $registroVer = $stmtVer->fetch();

    if ($registroVer) {
        $escadaRecriada = [];
        for ($i = 1; $i <= $registroVer['niveis']; $i++) {
            $reps    = ($registroVer['direcao'] === 'crescente') ? $i : ($registroVer['niveis'] - $i + 1);
            $celulas = array_fill(0, $reps, $registroVer['meta']);
            $escadaRecriada[] = [
                'nivel'      => $i,
                'repeticoes' => $reps,
                'celulas'    => $celulas,
            ];
        }
    }
}

?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Histórico — Escada da Motivação</title>
  <link rel="stylesheet" href="style.css">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
</head>
<body>

  <!-- ── Header ── -->
  <header class="header">
    <div class="header-inner">
      <a href="index.php" class="header-logo">
        <span class="logo-mark"></span>
        <span class="logo-text">Escada da Motivação</span>
      </a>
      <nav class="header-nav">
        <a href="index.php" class="nav-link">Gerar</a>
        <a href="historico.php" class="nav-link active">Histórico</a>
      </nav>
    </div>
  </header>

  <main class="main-container">

    <!-- ── Resumo ── -->
    <section class="card resumo-card" id="secao-resumo">
      <div class="card-header">
        <h2 class="card-title">Resumo Geral</h2>
        <p class="card-desc">Estatísticas de todas as escadas geradas</p>
      </div>
      <div class="resumo-grid">

        <div class="resumo-item" id="resumo-total">
          <span class="resumo-icone">📊</span>
          <div>
            <span class="resumo-valor"><?= $total ?></span>
            <span class="resumo-label">Total de metas</span>
          </div>
        </div>

        <div class="resumo-item" id="resumo-mais-usada">
          <span class="resumo-icone">🏆</span>
          <div>
            <span class="resumo-valor">
              <?= $maisUsada ? htmlspecialchars($maisUsada['meta']) : '—' ?>
            </span>
            <span class="resumo-label">
              Meta mais usada
              <?php if ($maisUsada): ?>
                <em>(<?= $maisUsada['qtd'] ?>x)</em>
              <?php endif; ?>
            </span>
          </div>
        </div>

        <div class="resumo-item" id="resumo-maior-escada">
          <span class="resumo-icone">🪜</span>
          <div>
            <span class="resumo-valor">
              <?= $maiorEscada ? $maiorEscada['niveis'] . ' níveis' : '—' ?>
            </span>
            <span class="resumo-label">
              Escada maior
              <?php if ($maiorEscada): ?>
                <em>(<?= htmlspecialchars($maiorEscada['meta']) ?>)</em>
              <?php endif; ?>
            </span>
          </div>
        </div>

      </div>
    </section>

    <!-- ── Escada recriada (quando ?ver=ID) ── -->
    <?php if ($escadaRecriada && $registroVer): ?>
    <section class="card escada-card" id="secao-escada-recriada">
      <div class="card-header">
        <div>
          <h2 class="card-title">Escada #<?= $registroVer['id'] ?> Recriada</h2>
          <p class="card-desc">
            <?= htmlspecialchars($registroVer['meta']) ?> ·
            <?= $registroVer['niveis'] ?> níveis ·
            <?= ucfirst($registroVer['direcao']) ?> ·
            <?= date('d/m/Y H:i', strtotime($registroVer['data_hora'])) ?>
          </p>
        </div>
        <a href="historico.php" class="btn-ver-mais">✕ Fechar</a>
      </div>

      <div class="escada-wrapper">
        <table class="escada-tabela" aria-label="Escada recriada">
          <tbody>
            <?php foreach ($escadaRecriada as $linha): ?>
            <tr
              class="escada-linha"
              data-nivel="<?= $linha['nivel'] ?>"
              data-reps="<?= $linha['repeticoes'] ?>"
            >
              <td class="nivel-numero"><?= $linha['nivel'] ?></td>
              <td class="nivel-celulas">
                <?php foreach ($linha['celulas'] as $palavra): ?>
                  <span class="palavra-chip"><?= htmlspecialchars($palavra) ?></span>
                <?php endforeach; ?>
              </td>
              <td class="nivel-contagem"><?= $linha['repeticoes'] ?>x</td>
            </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    </section>
    <?php endif; ?>

    <!-- ── Filtros ── -->
    <section class="card filtros-card" id="secao-filtros">
      <div class="card-header">
        <h2 class="card-title">Filtrar Registros</h2>
        <p class="card-desc">Busque por meta ou data específica</p>
      </div>

      <form method="GET" action="historico.php" class="filtros-form" id="formFiltros">
        <div class="filtros-grid">

          <div class="form-group">
            <label class="form-label" for="filtro_meta">Meta</label>
            <input
              type="text"
              id="filtro_meta"
              name="filtro_meta"
              class="form-input"
              maxlength="15"
              placeholder="Ex: VENCER"
              value="<?= htmlspecialchars($filtroMeta) ?>"
              oninput="this.value = this.value.toUpperCase()"
            >
          </div>

          <div class="form-group">
            <label class="form-label" for="filtro_data">Data</label>
            <input
              type="date"
              id="filtro_data"
              name="filtro_data"
              class="form-input"
              value="<?= htmlspecialchars($filtroData) ?>"
            >
          </div>

        </div>

        <div class="filtros-acoes">
          <button type="submit" class="btn-gerar" id="btn-filtrar">
            Filtrar <span class="btn-arrow">&#8594;</span>
          </button>
          <?php if ($filtroMeta !== '' || $filtroData !== ''): ?>
          <a href="historico.php" class="btn-acao btn-secundario" id="btn-limpar">
            Limpar filtros
          </a>
          <?php endif; ?>
        </div>
      </form>
    </section>

    <!-- ── Tabela de registros ── -->
    <section class="card historico-card" id="secao-historico">
      <div class="card-header">
        <div>
          <h2 class="card-title">Todos os Registros</h2>
          <p class="card-desc">
            <?php if ($filtroMeta !== '' || $filtroData !== ''): ?>
              <?= count($registros) ?> resultado(s) encontrado(s)
            <?php else: ?>
              <?= $total ?> registro(s) no total
            <?php endif; ?>
          </p>
        </div>
        <a href="index.php" class="btn-ver-mais">+ Nova Escada</a>
      </div>

      <div class="tabela-wrapper">
        <table class="historico-tabela" id="tabela-historico-completo">
          <thead>
            <tr>
              <th>#</th>
              <th>Meta</th>
              <th>Níveis</th>
              <th>Direção</th>
              <th>Data / Hora</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            <?php if (empty($registros)): ?>
            <tr class="linha-vazia">
              <td colspan="6">
                <?php if ($filtroMeta !== '' || $filtroData !== ''): ?>
                  Nenhum resultado para os filtros aplicados. <a href="historico.php">Limpar filtros</a>
                <?php else: ?>
                  Nenhuma escada gerada ainda. <a href="index.php">Gerar agora</a>
                <?php endif; ?>
              </td>
            </tr>
            <?php else: ?>
              <?php foreach ($registros as $item): ?>
              <tr <?= (isset($_GET['ver']) && (int)$_GET['ver'] === $item['id']) ? 'class="linha-nova"' : '' ?>>
                <td><?= $item['id'] ?></td>
                <td><?= htmlspecialchars($item['meta']) ?></td>
                <td><?= $item['niveis'] ?></td>
                <td><?= ucfirst($item['direcao']) ?></td>
                <td><?= date('d/m/Y H:i', strtotime($item['data_hora'])) ?></td>
                <td>
                  <a
                    href="historico.php?ver=<?= $item['id'] ?>#secao-escada-recriada"
                    class="btn-recriar"
                    title="Recriar escada #<?= $item['id'] ?>"
                  >
                    Ver 🪜
                  </a>
                </td>
              </tr>
              <?php endforeach; ?>
            <?php endif; ?>
          </tbody>
        </table>
      </div>
    </section>

  </main>

  <footer class="footer">
    <p>© Fernanda Maressa Dev</p>
  </footer>

</body>
</html>