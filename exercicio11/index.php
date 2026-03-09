<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculadora de Múltiplos</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<header>
    <div class="header-icon">✕</div>
    <div class="header-text">
        <h1>Calculadora de Múltiplos</h1>
        <span>Exercício 11 — Programação Web</span>
    </div>
</header>

<main>
    <div class="form-card">

        <div class="form-card-header">
            <h2>Configurar Cálculo</h2>
            <p>Preencha os campos abaixo para calcular os múltiplos</p>
        </div>

        <form class="form-body" action="processar.php" method="POST">

            <!-- Número base -->
            <div class="field-group">
                <label for="numero_base">
                    Número base <span class="required">*</span>
                </label>
                <input
                    type="number"
                    id="numero_base"
                    name="numero_base"
                    placeholder="Ex: 7"
                    step="any"
                    required
                >
                <span class="field-hint">Pode ser inteiro ou decimal.</span>
            </div>

            <!-- Limite e ordenação lado a lado -->
            <div class="field-row">

                <div class="field-group">
                    <label for="limite">
                        Quantidade de múltiplos <span class="required">*</span>
                    </label>
                    <input
                        type="number"
                        id="limite"
                        name="limite"
                        value="10"
                        min="1"
                        step="1"
                        required
                    >
                    <span class="field-hint">Mínimo: 1</span>
                </div>

                <div class="field-group">
                    <label for="ordenacao">
                        Ordenação <span class="required">*</span>
                    </label>
                    <div class="select-wrapper">
                        <select id="ordenacao" name="ordenacao" required>
                            <option value="crescente">Crescente</option>
                            <option value="decrescente">Decrescente</option>
                        </select>
                    </div>
                </div>

            </div>

            <div class="divider"></div>

            <!-- Filtro par/ímpar -->
            <div class="field-group">
                <label for="filtro">
                    Filtrar resultados
                    <span class="optional">(opcional)</span>
                </label>
                <div class="select-wrapper">
                    <select id="filtro" name="filtro">
                        <option value="todos">Todos</option>
                        <option value="pares">Apenas pares</option>
                        <option value="impares">Apenas ímpares</option>
                    </select>
                </div>

                <div class="filter-legend">
                    <span class="filter-badge todos">Todos</span>
                    <span class="filter-badge par">Apenas pares</span>
                    <span class="filter-badge impar">Apenas ímpares</span>
                </div>
            </div>

            <div class="divider"></div>

            <!-- Botão -->
            <button type="submit" name="acao" value="calcular" class="btn-submit" id="btn-calcular">
                Calcular Múltiplos
            </button>

        </form>

    </div>
</main>

<footer>
    <p>© Fernanda Maressa Dev</p>
</footer>

</body>
</html>
