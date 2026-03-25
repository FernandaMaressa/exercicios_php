<?php
// ============================================================
// Versão FINAL — com banco de dados via conexao.php + PDO
// ============================================================

require_once 'conexao.php';

// ── 1. Receber e validar inputs ──────────────────────────────
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

// ── 2. Salvar no banco e gerar escada se não houver erros ────
$novoId       = null;
$data_hora    = null;
$linhasEscada = [];

if (empty($erros)) {

    // INSERT na tabela exercicio12
    $stmt = $pdo->prepare(
        'INSERT INTO exercicio12 (meta, niveis, direcao) VALUES (:meta, :niveis, :direcao)'
    );
    $stmt->execute([
        ':meta'    => $meta,
        ':niveis'  => $niveis,
        ':direcao' => $direcao,
    ]);

    $novoId    = (int) $pdo->lastInsertId();
    $data_hora = date('Y-m-d H:i:s');

    // Gerar escada com loops aninhados
    // Loop externo: percorre os níveis (linhas)
    // Loop interno: repete a meta N vezes em cada linha
    for ($i = 1; $i <= $niveis; $i++) {
        $repeticoes = ($direcao === 'crescente') ? $i : ($niveis - $i + 1);

        $celulas = [];
        for ($j = 1; $j <= $repeticoes; $j++) {
            $celulas[] = $meta;
        }

        $linhasEscada[] = [
            'nivel'      => $i,
            'repeticoes' => $repeticoes,
            'celulas'    => $celulas,
        ];
    }
}

// ── 3. Buscar histórico recente do banco (últimos 5) ─────────
$historico = [];
if (empty($erros)) {
    $stmtHist = $pdo->query(
        'SELECT id, meta, niveis, direcao, data_hora
         FROM exercicio12
         ORDER BY data_hora DESC
         LIMIT 5'
    );
    $historico = $stmtHist->fetchAll();
}
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
          <span class="confirmacao-id">
            Registro #<?= $novoId ?> salvo em <?= date('d/m/Y \à\s H:i', strtotime($data_hora)) ?>
          </span>
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

      <div class="escada-acoes">
        <a href="index.php" class="btn-acao btn-secundario">← Nova Escada</a>
        <a href="historico.php" class="btn-acao btn-primario">Ver Histórico →</a>
      </div>
    </section>

    <!-- ── Histórico Recente (BD) ── -->
    <section class="card historico-card" id="secao-historico">
      <div class="card-header">
        <div>
          <h2 class="card-title">Histórico Recente</h2>
          <p class="card-desc">Últimas 5 escadas salvas no banco</p>
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
            <?php if (empty($historico)): ?>
            <tr class="linha-vazia">
              <td colspan="5">Nenhum registro encontrado.</td>
            </tr>
            <?php else: ?>
              <?php foreach ($historico as $item): ?>
              <tr <?= $item['id'] === $novoId ? 'class="linha-nova" id="linha-novo-registro"' : '' ?>>
                <td><?= $item['id'] ?></td>
                <td>
                  <?php if ($item['id'] === $novoId): ?>
                    <strong><?= htmlspecialchars($item['meta']) ?></strong>
                  <?php else: ?>
                    <?= htmlspecialchars($item['meta']) ?>
                  <?php endif; ?>
                </td>
                <td><?= $item['niveis'] ?></td>
                <td><?= ucfirst($item['direcao']) ?></td>
                <td><?= date('d/m/Y H:i', strtotime($item['data_hora'])) ?></td>
              </tr>
              <?php endforeach; ?>
            <?php endif; ?>
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