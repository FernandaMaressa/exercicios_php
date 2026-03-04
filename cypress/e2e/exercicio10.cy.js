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

// ═══════════════════════════════════════════════════════════
  // Testes Automatizados do BANCO DE DADOS
  // ═══════════════════════════════════════════════════════════

  it('Página carrega sem erro de conexão com o banco', () => {
    cy.get('input[name="data_consumo"]').type('2026-03-01');
    cy.get('input[name="consumo_kwh"]').type('100');
    cy.get('button[value="relatorio"]').click();
    cy.get('body').should('not.contain', 'Erro de conexão');
    cy.get('body').should('not.contain', 'PDOException');
    cy.get('body').should('not.contain', 'Fatal error');
  });

  it('Registrar consumo econômico persiste no banco e aparece na tabela', () => {
    // Gera data única para não conflitar com outros testes
    const data = '2026-04-01';
    cy.get('input[name="data_consumo"]').type(data);
    cy.get('input[name="consumo_kwh"]').type('75');
    cy.get('button[value="registrar"]').click();
    cy.get('.msg-sucesso').should('contain', 'Consumo registrado com sucesso!');
    cy.get('tbody').should('contain', 'Econômico');
  });

  it('Registrar consumo moderado persiste no banco e aparece na tabela', () => {
    const data = '2026-04-02';
    cy.get('input[name="data_consumo"]').type(data);
    cy.get('input[name="consumo_kwh"]').type('155');
    cy.get('button[value="registrar"]').click();
    cy.get('.msg-sucesso').should('contain', 'Consumo registrado com sucesso!');
    cy.get('tbody').should('contain', 'Moderado');
  });

  it('Registrar consumo alto persiste no banco e aparece na tabela', () => {
    const data = '2026-04-03';
    cy.get('input[name="data_consumo"]').type(data);
    cy.get('input[name="consumo_kwh"]').type('210');
    cy.get('button[value="registrar"]').click();
    cy.get('.msg-sucesso').should('contain', 'Consumo registrado com sucesso!');
    cy.get('tbody').should('contain', 'Alto');
  });

  it('Após registro, o total de registros aumenta em 1', () => {
    // Lê o total atual
    cy.get('input[name="data_consumo"]').type('2026-04-10');
    cy.get('input[name="consumo_kwh"]').type('90');
    cy.get('button[value="relatorio"]').click();
    cy.get('#stat-total').invoke('text').then((textoAntes) => {
      const totalAntes = parseInt(textoAntes);
      cy.visit('/exercicio10/index.php');
      cy.get('input[name="data_consumo"]').type('2026-04-11');
      cy.get('input[name="consumo_kwh"]').type('90');
      cy.get('button[value="registrar"]').click();
      cy.get('#stat-total').invoke('text').then((textoDepois) => {
        const totalDepois = parseInt(textoDepois);
        expect(totalDepois).to.equal(totalAntes + 1);
      });
    });
  });

  it('Dados são exibidos ordenados por data (ASC)', () => {
    cy.get('input[name="data_consumo"]').type('2026-04-10');
    cy.get('input[name="consumo_kwh"]').type('100');
    cy.get('button[value="relatorio"]').click();
    cy.get('tbody tr').then((linhas) => {
      const datas = [...linhas].map(tr =>
        tr.querySelector('td:first-child').innerText
      );
      const datasOrdenadas = [...datas].sort((a, b) => {
        // Converte DD/MM/YYYY para YYYY-MM-DD para comparar
        const toISO = d => d.split('/').reverse().join('-');
        return toISO(a).localeCompare(toISO(b));
      });
      expect(datas).to.deep.equal(datasOrdenadas);
    });
  });

  it('Estatísticas refletem os dados reais do banco', () => {
    cy.get('input[name="data_consumo"]').type('2026-04-10');
    cy.get('input[name="consumo_kwh"]').type('100');
    cy.get('button[value="relatorio"]').click();
    cy.get('#stat-total').invoke('text').then((txt) => {
      expect(parseInt(txt)).to.be.greaterThan(0);
    });
    cy.get('#stat-media').should('contain', 'kWh');
    cy.get('#stat-maior').invoke('text').then((maiorTxt) => {
      cy.get('#stat-menor').invoke('text').then((menorTxt) => {
        const maior = parseFloat(maiorTxt.replace(',', '.'));
        const menor = parseFloat(menorTxt.replace(',', '.'));
        expect(maior).to.be.gte(menor);
      });
    });
  });

  it('Classificação salva corretamente: 150 kWh deve ser Moderado', () => {
    cy.get('input[name="data_consumo"]').type('2026-04-21');
    cy.get('input[name="consumo_kwh"]').type('150');
    cy.get('button[value="registrar"]').click();
    cy.get('tbody').should('contain', 'Moderado');
  });

  it('Classificação salva corretamente: 300 kWh deve ser Alto', () => {
    cy.get('input[name="data_consumo"]').type('2026-04-22');
    cy.get('input[name="consumo_kwh"]').type('300');
    cy.get('button[value="registrar"]').click();
    cy.get('tbody').should('contain', 'Alto');
  });

  it('Consumo zero não é inserido no banco', () => {
    cy.get('input[name="data_consumo"]').type('2026-04-30');
    cy.get('input[name="consumo_kwh"]').type('0');
    cy.get('button[value="registrar"]').click();
    cy.url().should('include', 'index.php');
  });

});