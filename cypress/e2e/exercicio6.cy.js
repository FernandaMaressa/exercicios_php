describe('Exercício 6 - Simulador de Descontos', () => {
  beforeEach(() => {
    cy.visit('/exercicio6/index.php')
  })

  // TESTES DE INTERFACE
  it('Deve exibir o formulário corretamente', () => {
    cy.contains('Simulador de Descontos').should('be.visible')
    cy.get('input[name="valor"]').should('exist').and('have.attr', 'type', 'number')
    cy.get('input[name="cupom"]').should('exist').and('have.attr', 'type', 'number')
    cy.get('button[type="submit"]').should('contain', 'Calcular')
    cy.contains('Cupons disponíveis:').should('be.visible')
    cy.contains('1 - BRONZE (5%)').should('be.visible')
    cy.contains('5 - DIAMANTE (25%)').should('be.visible')
  })

  // TESTES DOS CUPONS VÁLIDOS
  
  it('Deve aplicar cupom BRONZE (1) corretamente - 5% de desconto', () => {
    cy.get('input[name="valor"]').clear().type('100')
    cy.get('input[name="cupom"]').clear().type('1')
    cy.get('button[type="submit"]').click()
    
    cy.url().should('include', '/exercicio6/processar.php')
    cy.contains('Cupom BRONZE Aplicado').should('be.visible')
    cy.get('.resultado').should('have.class', 'bronze')
    cy.contains('Desconto: 5%').should('be.visible')
    cy.contains('Valor Original: R$ 100,00').should('be.visible')
    cy.contains('Valor Economizado: R$ 5,00').should('be.visible')
    cy.contains('Valor Final: R$ 95,00').should('be.visible')
  })

  it('Deve aplicar cupom PRATA (2) corretamente - 10% de desconto', () => {
    cy.get('input[name="valor"]').clear().type('100')
    cy.get('input[name="cupom"]').clear().type('2')
    cy.get('button[type="submit"]').click()
    
    cy.contains('Cupom PRATA Aplicado').should('be.visible')
    cy.get('.resultado').should('have.class', 'prata')
    cy.contains('Desconto: 10%').should('be.visible')
    cy.contains('Valor Economizado: R$ 10,00').should('be.visible')
    cy.contains('Valor Final: R$ 90,00').should('be.visible')
  })

  it('Deve aplicar cupom OURO (3) corretamente - 15% de desconto', () => {
    cy.get('input[name="valor"]').clear().type('200')
    cy.get('input[name="cupom"]').clear().type('3')
    cy.get('button[type="submit"]').click()
    
    cy.contains('Cupom OURO Aplicado').should('be.visible')
    cy.get('.resultado').should('have.class', 'ouro')
    cy.contains('Desconto: 15%').should('be.visible')
    cy.contains('Valor Economizado: R$ 30,00').should('be.visible')
    cy.contains('Valor Final: R$ 170,00').should('be.visible')
  })

  it('Deve aplicar cupom PLATINA (4) corretamente - 20% de desconto', () => {
    cy.get('input[name="valor"]').clear().type('500')
    cy.get('input[name="cupom"]').clear().type('4')
    cy.get('button[type="submit"]').click()
    
    cy.contains('Cupom PLATINA Aplicado').should('be.visible')
    cy.get('.resultado').should('have.class', 'platina')
    cy.contains('Desconto: 20%').should('be.visible')
    cy.contains('Valor Economizado: R$ 100,00').should('be.visible')
    cy.contains('Valor Final: R$ 400,00').should('be.visible')
  })

  it('Deve aplicar cupom DIAMANTE (5) corretamente - 25% de desconto', () => {
    cy.get('input[name="valor"]').clear().type('1000')
    cy.get('input[name="cupom"]').clear().type('5')
    cy.get('button[type="submit"]').click()
    
    cy.contains('Cupom DIAMANTE Aplicado').should('be.visible')
    cy.get('.resultado').should('have.class', 'diamante')
    cy.contains('Desconto: 25%').should('be.visible')
    cy.contains('Valor Economizado: R$ 250,00').should('be.visible')
    cy.contains('Valor Final: R$ 750,00').should('be.visible')
  })

  // TESTES DE CUPONS INVÁLIDOS
  
  it('Deve exibir mensagem para cupom inválido (código 0)', () => {
    cy.get('input[name="valor"]').clear().type('150')
    cy.get('input[name="cupom"]').clear().type('0')
    cy.get('button[type="submit"]').click()
    
    cy.contains('Cupom Inválido! Nenhum desconto aplicado.').should('be.visible')
    cy.get('.resultado').should('have.class', 'invalido')
    cy.contains('Valor Original: R$ 150,00').should('be.visible')
    cy.contains('Valor Economizado').should('not.exist')
    cy.contains('Valor Final: R$ 150,00').should('be.visible')
  })

  it('Deve exibir mensagem para cupom inválido (código 6)', () => {
    cy.get('input[name="valor"]').clear().type('100')
    cy.get('input[name="cupom"]').clear().type('6')
    cy.get('button[type="submit"]').click()
    
    cy.contains('Cupom Inválido! Nenhum desconto aplicado.').should('be.visible')
    cy.get('.resultado').should('have.class', 'invalido')
  })

  it('Deve exibir mensagem para cupom inválido (código 99)', () => {
    cy.get('input[name="valor"]').clear().type('250')
    cy.get('input[name="cupom"]').clear().type('99')
    cy.get('button[type="submit"]').click()
    
    cy.contains('Cupom Inválido! Nenhum desconto aplicado.').should('be.visible')
    cy.get('.resultado').should('have.class', 'invalido')
    cy.contains('Valor Final: R$ 250,00').should('be.visible')
  })

  it('Deve exibir mensagem para cupom negativo (-1)', () => {
    cy.get('input[name="valor"]').clear().type('80')
    cy.get('input[name="cupom"]').clear().type('-1')
    cy.get('button[type="submit"]').click()
    
    cy.contains('Cupom Inválido! Nenhum desconto aplicado.').should('be.visible')
    cy.get('.resultado').should('have.class', 'invalido')
  })
  
  it('Deve redirecionar para index quando valor for zero ou negativo', () => {
    cy.get('input[name="valor"]').invoke('val', 0)
    cy.get('input[name="cupom"]').clear().type('1')
    cy.get('button[type="submit"]').click()
    
    cy.url().should('include', '/exercicio6/index.php')
    cy.contains('Simulador de Descontos').should('be.visible')
  })

  it('Deve aceitar valores decimais corretamente', () => {
    cy.get('input[name="valor"]').clear().type('99.99')
    cy.get('input[name="cupom"]').clear().type('2')
    cy.get('button[type="submit"]').click()
    
    cy.contains('Valor Original: R$ 99,99').should('be.visible')
    cy.contains('Valor Economizado: R$ 10,00').should('be.visible')
    cy.contains('Valor Final: R$ 89,99').should('be.visible')
  })

  it('Deve funcionar com valores grandes', () => {
    cy.get('input[name="valor"]').clear().type('10000')
    cy.get('input[name="cupom"]').clear().type('5')
    cy.get('button[type="submit"]').click()
    
    cy.contains('Valor Original: R$ 10.000,00').should('be.visible')
    cy.contains('Valor Economizado: R$ 2.500,00').should('be.visible')
    cy.contains('Valor Final: R$ 7.500,00').should('be.visible')
  })

  // TESTES DE NAVEGAÇÃO
  
  it('Deve permitir voltar para o formulário após calcular', () => {
    cy.get('input[name="valor"]').clear().type('100')
    cy.get('input[name="cupom"]').clear().type('1')
    cy.get('button[type="submit"]').click()
    
    cy.contains('← Voltar').click()
    cy.url().should('include', '/exercicio6/index.php')
    cy.contains('Simulador de Descontos').should('be.visible')
  })

  // TESTES DE ACESSIBILIDADE
  
  it('Deve ter labels associados aos inputs', () => {
    cy.get('label[for="valor"]').should('exist')
    cy.get('label[for="cupom"]').should('exist')
  })

  it('Deve ter placeholder nos campos', () => {
    cy.get('input[name="valor"]').should('have.attr', 'placeholder')
    cy.get('input[name="cupom"]').should('have.attr', 'placeholder')
  })

  // TESTE DE CSS (CORES DOS CUPONS)
  
  it('Deve aplicar cores corretas para cada cupom', () => {
    const cupons = [
      { codigo: 1, classe: 'bronze', cor: 'rgb(205, 127, 50)' },
      { codigo: 2, classe: 'prata', cor: 'rgb(192, 192, 192)' },
      { codigo: 3, classe: 'ouro', cor: 'rgb(255, 215, 0)' },
      { codigo: 4, classe: 'platina', cor: 'rgb(0, 206, 209)' },
      { codigo: 5, classe: 'diamante', cor: 'rgb(221, 160, 221)' }
    ]

    cupons.forEach(cupom => {
      cy.visit('/exercicio6/index.php')
      cy.get('input[name="valor"]').clear().type('100')
      cy.get('input[name="cupom"]').clear().type(cupom.codigo.toString())
      cy.get('button[type="submit"]').click()
      
      cy.get('.resultado')
        .should('have.class', cupom.classe)
        .and('have.css', 'background-color', cupom.cor)
    })
  })
})