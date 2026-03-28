<?php
session_start();
$mensagem      = $_SESSION['mensagem']      ?? null;
$tipo_mensagem = $_SESSION['tipo_mensagem'] ?? null;
unset($_SESSION['mensagem'], $_SESSION['tipo_mensagem']);
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Exercício 13 — Pontuações</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,400&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="style.css"/>
</head>
<body>

  <div class="bg-grid"></div>

  <main class="container">

    <header class="page-header">
      <span class="badge-label">Exercício 13</span>
      <h1>Avaliação de<br/><em>Desempenho</em></h1>
      <p class="subtitle">Informe as pontuações dos alunos. Digite <strong>-1</strong> para encerrar e ver o resultado.</p>
    </header>

    <?php if ($mensagem): ?>
    <div class="alert alert--<?= htmlspecialchars($tipo_mensagem) ?>" role="alert" id="alert-msg">
      <?= htmlspecialchars($mensagem) ?>
    </div>
    <?php endif; ?>

    <div class="card card--form">
      <form action="processar.php" method="POST" id="form-pontuacao" novalidate>
        <div class="field-group">
          <label for="pontuacao" class="field-label">Pontuação do Aluno</label>
          <div class="input-wrapper">
            <input
              type="number"
              id="pontuacao"
              name="pontuacao"
              class="field-input"
              placeholder="0.0 — 10.0   (ou -1 para encerrar)"
              step="0.1"
              min="-1"
              max="10"
              required
              autocomplete="off"
            />
            <span class="input-suffix" id="nivel-preview"></span>
          </div>
          <span class="field-hint" id="field-error" aria-live="polite"></span>
        </div>

        <button type="submit" class="btn btn--primary" id="btn-submit">
          <span class="btn-text">Registrar Pontuação</span>
          <span class="btn-icon">→</span>
        </button>
      </form>
    </div>

    <aside class="card card--legend">
      <h2 class="legend-title">Faixas de Desempenho</h2>
      <ul class="legend-list" role="list">
        <li class="legend-item legend-item--baixo">
          <span class="legend-dot"></span>
          <span class="legend-range">0.0 — 4.9</span>
          <span class="legend-label">BAIXO</span>
        </li>
        <li class="legend-item legend-item--medio">
          <span class="legend-dot"></span>
          <span class="legend-range">5.0 — 6.9</span>
          <span class="legend-label">MÉDIO</span>
        </li>
        <li class="legend-item legend-item--bom">
          <span class="legend-dot"></span>
          <span class="legend-range">7.0 — 8.4</span>
          <span class="legend-label">BOM</span>
        </li>
        <li class="legend-item legend-item--excelente">
          <span class="legend-dot"></span>
          <span class="legend-range">8.5 — 10.0</span>
          <span class="legend-label">EXCELENTE</span>
        </li>
      </ul>
    </aside>

  </main>

  <footer class = "footer">
  <p>© Fernanda Maressa Dev</p>
  </footer>

  <script src="preview.js"></script>
</body>
</html>