<?php
session_start();

$resultado = $_SESSION['resultado'] ?? null;
$erros     = $_SESSION['erros']     ?? [];
$valores   = $_SESSION['valores']   ?? [];

unset($_SESSION['resultado'], $_SESSION['erros'], $_SESSION['valores']);

$configTier = [
  'Diamante'     => ['🟦', 'badge-diamante',    '#E6F1FB', '#0C447C', '#185FA5'],
  'Ouro'         => ['🟨', 'badge-ouro',         '#FAEEDA', '#633806', '#BA7517'],
  'Prata'        => ['🥈', 'badge-prata',        '#F1EFE8', '#444441', '#888780'],
  'Bronze'       => ['🟫', 'badge-bronze',       '#FAECE7', '#712B13', '#993C1D'],
  'Insuficiente' => ['🟥', 'badge-insuficiente', '#FCEBEB', '#791F1F', '#E24B4A'],
];
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Avaliação de Vendas — Novos Titans</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>

  <div class="container">

    <section class="card animate-entrada" data-cy="formulario">

      <div class="section-header">
        <div class="section-header-text">
          <h2>Avaliação de Vendas</h2>
          <p>Preencha os três campos para classificar a venda</p>
        </div>
      </div>

      <form action="processar.php" method="POST" id="form-avaliacao" novalidate>

        <div class="form-grid">

          <div class="form-field" data-cy="campo-quantidade">
            <label class="form-label" for="quantidade">Quantidade vendida:</label>
            <input
              class="form-input <?= isset($erros['quantidade']) ? 'input-erro' : '' ?>"
              type="number"
              id="quantidade"
              name="quantidade"
              min="0"
              max="100"
              step="1"
              placeholder="0 – 100"
              value="<?= htmlspecialchars($valores['quantidade'] ?? '') ?>"
              data-cy="input-quantidade"
              autocomplete="off"
            />
            <?php if (isset($erros['quantidade'])): ?>
              <span class="form-hint hint-erro" data-cy="erro-quantidade">
                <?= htmlspecialchars($erros['quantidade']) ?>
              </span>
            <?php else: ?>
              <span class="form-hint">unidades · mín: 0 · máx: 100</span>
            <?php endif; ?>
          </div>

          <div class="form-field" data-cy="campo-valor">
            <label class="form-label" for="valor_medio">Valor médio do item:</label>
            <input
              class="form-input <?= isset($erros['valor_medio']) ? 'input-erro' : '' ?>"
              type="number"
              id="valor_medio"
              name="valor_medio"
              min="0"
              max="500"
              step="0.01"
              placeholder="R$ 0,00 – R$ 500,00"
              value="<?= htmlspecialchars($valores['valor_medio'] ?? '') ?>"
              data-cy="input-valor"
              autocomplete="off"
            />
            <?php if (isset($erros['valor_medio'])): ?>
              <span class="form-hint hint-erro" data-cy="erro-valor">
                <?= htmlspecialchars($erros['valor_medio']) ?>
              </span>
            <?php else: ?>
              <span class="form-hint">reais · mín: R$ 0 · máx: R$ 500</span>
            <?php endif; ?>
          </div>

          <div class="form-field" data-cy="campo-satisfacao">
            <label class="form-label" for="satisfacao">Satisfação do cliente:</label>
            <input
              class="form-input <?= isset($erros['satisfacao']) ? 'input-erro' : '' ?>"
              type="number"
              id="satisfacao"
              name="satisfacao"
              min="0"
              max="10"
              step="0.1"
              placeholder="0,0 – 10,0"
              value="<?= htmlspecialchars($valores['satisfacao'] ?? '') ?>"
              data-cy="input-satisfacao"
              autocomplete="off"
            />
            <?php if (isset($erros['satisfacao'])): ?>
              <span class="form-hint hint-erro" data-cy="erro-satisfacao">
                <?= htmlspecialchars($erros['satisfacao']) ?>
              </span>
            <?php else: ?>
              <span class="form-hint">nota · mín: 0,0 · máx: 10,0</span>
            <?php endif; ?>
          </div>

        </div>

        <button type="submit" class="btn-avaliar" data-cy="btn-avaliar">
          Avaliar Venda
        </button>

      </form>
    </section>


    <?php if ($resultado): ?>
    <?php
      $t = $configTier[$resultado['classificacao']] ?? $configTier['Insuficiente'];
      [$emoji, $badgeClass, $bgTier, $textTier, $accentTier] = $t;
    ?>
    <section
      class="card resultado-card"
      style="border-left-color: <?= $accentTier ?>;"
      data-cy="resultado"
    >
      <div class="resultado-topo">

        <div class="resultado-info">
          <div class="resultado-icone" style="background: <?= $bgTier ?>;">
            <?= $emoji ?>
          </div>
          <div>
            <p class="resultado-label">Resultado da avaliação</p>
            <h3 class="resultado-titulo" style="color: <?= $accentTier ?>;"
                data-cy="resultado-classificacao">
              Venda <?= htmlspecialchars($resultado['classificacao']) ?>
            </h3>
          </div>
        </div>

        <span class="badge-tier <?= $badgeClass ?>">
          <?= $emoji ?> <?= htmlspecialchars($resultado['classificacao']) ?>
        </span>

      </div>

      <div class="resultado-resumo">
        <?php
        $resumoItens = [
          [
            'label'   => 'Quantidade',
            'valor'   => $resultado['quantidade'] . ' un',
            'atingiu' => $resultado['quantidade'] >= 50,
          ],
          [
            'label'   => 'Valor médio',
            'valor'   => 'R$ ' . number_format($resultado['valor_medio'], 2, ',', '.'),
            'atingiu' => $resultado['valor_medio'] >= 200,
          ],
          [
            'label'   => 'Satisfação',
            'valor'   => number_format($resultado['satisfacao'], 1, ',', '.'),
            'atingiu' => $resultado['satisfacao'] >= 9.0,
          ],
        ];
        foreach ($resumoItens as $item):
          $cls    = $item['atingiu'] ? 'resumo-atingido' : 'resumo-nao-atingido';
          $status = $item['atingiu'] ? '✓ critério top atingido' : '— abaixo do critério top';
        ?>
          <div class="resumo-item <?= $cls ?>">
            <span class="resumo-item-label"><?= $item['label'] ?></span>
            <span class="resumo-item-valor"><?= $item['valor'] ?></span>
            <span class="resumo-item-status"><?= $status ?></span>
          </div>
        <?php endforeach; ?>
      </div>

    </section>
    <?php endif; ?>

    <section data-cy="estatisticas">

      <div class="block-title">
        <h2>Estatísticas gerais</h2>
        <div class="block-title-line"></div>
      </div>

      <div class="stats-grid" data-cy="cards-stats">
        <?php
        $statsConfig = [
          ['Diamante',     '🟦', 'stat-diamante',     'diamante'],
          ['Ouro',         '🟨', 'stat-ouro',          'ouro'],
          ['Prata',        '⬜', 'stat-prata',         'prata'],
          ['Bronze',       '🟫', 'stat-bronze',        'bronze'],
          ['Insuficiente', '🟥', 'stat-insuficiente',  'insuficiente'],
        ];
        foreach ($statsConfig as [$nome, $emoji, $cls, $slug]): ?>
          <div class="stat-card <?= $cls ?>" data-cy="stat-<?= $slug ?>">
            <div class="stat-emoji"><?= $emoji ?></div>
            <div class="stat-count" data-cy="stat-count-<?= $slug ?>">—</div>
            <div class="stat-nome"><?= $nome ?></div>
            <div class="stat-pct" data-cy="stat-pct-<?= $slug ?>">—</div>
            <div class="stat-bar" data-cy="stat-bar-<?= $slug ?>" style="width: 0%;"></div>
          </div>
        <?php endforeach; ?>
      </div>

      <p style="font-size: 0.875rem; color: #B4B2A9; text-align: center; margin-top: 0.75rem;"
         data-cy="stats-aviso">
        As estatísticas serão carregadas após a conexão com o banco de dados.
      </p>

    </section>


    <section data-cy="historico">

      <div class="historico-header-row">
        <div class="block-title" style="margin-bottom: 0; flex: 1;">
          <h2>Histórico de avaliações</h2>
          <div class="block-title-line"></div>
        </div>
        <form action="limpar.php" method="POST" data-cy="form-limpar"
              onsubmit="return confirm('Apagar todos os registros? Esta ação não pode ser desfeita.')">
          <button type="submit" class="btn-limpar" data-cy="btn-limpar">
            Limpar histórico.
          </button>
        </form>
      </div>

      <div class="tabela-wrapper" data-cy="tabela-historico">

        <div class="tabela-head">
          <span class="tabela-th">ID</span>
          <span class="tabela-th">Qtd</span>
          <span class="tabela-th">Valor médio</span>
          <span class="tabela-th">Satisfação</span>
          <span class="tabela-th">Classificação</span>
          <span class="tabela-th">Data</span>
        </div>

        <div class="tabela-vazio" data-cy="historico-vazio">
          <div class="tabela-vazio-icon">📊</div>
          <p>Nenhuma avaliação cadastrada ainda</p>
          <span>As avaliações aparecerão aqui após a conexão com o banco</span>
        </div>

        <div class="tabela-footer">
          <span class="tabela-total" data-cy="tabela-total">0 registros</span>
        </div>

      </div>
    </section>


    <footer class="footer">
        <p>© Fernanda Maressa Dev</p>
    </footer>

  </div>

  <script src="js/main.js"></script>

</body>
</html>