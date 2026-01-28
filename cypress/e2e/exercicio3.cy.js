describe('Exercício 3 - Simulador de Empréstimo Bancário', () => {
  beforeEach(() => {
    cy.visit('/exercicio3/index.php')
  })
  
  it('Deve exibir o formulário corretamente', () => {
    cy.contains('Simulador de Empréstimo Bancário').should('be.visible')
    cy.get('input[name="nome"]').should('exist').and('have.attr', 'type', 'text')
    cy.get('input[name="salario"]').should('exist').and('have.attr', 'type', 'number')
    cy.get('input[name="valor_emprestimo"]').should('exist').and('have.attr', 'type', 'number')
    cy.get('select[name="num_parcelas"]').should('exist')
    cy.get('button[type="submit"]').should('contain', 'Simular Empréstimo')
  })

  it('Deve ter todos os campos obrigatórios', () => {
    cy.get('input[name="nome"]').should('have.attr', 'required')
    cy.get('input[name="salario"]').should('have.attr', 'required')
    cy.get('input[name="valor_emprestimo"]').should('have.attr', 'required')
    cy.get('select[name="num_parcelas"]').should('have.attr', 'required')
  })

  it('Deve ter todas as opções de parcelas disponíveis', () => {
    cy.get('select[name="num_parcelas"] option').should('have.length', 4)
    cy.get('select[name="num_parcelas"]').should('contain', '12x')
    cy.get('select[name="num_parcelas"]').should('contain', '24x')
    cy.get('select[name="num_parcelas"]').should('contain', '36x')
    cy.get('select[name="num_parcelas"]').should('contain', '48x')
  })

  // TESTES DE EMPRÉSTIMO APROVADO

  it('Deve aprovar empréstimo quando prestação é menor que 30% do salário', () => {
    cy.get('input[name="nome"]').clear().type('Alef Costa')
    cy.get('input[name="salario"]').clear().type('5000')
    cy.get('input[name="valor_emprestimo"]').clear().type('12000') 
    cy.get('select[name="num_parcelas"]').select('24')
    cy.get('button[type="submit"]').click()

    cy.contains('Parabéns Alef Costa, empréstimo aprovado!').should('be.visible')
    cy.contains('Valor da prestação: R$ 500,00').should('be.visible')
  })

  it('Deve aprovar empréstimo com parcelas de 36x', () => {
    cy.get('input[name="nome"]').clear().type('Lays Oliveira')
    cy.get('input[name="salario"]').clear().type('4000')
    cy.get('input[name="valor_emprestimo"]').clear().type('14400')
    cy.get('select[name="num_parcelas"]').select('36')
    cy.get('button[type="submit"]').click()

    cy.contains('Parabéns Lays Oliveira, empréstimo aprovado!').should('be.visible')
    cy.contains('Valor da prestação: R$ 400,00').should('be.visible')
  })

  // TESTE DE EMPRÉSTIMO NEGADO

  it('Deve negar empréstimo com valor muito alto para salário baixo', () => {
    cy.get('input[name="nome"]').clear().type('Alef Pereira')
    cy.get('input[name="salario"]').clear().type('1200')
    cy.get('input[name="valor_emprestimo"]').clear().type('20000')
    cy.get('select[name="num_parcelas"]').select('48')
    cy.get('button[type="submit"]').click()

    cy.contains('Alef Pereira, empréstimo negado.').should('be.visible')
  })

  // TESTE COM VALORES EXTREMOS

  it('Deve aprovar empréstimo com salário alto', () => {
    cy.get('input[name="nome"]').clear().type('Anna Clara Costa')
    cy.get('input[name="salario"]').clear().type('15000')
    cy.get('input[name="valor_emprestimo"]').clear().type('54000') 
    cy.get('select[name="num_parcelas"]').select('12')
    cy.get('button[type="submit"]').click()

    cy.contains('Parabéns Anna Clara Costa, empréstimo aprovado!').should('be.visible')
    cy.contains('Valor da prestação: R$ 4.500,00').should('be.visible')
  })

  // TESTES DE NAVEGAÇÃO

  it('Deve permitir voltar para o formulário após aprovação', () => {
    cy.get('input[name="nome"]').clear().type('Anna Clara Silva')
    cy.get('input[name="salario"]').clear().type('3000')
    cy.get('input[name="valor_emprestimo"]').clear().type('10000')
    cy.get('select[name="num_parcelas"]').select('12')
    cy.get('button[type="submit"]').click()

    cy.contains('button', 'Voltar').should('be.visible').click()
    cy.url().should('include', '/exercicio3/index.php')
    cy.contains('Simulador de Empréstimo Bancário').should('be.visible')
  })


  // TESTES DE VALIDAÇÃO

  it('Não deve permitir enviar formulário vazio', () => {
    cy.get('button[type="submit"]').click()
    
    cy.url().should('include', '/exercicio3/index.php')
  })
  
  // TESTES DE CSS E ESTILO

  it('Deve ter estilo aplicado no container', () => {
    cy.get('.container')
      .should('have.css', 'max-width', '500px')
  })

  it('Deve ter cor correta no título', () => {
    cy.get('h1')
      .should('have.css', 'color', 'rgb(10, 42, 102)')
  })

  // TESTE DE MÚLTIPLAS SUBMISSÕES

  it('Deve permitir múltiplas simulações seguidas', () => {
    cy.get('input[name="nome"]').clear().type('Alef Silva')
    cy.get('input[name="salario"]').clear().type('5000')
    cy.get('input[name="valor_emprestimo"]').clear().type('12000')
    cy.get('select[name="num_parcelas"]').select('12')
    cy.get('button[type="submit"]').click()
    cy.contains('empréstimo aprovado!').should('be.visible')
    cy.contains('button', 'Voltar').click()
    cy.get('input[name="nome"]').clear().type('Anna Clara Lima')
    cy.get('input[name="salario"]').clear().type('1500')
    cy.get('input[name="valor_emprestimo"]').clear().type('20000')
    cy.get('select[name="num_parcelas"]').select('12')
    cy.get('button[type="submit"]').click()
    cy.contains('empréstimo negado').should('be.visible')
    cy.contains('button', 'Voltar').click()
    cy.get('input[name="nome"]').clear().type('Lays Costa')
    cy.get('input[name="salario"]').clear().type('4000')
    cy.get('input[name="valor_emprestimo"]').clear().type('19200')
    cy.get('select[name="num_parcelas"]').select('48')
    cy.get('button[type="submit"]').click()
    cy.contains('empréstimo aprovado!').should('be.visible')
  })

  // TESTE DE ACESSIBILIDADE

  it('Deve ter estrutura semântica adequada', () => {
    cy.get('h1').should('exist')
    cy.get('form').should('exist')
    cy.get('label').should('have.length', 4)
    cy.get('button').should('exist')
  })

  it('Deve ter título na página', () => {
    cy.title().should('eq', 'Simulador de Empréstimo')
  })
})