describe('Exercício 5 - Avaliação de Desempenho Escolar', () => {
  beforeEach(() => {
    cy.visit('/exercicio5/index.php')
  })
  
  it('Deve exibir o formulário corretamente', () => {
    cy.contains('Avaliação de Desempenho').should('be.visible')
    cy.get('input[name="nota1"]').should('exist')
    cy.get('input[name="nota2"]').should('exist')
    cy.get('input[name="nota3"]').should('exist')
    cy.get('button[type="submit"]').should('contain', 'Avaliar Desempenho')
  })

  it('Deve ter validação min e max nos campos', () => {
    cy.get('input[name="nota1"]').should('have.attr', 'min', '0').and('have.attr', 'max', '10')
    cy.get('input[name="nota2"]').should('have.attr', 'min', '0').and('have.attr', 'max', '10')
    cy.get('input[name="nota3"]').should('have.attr', 'min', '0').and('have.attr', 'max', '10')
  })

  // TESTES DE DESEMPENHO EXCELENTE

  it('Deve classificar como Excelente quando todas as notas >= 8', () => {
    cy.get('input[name="nota1"]').clear().type('8.5')
    cy.get('input[name="nota2"]').clear().type('9.0')
    cy.get('input[name="nota3"]').clear().type('8.0')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/exercicio5/processar.php')
    cy.contains('Boletim').should('be.visible')
    cy.contains('Desempenho Excelente').should('be.visible')
    cy.contains('Incrível! Você dominou todos os pilares da disciplina.').should('be.visible')
    cy.get('.resultado').should('have.class', 'excelente')
  })

  it('Deve classificar como Excelente com notas 10', () => {
    cy.get('input[name="nota1"]').clear().type('10')
    cy.get('input[name="nota2"]').clear().type('10')
    cy.get('input[name="nota3"]').clear().type('10')
    cy.get('button[type="submit"]').click()

    cy.contains('Desempenho Excelente').should('be.visible')
    cy.contains('Média Final: 10').should('be.visible')
  })

  // TESTES DE DESEMPENHO ÓTIMO

  it('Deve classificar como Ótimo quando duas notas >= 7 e todas >= 6', () => {
    cy.get('input[name="nota1"]').clear().type('7.5')
    cy.get('input[name="nota2"]').clear().type('7.0')
    cy.get('input[name="nota3"]').clear().type('6.0')
    cy.get('button[type="submit"]').click()

    cy.contains('Desempenho Ótimo').should('be.visible')
    cy.contains('Parabéns! Seu rendimento está acima da média.').should('be.visible')
    cy.get('.resultado').should('have.class', 'otimo')
  })

  // TESTES DE DESEMPENHO BOM

  it('Deve classificar como Bom quando média >= 6 e todas notas >= 5', () => {
    cy.get('input[name="nota1"]').clear().type('6.0')
    cy.get('input[name="nota2"]').clear().type('6.5')
    cy.get('input[name="nota3"]').clear().type('6.0')
    cy.get('button[type="submit"]').click()

    cy.contains('Desempenho Bom').should('be.visible')
    cy.contains('Bom trabalho! Continue se dedicando para subir de nível.').should('be.visible')
    cy.get('.resultado').should('have.class', 'bom')
  })

  // TESTES DE DESEMPENHO REGULAR

  it('Deve classificar como Regular quando média entre 5 e 5.9', () => {
    cy.get('input[name="nota1"]').clear().type('5.5')
    cy.get('input[name="nota2"]').clear().type('5.0')
    cy.get('input[name="nota3"]').clear().type('5.5')
    cy.get('button[type="submit"]').click()

    cy.contains('Desempenho Regular').should('be.visible')
    cy.contains('Você está no caminho, mas precisa reforçar alguns conceitos.').should('be.visible')
    cy.get('.resultado').should('have.class', 'regular')
  })

  it('Deve classificar como Regular quando alguma nota está entre 4 e 4.9', () => {
    cy.get('input[name="nota1"]').clear().type('4.5')
    cy.get('input[name="nota2"]').clear().type('6.0')
    cy.get('input[name="nota3"]').clear().type('6.0')
    cy.get('button[type="submit"]').click()

    cy.contains('Desempenho Regular').should('be.visible')
  })

  // TESTES DE DESEMPENHO INSUFICIENTE

  it('Deve classificar como Insuficiente quando todas as notas são baixas', () => {
    cy.get('input[name="nota1"]').clear().type('3.0')
    cy.get('input[name="nota2"]').clear().type('2.5')
    cy.get('input[name="nota3"]').clear().type('3.5')
    cy.get('button[type="submit"]').click()

    cy.contains('Desempenho Insuficiente').should('be.visible')
    cy.contains('Não desista! Procure o professor para um plano de recuperação.').should('be.visible')
    cy.get('.resultado').should('have.class', 'insuficiente')
  })

  it('Deve classificar como Insuficiente com nota zero', () => {
    cy.get('input[name="nota1"]').clear().type('0')
    cy.get('input[name="nota2"]').clear().type('2.0')
    cy.get('input[name="nota3"]').clear().type('1.0')
    cy.get('button[type="submit"]').click()

    cy.contains('Desempenho Insuficiente').should('be.visible')
  })

  // TESTES DE CÁLCULO DE MÉDIA

  it('Deve calcular a média corretamente', () => {
    cy.get('input[name="nota1"]').clear().type('8.0')
    cy.get('input[name="nota2"]').clear().type('9.0')
    cy.get('input[name="nota3"]').clear().type('7.0')
    cy.get('button[type="submit"]').click()

    cy.contains('Média Final: 8').should('be.visible')
  })

  // TESTEDE NAVEGAÇÃO

  it('Deve permitir voltar para o formulário', () => {
    cy.get('input[name="nota1"]').clear().type('7.0')
    cy.get('input[name="nota2"]').clear().type('8.0')
    cy.get('input[name="nota3"]').clear().type('6.5')
    cy.get('button[type="submit"]').click()

    cy.contains('button', 'Voltar ao Início').should('be.visible').click()
    cy.url().should('include', '/exercicio5/index.php')
    cy.contains('Avaliação de Desempenho').should('be.visible')
  })

  // TESTE DE VALIDAÇÃO

  it('Não deve permitir enviar formulário vazio', () => {
    cy.get('button[type="submit"]').click()
    
    cy.url().should('include', '/exercicio5/index.php')
  })

  // TESTES DE CSS E ESTILO

  it('Deve ter estilo aplicado no container', () => {
    cy.get('.container')
      .should('have.css', 'background-color', 'rgb(255, 255, 255)')
      .and('have.css', 'border-radius', '2px')
  })

  it('Deve ter título com cor azul', () => {
    cy.get('h1')
      .should('have.css', 'color', 'rgb(26, 82, 118)')
  })

  // TESTE DE ACESSIBILIDADE

  it('Deve ter estrutura semântica adequada', () => {
    cy.get('h1').should('exist')
    cy.get('form').should('exist')
    cy.get('label').should('have.length', 3)
    cy.get('button').should('exist')
  })

  it('Deve ter título na página', () => {
    cy.title().should('eq', 'Avaliação de Desempenho Escolar')
  })
})