describe('Exercício 11 - Calculadora de Múltiplos', () => {
  beforeEach(() => {
    cy.visit('/exercicio11/index.php')
  })

  // ═══════════════════════════════════════════════════════════
  // Testes Automatizados do FRONT-END
  // ═══════════════════════════════════════════════════════════

  it('Carrega a página corretamente', () => {
    cy.contains('Calculadora de Múltiplos');
  });

  it('Exibe o título do formulário', () => {
    cy.contains('Configurar Cálculo');
  });

  it('Exibe o campo de número base', () => {
    cy.get('input[name="numero_base"]').should('exist').and('be.visible');
  });

  it('Exibe o campo de quantidade de múltiplos', () => {
    cy.get('input[name="limite"]').should('exist').and('be.visible');
  });

  it('Campo limite tem valor padrão 10', () => {
    cy.get('input[name="limite"]').should('have.value', '10');
  });

  it('Campo limite tem mínimo 1', () => {
    cy.get('input[name="limite"]').should('have.attr', 'min', '1');
  });

  it('Exibe o campo de ordenação', () => {
    cy.get('select[name="ordenacao"]').should('exist').and('be.visible');
  });

  it('Ordenação tem opções crescente e decrescente', () => {
    cy.get('select[name="ordenacao"] option[value="crescente"]').should('exist');
    cy.get('select[name="ordenacao"] option[value="decrescente"]').should('exist');
  });

  it('Exibe o campo de filtro par/ímpar', () => {
    cy.get('select[name="filtro"]').should('exist').and('be.visible');
  });

  it('Filtro tem opções todos, pares e ímpares', () => {
    cy.get('select[name="filtro"] option[value="todos"]').should('exist');
    cy.get('select[name="filtro"] option[value="pares"]').should('exist');
    cy.get('select[name="filtro"] option[value="impares"]').should('exist');
  });

  it('Botão Calcular Múltiplos existe e está visível', () => {
    cy.get('button[name="acao"][value="calcular"]')
      .should('exist')
      .and('be.visible')
      .and('contain', 'Calcular Múltiplos');
  });

  it('Botão Calcular tem id btn-calcular', () => {
    cy.get('#btn-calcular').should('exist');
  });

  it('Formulário aponta para processar.php via POST', () => {
    cy.get('form')
      .should('have.attr', 'action', 'processar.php')
      .and('have.attr', 'method', 'POST');
  });

  it('Impede envio sem número base (campo obrigatório)', () => {
    cy.get('input[name="numero_base"]').clear();
    cy.get('#btn-calcular').click();
    cy.url().should('include', 'index.php');
  });

  it('Impede envio sem limite (campo obrigatório)', () => {
    cy.get('input[name="numero_base"]').type('5');
    cy.get('input[name="limite"]').clear();
    cy.get('#btn-calcular').click();
    cy.url().should('include', 'index.php');
  });

  it('Campo número base aceita decimais (step any)', () => {
    cy.get('input[name="numero_base"]').should('have.attr', 'step', 'any');
  });

  it('Footer exibe o texto correto', () => {
    cy.get('footer').should('contain', ' Fernanda Maressa Dev');
  });

  it('Header exibe o título principal', () => {
    cy.get('header').should('contain', 'Calculadora de Múltiplos');
  });

  it('Header tem cor de fundo escura', () => {
    cy.get('header').should('have.css', 'background-color', 'rgb(26, 29, 35)');
  });

  it('Botão tem classe btn-submit', () => {
    cy.get('#btn-calcular').should('have.class', 'btn-submit');
  });

  it('Verifica layout responsivo (iPhone 12)', () => {
    cy.viewport(390, 844);
    cy.get('input[name="numero_base"]').should('be.visible');
    cy.get('#btn-calcular').should('be.visible');
  });

  it('Legenda de filtros está visível', () => {
    cy.get('.filter-legend').should('be.visible');
  });

// ═══════════════════════════════════════════════════════════
// Testes Automatizados do Back-END
// ═══════════════════════════════════════════════════════════
  it('Calcular redireciona para processar.php', () => {
    cy.get('input[name="numero_base"]').type('5');
    cy.get('#btn-calcular').click();
    cy.url().should('include', 'processar.php');
  });

  it('Exibe card de resumo após cálculo', () => {
    cy.get('input[name="numero_base"]').type('5');
    cy.get('#btn-calcular').click();
    cy.get('#card-resumo').should('be.visible');
  });

  it('Exibe card de múltiplos calculados', () => {
    cy.get('input[name="numero_base"]').type('5');
    cy.get('#btn-calcular').click();
    cy.get('#card-multiplos').should('be.visible');
  });

  it('Resumo exibe o número base correto', () => {
    cy.get('input[name="numero_base"]').type('7');
    cy.get('#btn-calcular').click();
    cy.get('#resumo-base').should('contain', '7');
  });

  it('Resumo exibe a quantidade de múltiplos', () => {
    cy.get('input[name="numero_base"]').type('5');
    cy.get('#btn-calcular').click();
    cy.get('#resumo-total').should('exist').and('not.be.empty');
  });

  it('Resumo exibe a ordenação escolhida', () => {
    cy.get('input[name="numero_base"]').type('5');
    cy.get('select[name="ordenacao"]').select('decrescente');
    cy.get('#btn-calcular').click();
    cy.get('#resumo-ordenacao').should('contain', 'decrescente');
  });

  it('Resumo exibe o filtro aplicado', () => {
    cy.get('input[name="numero_base"]').type('5');
    cy.get('select[name="filtro"]').select('pares');
    cy.get('#btn-calcular').click();
    cy.get('#resumo-filtro').should('contain', 'pares');
  });

  it('Tabela exibe colunas: Posição, Valor do Múltiplo, Par/Ímpar', () => {
    cy.get('input[name="numero_base"]').type('5');
    cy.get('#btn-calcular').click();
    cy.get('#tabela-multiplos thead th').eq(0).should('contain', 'Posição');
    cy.get('#tabela-multiplos thead th').eq(1).should('contain', 'Valor');
    cy.get('#tabela-multiplos thead th').eq(2).should('contain', 'Par');
  });

  it('Tabela exibe 10 múltiplos por padrão', () => {
    cy.get('input[name="numero_base"]').type('3');
    cy.get('#btn-calcular').click();
    cy.get('#tabela-multiplos tbody tr').should('have.length', 10);
  });

  it('Tabela exibe a quantidade correta quando limite é alterado', () => {
    cy.get('input[name="numero_base"]').type('3');
    cy.get('input[name="limite"]').clear().type('5');
    cy.get('#btn-calcular').click();
    cy.get('#tabela-multiplos tbody tr').should('have.length', 5);
  });

  it('Filtro pares exibe apenas múltiplos pares', () => {
    cy.get('input[name="numero_base"]').type('3');
    cy.get('input[name="limite"]').clear().type('10');
    cy.get('select[name="filtro"]').select('pares');
    cy.get('#btn-calcular').click();
    cy.get('#tabela-multiplos tbody tr').each(($tr) => {
      cy.wrap($tr).find('.badge').should('have.class', 'par');
    });
  });

  it('Filtro ímpares exibe apenas múltiplos ímpares', () => {
    cy.get('input[name="numero_base"]').type('3');
    cy.get('input[name="limite"]').clear().type('10');
    cy.get('select[name="filtro"]').select('impares');
    cy.get('#btn-calcular').click();
    cy.get('#tabela-multiplos tbody tr').each(($tr) => {
      cy.wrap($tr).find('.badge').should('have.class', 'impar');
    });
  });

  it('Ordenação crescente: primeiro valor menor que o último', () => {
    cy.get('input[name="numero_base"]').type('4');
    cy.get('select[name="ordenacao"]').select('crescente');
    cy.get('#btn-calcular').click();
    cy.get('#tabela-multiplos tbody tr').then(($rows) => {
      const primeiro = parseFloat($rows.first().find('.col-valor').text().replace(',', '.'));
      const ultimo   = parseFloat($rows.last().find('.col-valor').text().replace(',', '.'));
      expect(primeiro).to.be.lessThan(ultimo);
    });
  });

  it('Ordenação decrescente: primeiro valor maior que o último', () => {
    cy.get('input[name="numero_base"]').type('4');
    cy.get('select[name="ordenacao"]').select('decrescente');
    cy.get('#btn-calcular').click();
    cy.get('#tabela-multiplos tbody tr').then(($rows) => {
      const primeiro = parseFloat($rows.first().find('.col-valor').text().replace(',', '.'));
      const ultimo   = parseFloat($rows.last().find('.col-valor').text().replace(',', '.'));
      expect(primeiro).to.be.greaterThan(ultimo);
    });
  });

  it('Exibe mensagem amigável quando filtro não retorna resultados', () => {
    cy.get('input[name="numero_base"]').type('2');
    cy.get('input[name="limite"]').clear().type('1');
    cy.get('select[name="filtro"]').select('impares');
    cy.get('#btn-calcular').click();
    cy.get('#msg-sem-resultado').should('be.visible');
  });

  it('Exibe histórico de cálculos', () => {
    cy.get('input[name="numero_base"]').type('5');
    cy.get('#btn-calcular').click();
    cy.get('#card-historico').should('be.visible');
  });

  it('Histórico exibe colunas corretas', () => {
    cy.get('input[name="numero_base"]').type('5');
    cy.get('#btn-calcular').click();
    cy.get('#tabela-historico thead th').eq(0).should('contain', 'Base');
    cy.get('#tabela-historico thead th').eq(3).should('contain', 'Par');
    cy.get('#tabela-historico thead th').eq(6).should('contain', 'Data');
  });

  it('Botão limpar filtros redireciona para histórico limpo', () => {
    cy.get('input[name="numero_base"]').type('5');
    cy.get('#btn-calcular').click();
    cy.get('#btn-limpar').click();
    cy.url().should('include', 'acao=historico');
  });

  it('Botão Voltar redireciona para index.php', () => {
    cy.get('input[name="numero_base"]').type('5');
    cy.get('#btn-calcular').click();
    cy.get('#btn-voltar').click();
    cy.url().should('include', 'index.php');
  });

  it('Footer do relatório exibe o texto correto', () => {
    cy.get('input[name="numero_base"]').type('5');
    cy.get('#btn-calcular').click();
    cy.get('footer').should('contain', 'Fernanda Maressa Dev');
  });

  it('Número decimal é aceito como base', () => {
    cy.get('input[name="numero_base"]').type('2.5');
    cy.get('#btn-calcular').click();
    cy.get('#card-multiplos').should('be.visible');
  });
});