<?php
$escada_html = '';
if (isset($_SESSION['escada'])) {
    $escada_html = $_SESSION['escada'];
    unset($_SESSION['escada']);
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Escada da Motivação</title>
  <link rel="stylesheet" href="style.css">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
</head>
<body>

  <header class="header">
    <div class="header-inner">
      <a href="index.php" class="header-logo">
        <span class="logo-mark"></span>
        <span class="logo-text">Escada da Motivação</span>
      </a>
      <nav class="header-nav">
        <a href="index.php" class="nav-link active">Gerar</a>
        <a href="historico.php" class="nav-link">Histórico</a>
      </nav>
    </div>
  </header>

  <section class="hero">
    <div class="hero-inner">
      <h1 class="hero-title">Construa sua<br><em>Escada de Sucesso</em></h1>
    <div class="hero-deco">
      <div class="deco-bar" style="width:16%"></div>
      <div class="deco-bar" style="width:32%"></div>
      <div class="deco-bar" style="width:50%"></div>
      <div class="deco-bar" style="width:68%"></div>
      <div class="deco-bar" style="width:86%"></div>
    </div>
  </section>

  <main class="main-container">

    <section class="card form-card">
      <div class="card-header">
        <h2 class="card-title">Configure sua Escada</h2>
        <p class="card-desc">Preencha os campos abaixo para gerar seu padrão motivacional</p>
      </div>

      <form method="POST" action="processar.php" class="form" id="formEscada" novalidate>

        <div class="form-group">
          <label class="form-label" for="meta">
            Meta / Objetivo
            <span class="label-badge">máx. 15 caracteres</span>
          </label>
          <div class="input-wrapper">
            <input
              type="text"
              id="meta"
              name="meta"
              class="form-input"
              maxlength="15"
              required
              placeholder="Ex: VENCER"
              oninput="this.value = this.value.toUpperCase(); atualizarContador(this)"
              autocomplete="off"
            >
            <span class="char-counter" id="contador">0/15</span>
          </div>
          <span class="form-hint">Convertida para maiúsculas automaticamente</span>
          <span class="form-error" id="erro-meta">Informe sua meta para continuar.</span>
        </div>

        <div class="form-grid">

          <div class="form-group">
            <label class="form-label" for="niveis">Níveis da Escada</label>
            <select id="niveis" name="niveis" class="form-select" required>
              <option value="" disabled selected>Selecione...</option>
              <option value="3">3 níveis</option>
              <option value="4">4 níveis</option>
              <option value="5">5 níveis</option>
              <option value="6">6 níveis</option>
              <option value="7">7 níveis</option>
            </select>
            <span class="form-error" id="erro-niveis">Selecione o número de níveis.</span>
          </div>

          <div class="form-group">
            <label class="form-label">Direção</label>
            <div class="radio-group">
              <label class="radio-card">
                <input type="radio" name="direcao" value="crescente" checked>
                <div class="radio-content">
                  <span class="radio-label">Crescente</span>
                  <span class="radio-desc">1 até N</span>
                </div>
              </label>
              <label class="radio-card">
                <input type="radio" name="direcao" value="decrescente">
                <div class="radio-content">
                  <span class="radio-label">Decrescente</span>
                  <span class="radio-desc">N até 1</span>
                </div>
              </label>
            </div>
          </div>

        </div>

        <button type="submit" class="btn-gerar">
          Gerar Escada
          <span class="btn-arrow">&#8594;</span>
        </button>

      </form>
    </section>

    <section class="card resultado-card">
      <div class="card-header">
        <h2 class="card-title">Resultado</h2>
        <p class="card-desc">O padrão visual da sua jornada</p>
      </div>
      <div class="escada-wrapper" id="resultado">
        <div class="placeholder-estado">
          <div class="placeholder-visual">
            <div class="placeholder-degrau" style="width:20%"></div>
            <div class="placeholder-degrau" style="width:38%"></div>
            <div class="placeholder-degrau" style="width:56%"></div>
            <div class="placeholder-degrau" style="width:74%"></div>
            <div class="placeholder-degrau" style="width:92%"></div>
          </div>
          <p class="placeholder-texto">Preencha o formulário e clique em <strong>Gerar Escada</strong></p>
        </div>
      </div>
    </section>

    <section class="card historico-card">
      <div class="card-header">
        <div>
          <h2 class="card-title">Histórico Recente</h2>
          <p class="card-desc">Últimas escadas geradas</p>
        </div>
        <a href="historico.php" class="btn-ver-mais">Ver tudo</a>
      </div>
      <div class="tabela-wrapper">
        <table class="historico-tabela">
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
          <tbody id="historico-corpo">
            <tr class="linha-vazia">
              <td colspan="6">Nenhuma escada gerada ainda. <a href="historico.php">Ver histórico completo</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

  </main>

  <footer class="footer">
  <p>© Fernanda Maressa Dev</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>