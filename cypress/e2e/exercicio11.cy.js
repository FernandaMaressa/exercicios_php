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
});