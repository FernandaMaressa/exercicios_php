describe('Exercício 2 - Verificação de Múltiplos', () => {
  beforeEach(() => {
    cy.visit('/exercicio2/index.php')
  })

  // TESTES DE INTERFACE

  it('Deve exibir o formulário corretamente', () => {
    cy.contains('Verificar Múltiplos (4, 6, 9)').should('be.visible')
    cy.get('input[name="numero"]').should('exist').and('have.attr', 'type', 'number')
    cy.get('button[type="submit"]').should('contain', 'Enviar')
  })

  it('Deve ter label associado ao campo', () => {
    cy.get('label[for="numero"]').should('contain', 'Digite um número:')
    cy.get('input[name="numero"]').should('have.attr', 'required')
  })

  // TESTES DE MÚLTIPLO DE 4 APENAS

  it('Deve identificar múltiplo apenas de 4', () => {
    cy.get('input[name="numero"]').clear().type('4')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/exercicio2/processar.php')
    cy.contains('Resultado').should('be.visible')
    cy.contains('O número 4 é múltiplo de: 4.').should('be.visible')
  })

  it('Deve identificar 8 como múltiplo apenas de 4', () => {
    cy.get('input[name="numero"]').clear().type('8')
    cy.get('button[type="submit"]').click()
    cy.contains('O número 8 é múltiplo de: 4.').should('be.visible')
  })

  // TESTES DE MÚLTIPLO DE 6 APENAS

  it('Deve identificar múltiplo apenas de 6', () => {
    cy.get('input[name="numero"]').clear().type('6')
    cy.get('button[type="submit"]').click()
    cy.contains('O número 6 é múltiplo de: 6.').should('be.visible')
  })

  it('Deve identificar 30 como múltiplo apenas de 6', () => {
    cy.get('input[name="numero"]').clear().type('30')
    cy.get('button[type="submit"]').click()
    cy.contains('O número 30 é múltiplo de: 6.').should('be.visible')
  })

  // TESTES DE MÚLTIPLO DE 9 APENAS

  it('Deve identificar múltiplo apenas de 9', () => {
    cy.get('input[name="numero"]').clear().type('9')
    cy.get('button[type="submit"]').click()
    cy.contains('O número 9 é múltiplo de: 9.').should('be.visible')
  })

  it('Deve identificar 27 como múltiplo apenas de 9', () => {
    cy.get('input[name="numero"]').clear().type('27')
    cy.get('button[type="submit"]').click()
    cy.contains('O número 27 é múltiplo de: 9.').should('be.visible')
  })

  // TESTES DE MÚLTIPLOS COMBINADOS

  it('Deve identificar múltiplo de 4 e 6 (12)', () => {
    cy.get('input[name="numero"]').clear().type('12')
    cy.get('button[type="submit"]').click()
    cy.contains('O número 12 é múltiplo de: 4, 6.').should('be.visible')
  })

  it('Deve identificar múltiplo de 6 e 9 (18)', () => {
    cy.get('input[name="numero"]').clear().type('18')
    cy.get('button[type="submit"]').click()
    cy.contains('O número 18 é múltiplo de: 6, 9.').should('be.visible')
  })

  it('Deve identificar múltiplo de 4, 6 e 9 ao mesmo tempo (72)', () => {
    cy.get('input[name="numero"]').clear().type('72')
    cy.get('button[type="submit"]').click()
    cy.contains('O número 72 é múltiplo de: 4, 6, 9.').should('be.visible')
  })

  // TESTES DE NÃO MÚLTIPLOS

  it('Deve identificar que 1 não é múltiplo de nenhum', () => {
    cy.get('input[name="numero"]').clear().type('1')
    cy.get('button[type="submit"]').click()
    cy.contains('O número 1 NÃO é múltiplo de 4, 6 ou 9.').should('be.visible')
  })

  it('Deve identificar que 5 não é múltiplo de nenhum', () => {
    cy.get('input[name="numero"]').clear().type('5')
    cy.get('button[type="submit"]').click()
    cy.contains('O número 5 NÃO é múltiplo de 4, 6 ou 9.').should('be.visible')
  })

  // TESTES COM ZERO E NÚMEROS ESPECIAIS

  it('Deve identificar que 0 é múltiplo de todos', () => {
    cy.get('input[name="numero"]').clear().type('0')
    cy.get('button[type="submit"]').click()
    cy.contains('O número 0 é múltiplo de: 4, 6, 9.').should('be.visible')
  })

  it('Deve aceitar números grandes (144)', () => {
    cy.get('input[name="numero"]').clear().type('144')
    cy.get('button[type="submit"]').click()
    cy.contains('O número 144 é múltiplo de: 4, 6, 9.').should('be.visible')
  })

  // TESTES DE NAVEGAÇÃO

  it('Deve permitir voltar para o formulário', () => {
    cy.get('input[name="numero"]').clear().type('12')
    cy.get('button[type="submit"]').click()
    cy.contains('button', 'Voltar').should('be.visible').click()
    cy.url().should('include', '/exercicio2/index.php')
    cy.contains('Verificar Múltiplos (4, 6, 9)').should('be.visible')
  })

  // TESTES DE VALIDAÇÃO

  it('Não deve permitir enviar formulário vazio', () => {
    cy.get('button[type="submit"]').click()
    
    cy.url().should('include', '/exercicio2/index.php')
  })

  // TESTE DE MÚLTIPLAS SUBMISSÕES

  it('Deve permitir múltiplas verificações seguidas', () => {
    cy.get('input[name="numero"]').clear().type('4')
    cy.get('button[type="submit"]').click()
    cy.contains('O número 4 é múltiplo de: 4.').should('be.visible')
    cy.contains('button', 'Voltar').click()
    cy.get('input[name="numero"]').clear().type('7')
    cy.get('button[type="submit"]').click()
    cy.contains('O número 7 NÃO é múltiplo de 4, 6 ou 9.').should('be.visible')
    cy.contains('button', 'Voltar').click()
    cy.get('input[name="numero"]').clear().type('36')
    cy.get('button[type="submit"]').click()
    cy.contains('O número 36 é múltiplo de: 4, 6, 9.').should('be.visible')
  })

  // TESTE DE ACESSIBILIDADE

  it('Deve ter estrutura semântica adequada', () => {
    cy.get('h2').should('exist')
    cy.get('form').should('exist')
    cy.get('label').should('exist')
    cy.get('button').should('exist')
  })

  it('Deve ter título na página', () => {
    cy.title().should('eq', 'Exercício 2 - Verificação de Múltiplos')
  })
})