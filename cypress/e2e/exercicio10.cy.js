describe('Exercício 10 - Sistema de Monitoramento de Energia', () => {
  beforeEach(() => {
    cy.visit('/exercicio10/index.php')
  })

  // ═══════════════════════════════════════════════════════════
  // Testes Automatizados do FRONT-END
  // ═══════════════════════════════════════════════════════════

  it('Carrega a página corretamente', () => {
    cy.contains('Registrar Consumo Diário');
  });

  it('Exibe a logo no header', () => {
    cy.get('header img').should('be.visible');
  });

  it('Exibe o campo de data', () => {
    cy.get('input[type="date"]').should('exist').and('be.visible');
  });

  it('Exibe o campo de consumo em kWh', () => {
    cy.get('input[type="number"]').should('exist').and('be.visible');
  });

  it('Botão Registrar Consumo existe e está visível', () => {
    cy.get('button[value="registrar"]')
      .should('exist')
      .and('be.visible')
      .and('contain', 'Registrar Consumo');
  });

  it('Botão Ver Relatório e Estatísticas existe e está visível', () => {
    cy.get('button[value="relatorio"]')
      .should('exist')
      .and('be.visible')
      .and('contain', 'Ver Relatório e Estatísticas');
  });

  it('Impede envio sem preencher os campos obrigatórios', () => {
    cy.get('button[value="registrar"]').click();
    cy.url().should('include', 'index.php');
  });

  it('Campo kWh não aceita valor zero ou negativo', () => {
    cy.get('input[name="consumo_kwh"]').should('have.attr', 'min', '0.01');
  });

  it('Campo kWh aceita valores decimais (step 0.01)', () => {
    cy.get('input[name="consumo_kwh"]').should('have.attr', 'step', '0.01');
  });

  it('Formulário aponta para processar.php via POST', () => {
    cy.get('form')
      .should('have.attr', 'action', 'processar.php')
      .and('have.attr', 'method', 'POST');
  });

  it('Verifica layout responsivo em tela de celular (iPhone 12)', () => {
    cy.viewport(390, 844);
    cy.get('.form-container').should('be.visible');
    cy.get('button[value="registrar"]').should('be.visible');
    cy.get('button[value="relatorio"]').should('be.visible');
  });

  it('Footer exibe o texto correto', () => {
    cy.get('footer').should('contain', 'EcoVolt • Sistema de Monitoramento de Energia');
  });

  it('Header tem cor de fundo aplicada', () => {
    cy.get('header').should('have.css', 'background-color', 'rgb(10, 61, 98)');
  });

  it('Botão Registrar tem classe azul aplicada', () => {
    cy.get('button[value="registrar"]').should('have.class', 'azul');
  });

  it('Botão Relatório tem classe branco aplicada', () => {
    cy.get('button[value="relatorio"]').should('have.class', 'branco');
  });

  // ═══════════════════════════════════════════════════════════
  // Testes Automatizados do BACK-END
  // ═══════════════════════════════════════════════════════════

  // NOTA DA DEV: O formulário possui campos "required", então é necessário
  // preencher data e kWh antes de qualquer submit para o processar.php.
  // Por isso todos os testes de back-end preenchem os campos antes de clicar.

  it('Botão "Ver Relatório" redireciona para processar.php', () => {
    cy.get('input[name="data_consumo"]').type('2026-03-01');
    cy.get('input[name="consumo_kwh"]').type('100');
    cy.get('button[value="relatorio"]').click();
    cy.url().should('include', 'processar.php');
  });

  it('Página de relatório exibe o card de estatísticas', () => {
    cy.get('input[name="data_consumo"]').type('2026-03-01');
    cy.get('input[name="consumo_kwh"]').type('100');
    cy.get('button[value="relatorio"]').click();
    cy.get('#estatisticas').should('be.visible');
  });

  it('Página de relatório exibe o card da tabela de registros', () => {
    cy.get('input[name="data_consumo"]').type('2026-03-01');
    cy.get('input[name="consumo_kwh"]').type('100');
    cy.get('button[value="relatorio"]').click();
    cy.get('#tabela-registros').should('be.visible');
  });

  it('Tabela exibe as colunas: Data, Consumo (kWh) e Classificação', () => {
    cy.get('input[name="data_consumo"]').type('2026-03-01');
    cy.get('input[name="consumo_kwh"]').type('100');
    cy.get('button[value="relatorio"]').click();
    cy.get('thead th').eq(0).should('contain', 'Data');
    cy.get('thead th').eq(1).should('contain', 'Consumo (kWh)');
    cy.get('thead th').eq(2).should('contain', 'Classificação');
  });

  it('Tabela exibe registros no corpo (tbody)', () => {
    cy.get('input[name="data_consumo"]').type('2026-03-01');
    cy.get('input[name="consumo_kwh"]').type('100');
    cy.get('button[value="relatorio"]').click();
    cy.get('tbody tr').should('have.length.greaterThan', 0);
  });

  it('Estatísticas exibem total de registros', () => {
    cy.get('input[name="data_consumo"]').type('2026-03-01');
    cy.get('input[name="consumo_kwh"]').type('100');
    cy.get('button[value="relatorio"]').click();
    cy.get('#stat-total').should('exist').and('not.be.empty');
  });

  it('Estatísticas exibem média geral em kWh', () => {
    cy.get('input[name="data_consumo"]').type('2026-03-01');
    cy.get('input[name="consumo_kwh"]').type('100');
    cy.get('button[value="relatorio"]').click();
    cy.get('#stat-media').should('contain', 'kWh');
  });

  it('Estatísticas exibem maior consumo em kWh', () => {
    cy.get('input[name="data_consumo"]').type('2026-03-01');
    cy.get('input[name="consumo_kwh"]').type('100');
    cy.get('button[value="relatorio"]').click();
    cy.get('#stat-maior').should('contain', 'kWh');
  });

  it('Estatísticas exibem menor consumo em kWh', () => {
    cy.get('input[name="data_consumo"]').type('2026-03-01');
    cy.get('input[name="consumo_kwh"]').type('100');
    cy.get('button[value="relatorio"]').click();
    cy.get('#stat-menor').should('contain', 'kWh');
  });

  it('Estatísticas exibem dias Econômicos com percentual', () => {
    cy.get('input[name="data_consumo"]').type('2026-03-01');
    cy.get('input[name="consumo_kwh"]').type('100');
    cy.get('button[value="relatorio"]').click();
    cy.get('#stat-eco').invoke('text').should('match', /\d+.*%/);
  });

  it('Estatísticas exibem dias Moderados com percentual', () => {
    cy.get('input[name="data_consumo"]').type('2026-03-01');
    cy.get('input[name="consumo_kwh"]').type('100');
    cy.get('button[value="relatorio"]').click();
    cy.get('#stat-mod').invoke('text').should('match', /\d+.*%/);
  });

  it('Estatísticas exibem dias Alto com percentual', () => {
    cy.get('input[name="data_consumo"]').type('2026-03-01');
    cy.get('input[name="consumo_kwh"]').type('100');
    cy.get('button[value="relatorio"]').click();
    cy.get('#stat-alto').invoke('text').should('match', /\d+.*%/);
  });

  it('Linhas econômicas têm classe linha-economico', () => {
    cy.get('input[name="data_consumo"]').type('2026-03-01');
    cy.get('input[name="consumo_kwh"]').type('100');
    cy.get('button[value="relatorio"]').click();
    cy.get('tbody tr.linha-economico').should('exist');
  });

  it('Linhas moderadas têm classe linha-moderado', () => {
    cy.get('input[name="data_consumo"]').type('2026-03-01');
    cy.get('input[name="consumo_kwh"]').type('100');
    cy.get('button[value="relatorio"]').click();
    cy.get('tbody tr.linha-moderado').should('exist');
  });

  it('Linhas altas têm classe linha-alto', () => {
    cy.get('input[name="data_consumo"]').type('2026-03-01');
    cy.get('input[name="consumo_kwh"]').type('100');
    cy.get('button[value="relatorio"]').click();
    cy.get('tbody tr.linha-alto').should('exist');
  });

  it('Registrar consumo econômico (≤ 100 kWh) exibe sucesso', () => {
    cy.get('input[name="data_consumo"]').type('2026-03-01');
    cy.get('input[name="consumo_kwh"]').type('80');
    cy.get('button[value="registrar"]').click();
    cy.get('.msg-sucesso').should('contain', 'Consumo registrado com sucesso!');
  });

  it('Registrar consumo moderado (101–200 kWh) exibe sucesso', () => {
    cy.get('input[name="data_consumo"]').type('2026-03-02');
    cy.get('input[name="consumo_kwh"]').type('150');
    cy.get('button[value="registrar"]').click();
    cy.get('.msg-sucesso').should('contain', 'Consumo registrado com sucesso!');
  });

  it('Registrar consumo alto (> 200 kWh) exibe sucesso', () => {
    cy.get('input[name="data_consumo"]').type('2026-03-03');
    cy.get('input[name="consumo_kwh"]').type('250');
    cy.get('button[value="registrar"]').click();
    cy.get('.msg-sucesso').should('contain', 'Consumo registrado com sucesso!');
  });

  it('Botão Voltar ao Formulário redireciona para index.php', () => {
    cy.get('input[name="data_consumo"]').type('2026-03-01');
    cy.get('input[name="consumo_kwh"]').type('100');
    cy.get('button[value="relatorio"]').click();
    cy.get('#btn-voltar').click();
    cy.url().should('include', 'index.php');
  });

  it('Relatório exibe o footer corretamente', () => {
    cy.get('input[name="data_consumo"]').type('2026-03-01');
    cy.get('input[name="consumo_kwh"]').type('100');
    cy.get('button[value="relatorio"]').click();
    cy.get('footer').should('contain', 'EcoVolt • Sistema de Monitoramento de Energia');
  });

  it('Relatório exibe a logo no header', () => {
    cy.get('input[name="data_consumo"]').type('2026-03-01');
    cy.get('input[name="consumo_kwh"]').type('100');
    cy.get('button[value="relatorio"]').click();
    cy.get('header img').should('be.visible');
  });

});