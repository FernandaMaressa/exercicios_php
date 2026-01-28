describe('Exercício 4 - Pódio da Corrida', () => {
  beforeEach(() => {
    cy.visit('/exercicio4/index.php')
  })

  it('Deve exibir o formulário corretamente', () => {
    cy.contains('Classificação da Corrida').should('be.visible')
    cy.get('input[name="nome1"]').should('exist')
    cy.get('input[name="tempo1"]').should('exist')
    cy.get('input[name="nome2"]').should('exist')
    cy.get('input[name="tempo2"]').should('exist')
    cy.get('input[name="nome3"]').should('exist')
    cy.get('input[name="tempo3"]').should('exist')
    cy.get('button[type="submit"]').should('contain', 'VER PÓDIO')
  })

  it('Deve ter todos os campos obrigatórios', () => {
    cy.get('input[name="nome1"]').should('have.attr', 'required')
    cy.get('input[name="tempo1"]').should('have.attr', 'required')
    cy.get('input[name="nome2"]').should('have.attr', 'required')
    cy.get('input[name="tempo2"]').should('have.attr', 'required')
    cy.get('input[name="nome3"]').should('have.attr', 'required')
    cy.get('input[name="tempo3"]').should('have.attr', 'required')
  })

  // TESTES DE CLASSIFICAÇÃO CORRETA

  it('Deve classificar corretamente em ordem crescente de tempo', () => {
    cy.get('input[name="nome1"]').clear().type('Alef')
    cy.get('input[name="tempo1"]').clear().type('45')
    cy.get('input[name="nome2"]').clear().type('Gabriel lolo')
    cy.get('input[name="tempo2"]').clear().type('38')
    cy.get('input[name="nome3"]').clear().type('Anna Clara')
    cy.get('input[name="tempo3"]').clear().type('52')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/exercicio4/processar.php')
    cy.contains('PÓDIO DA CORRIDA').should('be.visible')
    
    cy.get('.lugar-1').should('contain', '1º Lugar').and('contain', 'Gabriel lolo').and('contain', '38 segundos')
    cy.get('.lugar-2').should('contain', '2º Lugar').and('contain', 'Alef').and('contain', '45 segundos')
    cy.get('.lugar-3').should('contain', '3º Lugar').and('contain', 'Anna Clara').and('contain', '52 segundos')
  })

  it('Deve classificar quando os tempos estão em ordem inversa', () => {
    cy.get('input[name="nome1"]').clear().type('Fernanda')
    cy.get('input[name="tempo1"]').clear().type('60')
    cy.get('input[name="nome2"]').clear().type('Lays')
    cy.get('input[name="tempo2"]').clear().type('50')
    cy.get('input[name="nome3"]').clear().type('Alef')
    cy.get('input[name="tempo3"]').clear().type('40')
    cy.get('button[type="submit"]').click()

    // Verifica a ordem correta: Alef (40), Lays (50), Fernanda (60)
    cy.get('.lugar-1').should('contain', 'Alef').and('contain', '40 segundos')
    cy.get('.lugar-2').should('contain', 'Lays').and('contain', '50 segundos')
    cy.get('.lugar-3').should('contain', 'Fernanda').and('contain', '60 segundos')
  })

  it('Deve classificar quando os tempos já estão ordenados', () => {
    cy.get('input[name="nome1"]').clear().type('Anna Clara')
    cy.get('input[name="tempo1"]').clear().type('30')
    cy.get('input[name="nome2"]').clear().type('Lays')
    cy.get('input[name="tempo2"]').clear().type('35')
    cy.get('input[name="nome3"]').clear().type('Fernanda')
    cy.get('input[name="tempo3"]').clear().type('40')
    cy.get('button[type="submit"]').click()

    cy.get('.lugar-1').should('contain', 'Anna Clara').and('contain', '30 segundos')
    cy.get('.lugar-2').should('contain', 'Lays').and('contain', '35 segundos')
    cy.get('.lugar-3').should('contain', 'Fernanda').and('contain', '40 segundos')
  })

  // TESTES COM TEMPOS IGUAIS

  it('Deve lidar com tempos iguais entre atletas', () => {
    cy.get('input[name="nome1"]').clear().type('Alef')
    cy.get('input[name="tempo1"]').clear().type('45')
    cy.get('input[name="nome2"]').clear().type('Gabriel lolo')
    cy.get('input[name="tempo2"]').clear().type('45')
    cy.get('input[name="nome3"]').clear().type('Anna Clara')
    cy.get('input[name="tempo3"]').clear().type('50')
    cy.get('button[type="submit"]').click()

    cy.contains('PÓDIO DA CORRIDA').should('be.visible')
    cy.get('.podio .lugar').should('have.length', 3)
  })

  it('Deve lidar com todos os tempos iguais', () => {
    cy.get('input[name="nome1"]').clear().type('Fernanda')
    cy.get('input[name="tempo1"]').clear().type('42')
    cy.get('input[name="nome2"]').clear().type('Lays')
    cy.get('input[name="tempo2"]').clear().type('42')
    cy.get('input[name="nome3"]').clear().type('Conceiçao')
    cy.get('input[name="tempo3"]').clear().type('42')
    cy.get('button[type="submit"]').click()

    cy.contains('PÓDIO DA CORRIDA').should('be.visible')
    cy.contains('42 segundos').should('be.visible')
  })

  // TESTES COM VALORES EXTREMOS

  it('Deve aceitar tempos muito baixos', () => {
    cy.get('input[name="nome1"]').clear().type('Anna Clara')
    cy.get('input[name="tempo1"]').clear().type('1')
    cy.get('input[name="nome2"]').clear().type('Lays')
    cy.get('input[name="tempo2"]').clear().type('2')
    cy.get('input[name="nome3"]').clear().type('Alef')
    cy.get('input[name="tempo3"]').clear().type('3')
    cy.get('button[type="submit"]').click()

    cy.get('.lugar-1').should('contain', 'Anna Clara').and('contain', '1 segundos')
    cy.get('.lugar-2').should('contain', 'Lays').and('contain', '2 segundos')
    cy.get('.lugar-3').should('contain', 'Alef').and('contain', '3 segundos')
  })

  it('Deve aceitar tempos muito altos', () => {
    cy.get('input[name="nome1"]').clear().type('Fernanda')
    cy.get('input[name="tempo1"]').clear().type('999')
    cy.get('input[name="nome2"]').clear().type('Lays')
    cy.get('input[name="tempo2"]').clear().type('500')
    cy.get('input[name="nome3"]').clear().type('Alef')
    cy.get('input[name="tempo3"]').clear().type('750')
    cy.get('button[type="submit"]').click()

    cy.get('.lugar-1').should('contain', 'Lays').and('contain', '500 segundos')
    cy.get('.lugar-2').should('contain', 'Alef').and('contain', '750 segundos')
    cy.get('.lugar-3').should('contain', 'Fernanda').and('contain', '999 segundos')
  })

  // TESTES DE NAVEGAÇÃO

  it('Deve permitir voltar para o formulário', () => {
    cy.get('input[name="nome1"]').clear().type('Alef')
    cy.get('input[name="tempo1"]').clear().type('45')
    cy.get('input[name="nome2"]').clear().type('Lays')
    cy.get('input[name="tempo2"]').clear().type('38')
    cy.get('input[name="nome3"]').clear().type('Anna Clara')
    cy.get('input[name="tempo3"]').clear().type('52')
    cy.get('button[type="submit"]').click()

    cy.contains('button', 'Voltar').should('be.visible').click()
    cy.url().should('include', '/exercicio4/index.php')
    cy.contains('Classificação da Corrida').should('be.visible')
  })

  // TESTES DE VALIDAÇÃO

  it('Não deve permitir enviar formulário vazio', () => {
    cy.get('button[type="submit"]').click()
    
    cy.url().should('include', '/exercicio4/index.php')
  })

  it('Não deve permitir enviar sem todos os campos preenchidos', () => {
    cy.get('input[name="nome1"]').clear().type('Alef')
    cy.get('input[name="tempo1"]').clear().type('45')
    cy.get('button[type="submit"]').click()
    
    cy.url().should('include', '/exercicio4/index.php')
  })

  // TESTE DE MÚLTIPLAS CLASSIFICAÇÕES

  it('Deve permitir múltiplas classificações seguidas', () => {
    cy.get('input[name="nome1"]').clear().type('Alef')
    cy.get('input[name="tempo1"]').clear().type('50')
    cy.get('input[name="nome2"]').clear().type('Lays')
    cy.get('input[name="tempo2"]').clear().type('45')
    cy.get('input[name="nome3"]').clear().type('Anna Clara')
    cy.get('input[name="tempo3"]').clear().type('55')
    cy.get('button[type="submit"]').click()
    cy.get('.lugar-1').should('contain', 'Lays')
    cy.contains('button', 'Voltar').click()
    cy.get('input[name="nome1"]').clear().type('Fernanda')
    cy.get('input[name="tempo1"]').clear().type('40')
    cy.get('input[name="nome2"]').clear().type('Alef')
    cy.get('input[name="tempo2"]').clear().type('35')
    cy.get('input[name="nome3"]').clear().type('Lays')
    cy.get('input[name="tempo3"]').clear().type('42')
    cy.get('button[type="submit"]').click()
    cy.get('.lugar-1').should('contain', 'Alef').and('contain', '35 segundos')
  })

  // TESTE DE ACESSIBILIDADE

  it('Deve ter estrutura semântica adequada', () => {
    cy.get('h1').should('exist')
    cy.get('form').should('exist')
    cy.get('label').should('have.length', 3)
    cy.get('button').should('exist')
  })

  it('Deve ter título na página', () => {
    cy.title().should('eq', 'Exercício 4 - Pódio da Corrida')
  })
})