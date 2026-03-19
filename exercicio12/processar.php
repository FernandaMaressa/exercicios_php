<?php
// ============================================================
// processar.php — Escada da Motivação • Exercício 12
// Versão MOCK — sem banco de dados (Entrega 2)
// Na Entrega 3 será refatorado com conexao.php + PDO
// ============================================================

// ── 1. Receber e validar inputs ──────────────────────────
$erros = [];

$meta    = isset($_POST['meta'])    ? trim($_POST['meta'])    : '';
$niveis  = isset($_POST['niveis'])  ? $_POST['niveis']        : '';
$direcao = isset($_POST['direcao']) ? trim($_POST['direcao']) : '';

// Validar meta
if ($meta === '') {
    $erros[] = 'A meta não pode ser vazia.';
} elseif (mb_strlen($meta) > 15) {
    $erros[] = 'A meta deve ter no máximo 15 caracteres.';
}

// Forçar maiúsculas
$meta = mb_strtoupper($meta);

// Validar níveis
if ($niveis === '' || !is_numeric($niveis)) {
    $erros[] = 'Selecione o número de níveis.';
} else {
    $niveis = (int) $niveis;
    if ($niveis < 3 || $niveis > 7) {
        $erros[] = 'O número de níveis deve ser entre 3 e 7.';
    }
}

// Validar direção
$direcoesValidas = ['crescente', 'decrescente'];
if (!in_array($direcao, $direcoesValidas)) {
    $erros[] = 'Direção inválida. Escolha crescente ou decrescente.';
}

// ── 2. Se houver erros, redireciona ─────────────────────
if (!empty($erros)) {
    // Em versão mock, exibe os erros inline
    // Na Entrega 3 poderá usar session para redirecionar
}

// ── 3. Gerar a escada com loops aninhados ───────────────
/**
 * Lógica dos loops:
 *   - Loop externo: percorre os níveis (linhas da escada)
 *   - Loop interno: repete a meta N vezes em cada linha
 *   - Direção crescente:   linha 1 = 1 rep, linha N = N reps
 *   - Direção decrescente: linha 1 = N reps, linha N = 1 rep
 */
function gerarEscada(string $meta, int $niveis, string $direcao): array {
    $linhas = [];

    for ($i = 1; $i <= $niveis; $i++) {
        // Quantas repetições nesta linha?
        $repeticoes = ($direcao === 'crescente') ? $i : ($niveis - $i + 1);

        $celulas = [];
        for ($j = 1; $j <= $repeticoes; $j++) {
            $celulas[] = $meta;
        }
        $linhas[] = [
            'nivel'      => $i,
            'repeticoes' => $repeticoes,
            'celulas'    => $celulas,
        ];
    }

    return $linhas;
}

$linhasEscada = [];
if (empty($erros)) {
    $linhasEscada = gerarEscada($meta, $niveis, $direcao);
}

// ── 4. Dados MOCK do histórico recente ──────────────────
// Na Entrega 3 isso virá do banco de dados via PDO
$historicoMock = [
    [
        'id'        => 5,
        'meta'      => 'VENCER',
        'niveis'    => 5,
        'direcao'   => 'crescente',
        'data_hora' => '2025-06-10 14:32:00',
    ],
    [
        'id'        => 4,
        'meta'      => 'FOCO',
        'niveis'    => 4,
        'direcao'   => 'decrescente',
        'data_hora' => '2025-06-10 11:18:45',
    ],
    [
        'id'        => 3,
        'meta'      => 'CRESCER',
        'niveis'    => 7,
        'direcao'   => 'crescente',
        'data_hora' => '2025-06-09 20:05:12',
    ],
    [
        'id'        => 2,
        'meta'      => 'SONHAR',
        'niveis'    => 3,
        'direcao'   => 'crescente',
        'data_hora' => '2025-06-09 09:44:30',
    ],
    [
        'id'        => 1,
        'meta'      => 'LUTAR',
        'niveis'    => 6,
        'direcao'   => 'decrescente',
        'data_hora' => '2025-06-08 17:22:10',
    ],
];

