<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simulador de Investimento — Exercício 15</title>
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
</head>
<body>

<div class="page-wrapper">
    <header class="site-header">
        <div class="header-inner">
            <div class="header-label">Exercício 15</div>
            <h1 class="header-title">Simulador de <span class="accent">Investimento</span></h1>
            <p class="header-sub">Descubra em quantos meses seu capital atinge a meta com rendimento de <strong>8% ao mês</strong>.</p>
        </div>
        <div class="header-orb orb-1"></div>
        <div class="header-orb orb-2"></div>
    </header>

    <main class="main-content">

        <section class="card form-card">
            <h2 class="card-title">Nova Simulação</h2>
            <p class="card-hint">A meta deve ser maior que o valor inicial.</p>

            <form action="simular.php" method="POST" id="form-simulacao" novalidate>

                <div class="form-group">
                    <label for="valor_inicial">Valor Inicial (R$)</label>
                    <input
                        type="number"
                        id="valor_inicial"
                        name="valor_inicial"
                        placeholder="Ex: 1000.00"
                        min="0.01"
                        step="0.01"
                    >
                    <span class="field-error" id="erro-valor"></span>
                </div>

                <div class="form-group">
                    <label for="meta">Meta Financeira (R$)</label>
                    <input
                        type="number"
                        id="meta"
                        name="meta"
                        placeholder="Ex: 5000.00"
                        min="0.01"
                        step="0.01"
                    >
                    <span class="field-error" id="erro-meta"></span>
                </div>

                <div class="form-actions">
                    <button type="submit" class="btn btn--primary" id="btn-simular">
                        Simular Investimento
                    </button>
                    <button type="button" class="btn btn--ghost" id="btn-nova">
                        Nova Simulação
                    </button>
                </div>
            </form>
        </section>

        <section class="card historico-card">
            <div class="historico-header">
                <h2 class="card-title">Histórico de Simulações</h2>
            </div>
            <p class="empty-msg">Nenhuma simulação registrada ainda.</p>
        </section>

    </main>

    <footer class="site-footer">
        <p>© Fernanda Maressa Dev</p>
    </footer>

</div>

<script src="main.js"></script>
</body>
</html>