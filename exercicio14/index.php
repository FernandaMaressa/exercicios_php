<?php
session_start();

$resultado      = $_SESSION['resultado']      ?? null;
$erros          = $_SESSION['erros']          ?? [];
$valores        = $_SESSION['valores']        ?? [];
$mensagem       = $_SESSION['mensagem']       ?? null;
$mensagem_erro  = $_SESSION['mensagem_erro']  ?? null;

unset(
    $_SESSION['resultado'],
    $_SESSION['erros'],
    $_SESSION['valores'],
    $_SESSION['mensagem'],
    $_SESSION['mensagem_erro']
);

/* ── Busca histórico e estatísticas do banco ───────────────── */
$historico   = [];
$stats       = [];
$total_geral = 0;

require_once __DIR__ . '/conexao.php';

try {
    /* Histórico ordenado do mais recente ao mais antigo */
    $stmt = $pdo->query('
        SELECT id, quantidade, valor_medio, satisfacao, classificacao, data_registro
        FROM exercicio14
        ORDER BY data_registro DESC
    ');
    $historico = $stmt->fetchAll();

    /* Contagem por classificação */
    $stmt = $pdo->query('
        SELECT classificacao, COUNT(*) as total
        FROM exercicio14
        GROUP BY classificacao
    ');
    foreach ($stmt->fetchAll() as $row) {
        $stats[$row['classificacao']] = (int) $row['total'];
    }

    $total_geral = array_sum($stats);

} catch (PDOException $e) {
    $mensagem_erro = 'Erro ao carregar os dados do banco.';
}

/* ── Config visual dos tiers ───────────────────────────────── */
$configTier = [
    'Diamante'     => ['🟦', 'badge-diamante',    '#E6F1FB', '#0C447C', '#185FA5'],
    'Ouro'         => ['🟨', 'badge-ouro',         '#FAEEDA', '#633806', '#BA7517'],
    'Prata'        => ['⬜', 'badge-prata',        '#F1EFE8', '#444441', '#888780'],
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

    <!-- ═══════════════════════════════════════════════════════
         MENSAGENS DE FEEDBACK
    ══════════════════════════════════════════════════════════ -->
    <?php if ($mensagem): ?>
      <div class="mensagem-sucesso" data-cy="mensagem-sucesso">
        <?= htmlspecialchars($mensagem) ?>
      </div>
    <?php endif; ?>

    <?php if ($mensagem_erro): ?>
      <div class="mensagem-erro" data-cy="mensagem-erro">
        <?= htmlspecialchars($mensagem_erro) ?>
      </div>
    <?php endif; ?>


    <!-- ═══════════════════════════════════════════════════════
         FORMULÁRIO
    ══════════════════════════════════════════════════════════ -->
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


    <!-- ═══════════════════════════════════════════════════════
         RESULTADO
    ══════════════════════════════════════════════════════════ -->
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


    <!-- ═══════════════════════════════════════════════════════
         ESTATÍSTICAS
    ══════════════════════════════════════════════════════════ -->
    <section data-cy="estatisticas">

      <div class="block-title">
        <h2>Estatísticas gerais</h2>
        <div class="block-title-line"></div>
      </div>

      <div class="stats-grid" data-cy="cards-stats">
        <?php
        $statsConfig = [
          ['Diamante',     '🟦', 'stat-diamante',    'diamante'],
          ['Ouro',         '🟨', 'stat-ouro',         'ouro'],
          ['Prata',        '⬜', 'stat-prata',        'prata'],
          ['Bronze',       '🟫', 'stat-bronze',       'bronze'],
          ['Insuficiente', '🟥', 'stat-insuficiente', 'insuficiente'],
        ];
        foreach ($statsConfig as [$nome, $emoji, $cls, $slug]):
          $count = $stats[$nome] ?? 0;
          $pct   = $total_geral > 0 ? round(($count / $total_geral) * 100) : 0;
        ?>
          <div class="stat-card <?= $cls ?>" data-cy="stat-<?= $slug ?>">
            <div class="stat-emoji"><?= $emoji ?></div>
            <div class="stat-count" data-cy="stat-count-<?= $slug ?>"><?= $count ?></div>
            <div class="stat-nome"><?= $nome ?></div>
            <div class="stat-pct" data-cy="stat-pct-<?= $slug ?>"><?= $pct ?>%</div>
            <div class="stat-bar" data-cy="stat-bar-<?= $slug ?>"
                 style="width: <?= $pct ?>%;"></div>
          </div>
        <?php endforeach; ?>
      </div>

      <?php if ($total_geral > 0): ?>
        <p style="font-size: 0.875rem; color: #B4B2A9; text-align: center; margin-top: 0.75rem;"
           data-cy="stats-total">
          <?= $total_geral ?> avaliação<?= $total_geral > 1 ? 'ões' : '' ?> registrada<?= $total_geral > 1 ? 's' : '' ?> no total.
        </p>
      <?php endif; ?>

    </section>


    <!-- ═══════════════════════════════════════════════════════
         HISTÓRICO
    ══════════════════════════════════════════════════════════ -->
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

        <?php if (empty($historico)): ?>
          <div class="tabela-vazio" data-cy="historico-vazio">
            <div class="tabela-vazio-icon">📊</div>
            <p>Nenhuma avaliação cadastrada ainda</p>
            <span>Preencha o formulário acima para começar</span>
          </div>
        <?php else: ?>
          <?php foreach ($historico as $reg):
            $tc = $configTier[$reg['classificacao']] ?? $configTier['Insuficiente'];
            [$tEmoji, $tBadge] = $tc;
          ?>
            <div class="tabela-row" data-cy="tabela-row">
              <span class="tabela-td tabela-td-id">#<?= $reg['id'] ?></span>
              <span class="tabela-td"><?= $reg['quantidade'] ?> un</span>
              <span class="tabela-td">R$ <?= number_format($reg['valor_medio'], 2, ',', '.') ?></span>
              <span class="tabela-td"><?= number_format($reg['satisfacao'], 1, ',', '.') ?></span>
              <span class="tabela-td">
                <span class="badge-tier <?= $tBadge ?>" data-cy="tabela-classificacao">
                  <?= $tEmoji ?> <?= htmlspecialchars($reg['classificacao']) ?>
                </span>
              </span>
              <span class="tabela-td tabela-td-data">
                <?= date('d/m/Y H:i', strtotime($reg['data_registro'])) ?>
              </span>
            </div>
          <?php endforeach; ?>
        <?php endif; ?>

        <div class="tabela-footer">
          <span class="tabela-total" data-cy="tabela-total">
            <?= $total_geral ?> registro<?= $total_geral !== 1 ? 's' : '' ?>
          </span>
        </div>

      </div>
    </section>


    <!-- ── Footer ─────────────────────────────────────────── -->
    <footer class="footer">
      <p>© Fernanda Maressa Dev</p>
    </footer>

  </div>

  <script src="js/main.js"></script>
</body>
</html>