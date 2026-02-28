describe('Exercício 10 - Sistema de Monitoramento de Energia', () => {
  beforeEach(() => {
    cy.visit('/exercicio10/index.php')
  })

  // Teste Automatizado do FRONTEND
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
  });