<?php
session_start();
$resumo = $_SESSION['resumo'] ?? null;
unset($_SESSION['resumo']);

$total      = $resumo['total']      ?? 0;
$bons       = $resumo['bons']       ?? 0;
$percentual = $resumo['percentual'] ?? 0;
$maior      = $resumo['maior']      ?? '—';
$menor      = $resumo['menor']      ?? '—';
$media      = $resumo['media']      ?? '—';
$registros  = $resumo['registros']  ?? [];
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Resultado — Exercício 13</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,400&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="style.css"/>
</head>
<body>

  <div class="bg-grid"></div>

  <main class="container container--wide">

    <header class="page-header">
      <span class="badge-label">Resultado Final</span>
      <h1>Análise de<br/><em>Desempenho</em></h1>
    </header>

    <section class="stats-grid" aria-label="Resumo estatístico">

      <div class="stat-card stat-card--highlight">
        <span class="stat-label">Faixa BOM (7.0–8.4)</span>
        <span class="stat-value" id="stat-bons"><?= $bons ?></span>
        <span class="stat-sub">pontuações</span>
      </div>

      <div class="stat-card">
        <span class="stat-label">Total cadastrado</span>
        <span class="stat-value" id="stat-total"><?= $total ?></span>
        <span class="stat-sub">registros</span>
      </div>

      <div class="stat-card stat-card--percent">
        <span class="stat-label">Percentual BOM</span>
        <span class="stat-value" id="stat-percent"><?= number_format($percentual, 1) ?>%</span>
        <span class="stat-sub">do total</span>
      </div>

      <div class="stat-card">
        <span class="stat-label">Maior pontuação</span>
        <span class="stat-value stat-value--sm" id="stat-maior"><?= is_numeric($maior) ? number_format($maior, 1) : $maior ?></span>
      </div>

      <div class="stat-card">
        <span class="stat-label">Menor pontuação</span>
        <span class="stat-value stat-value--sm" id="stat-menor"><?= is_numeric($menor) ? number_format($menor, 1) : $menor ?></span>
      </div>

      <div class="stat-card">
        <span class="stat-label">Média geral</span>
        <span class="stat-value stat-value--sm" id="stat-media"><?= is_numeric($media) ? number_format($media, 1) : $media ?></span>
      </div>

    </section>

    <section class="card card--table">
      <div class="table-header">
        <h2 class="table-title">Todas as Pontuações</h2>
        <span class="table-count" id="table-count"><?= $total ?> registros</span>
      </div>

      <?php if (empty($registros)): ?>
        <p class="empty-state" id="empty-state">Nenhum registro encontrado.</p>
      <?php else: ?>
      <div class="table-scroll">
        <table class="data-table" id="tabela-pontuacoes">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Pontuação</th>
              <th scope="col">Nível</th>
              <th scope="col">Data / Hora</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <?php
            // normaliza slug do nível para classe CSS
            function slugNivel(string $nivel): string {
              return strtolower(str_replace(
                ['É','é','Ã','ã','Ç','ç'],
                ['e','e','a','a','c','c'],
                $nivel
              ));
            }
            foreach ($registros as $r):
              $slug = slugNivel($r['nivel']);
            ?>
            <tr class="row-nivel-<?= $slug ?>">
              <td class="td-id"><?= (int)$r['id'] ?></td>
              <td class="td-score"><?= number_format((float)$r['pontuacao'], 1) ?></td>
              <td>
                <span class="nivel-badge nivel-badge--<?= $slug ?>">
                  <?= htmlspecialchars($r['nivel']) ?>
                </span>
              </td>
              <td class="td-date"><?= date('d/m/Y H:i:s', strtotime($r['data_cadastro'])) ?></td>
              <td>
                <?php if ($r['nivel'] === 'BOM'): ?>
                  <span class="status-pill status-pill--bom">🟢 BOM</span>
                <?php else: ?>
                  <span class="status-pill status-pill--fora">🔴 FORA DA FAIXA</span>
                <?php endif; ?>
              </td>
            </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
      <?php endif; ?>
    </section>

    <div class="action-bar">
      <a href="index.php" class="btn btn--primary" id="btn-novo-teste">
        <span class="btn-text">Novo Teste</span>
        <span class="btn-icon">↺</span>
      </a>
      <a href="limpar.php" class="btn btn--danger" id="btn-limpar"
         onclick="return confirm('Apagar TODOS os registros? Esta ação não pode ser desfeita.')">
        <span class="btn-text">Limpar Pontuações</span>
        <span class="btn-icon">✕</span>
      </a>
    </div>

  </main>

  <footer class="footer">
    <p>© Fernanda Maressa Dev </p>
    </footer>

</body>
</html>