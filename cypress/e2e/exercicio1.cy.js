describe('Exercício 1 - Verificação de Idade', () => {
  beforeEach(() => {
    cy.visit('/exercicio1/index.php')
  })

  // TESTES DE INTERFACE

  it('Deve exibir o formulário corretamente', () => {
    cy.contains('Verificar Idade').should('be.visible')
    cy.get('input[name="nome"]').should('exist').and('have.attr', 'type', 'text')
    cy.get('input[name="idade"]').should('exist').and('have.attr', 'type', 'number')
    cy.get('button[type="submit"]').should('contain', 'Enviar')
  })

  it('Deve ter labels para os campos', () => {
    cy.contains('label', 'Nome:').should('be.visible')
    cy.contains('label', 'Idade:').should('be.visible')
  })

  it('Deve ter campos obrigatórios', () => {
    cy.get('input[name="nome"]').should('have.attr', 'required')
    cy.get('input[name="idade"]').should('have.attr', 'required')
  })

  // TESTES DE MAIOR DE IDADE

  it('Deve identificar pessoa MAIOR de idade - 18 anos exatos', () => {
    cy.get('input[name="nome"]').clear().type('Liliane')
    cy.get('input[name="idade"]').clear().type('18')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/exercicio1/processar.php')
    cy.contains('Resultado').should('be.visible')
    cy.contains('Liliane, você é MAIOR de idade.').should('be.visible')
  })

  it('Deve identificar pessoa MAIOR de idade - 25 anos', () => {
    cy.get('input[name="nome"]').clear().type('Fernanda')
    cy.get('input[name="idade"]').clear().type('25')
    cy.get('button[type="submit"]').click()
    cy.contains('Fernanda, você é MAIOR de idade.').should('be.visible')
  })

  // TESTES DE MENOR DE IDADE

  it('Deve identificar pessoa MENOR de idade - 17 anos', () => {
    cy.get('input[name="nome"]').clear().type('Edmar')
    cy.get('input[name="idade"]').clear().type('17')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/exercicio1/processar.php')
    cy.contains('Resultado').should('be.visible')
    cy.contains('Edmar, você é MENOR de idade.').should('be.visible')
  })

  it('Deve identificar pessoa MENOR de idade - 10 anos', () => {
    cy.get('input[name="nome"]').clear().type('Lucas')
    cy.get('input[name="idade"]').clear().type('10')
    cy.get('button[type="submit"]').click()
    cy.contains('Lucas, você é MENOR de idade.').should('be.visible')
  })

  // TESTES DE NAVEGAÇÃO

  it('Deve permitir voltar para o formulário após verificar', () => {
    cy.get('input[name="nome"]').clear().type('Carlos Silva')
    cy.get('input[name="idade"]').clear().type('18')
    cy.get('button[type="submit"]').click()
    cy.contains('button', 'Voltar').should('be.visible').click()
    cy.url().should('include', '/exercicio1/index.php')
    cy.contains('Verificar Idade').should('be.visible')
  })

  // TESTES DE VALIDAÇÃO

  it('Não deve permitir enviar formulário vazio', () => {
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/exercicio1/index.php')
  })

  it('Não deve permitir enviar apenas com nome', () => {
    cy.get('input[name="nome"]').clear().type('João')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/exercicio1/index.php')
  })

  it('Não deve permitir enviar apenas com idade', () => {
    cy.get('input[name="idade"]').clear().type('20')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/exercicio1/index.php')
  })


  // TESTE DE MÚLTIPLAS SUBMISSÕES

  it('Deve permitir múltiplas verificações seguidas', () => {
    cy.get('input[name="nome"]').clear().type('Primeiro Teste')
    cy.get('input[name="idade"]').clear().type('20')
    cy.get('button[type="submit"]').click()
    cy.contains('Primeiro Teste, você é MAIOR de idade.').should('be.visible')
    cy.contains('button', 'Voltar').click()
    cy.get('input[name="nome"]').clear().type('Segundo Teste')
    cy.get('input[name="idade"]').clear().type('15')
    cy.get('button[type="submit"]').click()
    cy.contains('Segundo Teste, você é MENOR de idade.').should('be.visible')
    cy.contains('button', 'Voltar').click()
    cy.get('input[name="nome"]').clear().type('Terceiro Teste')
    cy.get('input[name="idade"]').clear().type('18')
    cy.get('button[type="submit"]').click()
    cy.contains('Terceiro Teste, você é MAIOR de idade.').should('be.visible')
  })

  // TESTE DE ACESSIBILIDADE

  it('Deve ter estrutura semântica adequada', () => {
    cy.get('h2').should('exist').and('contain', 'Verificar Idade')
    cy.get('form').should('exist')
    cy.get('label').should('have.length', 2)
    cy.get('button').should('exist')
  })

  it('Deve ter título na página', () => {
    cy.title().should('eq', 'Exercício 1 - Verificação de Idade')
  })
})