// Dados mock do registro atual (simula o INSERT retornando o novo id)
$novoRegistroMock = empty($erros) ? [
    'id'        => 6,
    'meta'      => $meta,
    'niveis'    => $niveis,
    'direcao'   => $direcao,
    'data_hora' => date('Y-m-d H:i:s'),
] : null;
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resultado — Escada da Motivação</title>
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
        <a href="historico.php" class="nav-link">Histórico</a>
      </nav>
    </div>
  </header>

  <main class="main-container" id="resultado-page">

    <!-- ── Erros de validação ── -->
    <?php if (!empty($erros)): ?>
    <section class="card erro-card" id="secao-erros">
      <div class="card-header">
        <h2 class="card-title">⚠️ Dados inválidos</h2>
        <p class="card-desc">Corrija os campos abaixo e tente novamente.</p>
      </div>
      <ul class="lista-erros">
        <?php foreach ($erros as $erro): ?>
          <li><?= htmlspecialchars($erro) ?></li>
        <?php endforeach; ?>
      </ul>
      <a href="index.php" class="btn-voltar-link">← Voltar ao formulário</a>
    </section>

    <?php else: ?>

    <!-- ── Confirmação de geração ── -->
    <section class="card confirmacao-card" id="secao-confirmacao">
      <div class="confirmacao-inner">
        <span class="confirmacao-icone">🎯</span>
        <div>
          <h2 class="confirmacao-titulo">Escada gerada com sucesso!</h2>
          <p class="confirmacao-sub">
            Meta <strong><?= htmlspecialchars($meta) ?></strong> ·
            <?= $niveis ?> níveis ·
            <?= ucfirst($direcao) ?>
          </p>
          <!-- Badge MOCK visível — será removido na Entrega 3 -->
          <span class="badge-mock">⚙️ Modo Mock — sem banco de dados</span>
        </div>
      </div>
    </section>

    <!-- ── Escada Visual ── -->
    <section class="card escada-card" id="secao-escada">
      <div class="card-header">
        <h2 class="card-title">Sua Escada</h2>
        <p class="card-desc">Padrão visual gerado com loops aninhados</p>
      </div>

      <div class="escada-wrapper" id="escada-resultado">
        <table class="escada-tabela" aria-label="Escada motivacional gerada">
          <tbody>
            <?php foreach ($linhasEscada as $linha): ?>
            <tr
              class="escada-linha"
              data-nivel="<?= $linha['nivel'] ?>"
              data-reps="<?= $linha['repeticoes'] ?>"
            >
              <td class="nivel-numero"><?= $linha['nivel'] ?></td>
              <td class="nivel-celulas">
                <?php foreach ($linha['celulas'] as $idx => $palavra): ?>
                  <span class="palavra-chip"><?= htmlspecialchars($palavra) ?></span>
                <?php endforeach; ?>
              </td>
              <td class="nivel-contagem"><?= $linha['repeticoes'] ?>x</td>
            </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>

      <div class="escada-acoes">
        <a href="index.php" class="btn-acao btn-secundario">← Nova Escada</a>
        <a href="historico.php" class="btn-acao btn-primario">Ver Histórico →</a>
      </div>
    </section>

    <!-- ── Histórico Recente (MOCK) ── -->
    <section class="card historico-card" id="secao-historico">
      <div class="card-header">
        <div>
          <h2 class="card-title">Histórico Recente</h2>
          <p class="card-desc">Últimas escadas geradas <span class="badge-mock">Mock</span></p>
        </div>
        <a href="historico.php" class="btn-ver-mais">Ver tudo</a>
      </div>

      <div class="tabela-wrapper">
        <table class="historico-tabela" id="tabela-historico">
          <thead>
            <tr>
              <th>#</th>
              <th>Meta</th>
              <th>Níveis</th>
              <th>Direção</th>
              <th>Data / Hora</th>
            </tr>
          </thead>
          <tbody>
            <!-- Registro recém-gerado (mock) em destaque -->
            <?php if ($novoRegistroMock): ?>
            <tr class="linha-nova" id="linha-novo-registro">
              <td><?= $novoRegistroMock['id'] ?></td>
              <td><strong><?= htmlspecialchars($novoRegistroMock['meta']) ?></strong></td>
              <td><?= $novoRegistroMock['niveis'] ?></td>
              <td><?= ucfirst($novoRegistroMock['direcao']) ?></td>
              <td><?= date('d/m/Y H:i', strtotime($novoRegistroMock['data_hora'])) ?></td>
            </tr>
            <?php endif; ?>

            <?php foreach ($historicoMock as $item): ?>
            <tr>
              <td><?= $item['id'] ?></td>
              <td><?= htmlspecialchars($item['meta']) ?></td>
              <td><?= $item['niveis'] ?></td>
              <td><?= ucfirst($item['direcao']) ?></td>
              <td><?= date('d/m/Y H:i', strtotime($item['data_hora'])) ?></td>
            </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    </section>

    <?php endif; ?>

  </main>

  <footer class="footer">
    <p>© Fernanda Maressa Dev</p>
  </footer>

</body>
</html>