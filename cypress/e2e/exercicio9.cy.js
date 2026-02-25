describe('Exercício 9 - Analisador de Consoantes', () => {
  beforeEach(() => {
    cy.visit('/exercicio9/index.php')
  })

  // INTERFACE

  it('Deve exibir o formulário corretamente', () => {
    cy.contains('Analisador de Consoantes').should('be.visible')
    cy.get('textarea[name="frase"]').should('exist')
    cy.get('button[type="submit"]').should('contain', 'Contar Consoantes')
  })

  it('Deve ter textarea obrigatório', () => {
    cy.get('textarea[name="frase"]').should('have.attr', 'required')
  })

  it('Deve ter placeholder informativo', () => {
    cy.get('textarea[name="frase"]')
      .should('have.attr', 'placeholder', 'Ex: Programação em PHP é incrível!')
  })

  it('Deve exibir informações sobre análise', () => {
    cy.contains('O que será analisado:').should('be.visible')
    cy.contains('Total de consoantes encontradas').should('be.visible')
    cy.contains('Total de vogais encontradas').should('be.visible')
    cy.contains('Porcentagem de consoantes').should('be.visible')
  })

  //CONTAGEM BÁSICA

  it('Deve analisar frase simples corretamente', () => {
    cy.get('textarea[name="frase"]').clear().type('abc')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/exercicio9/processar.php')
    cy.contains('Resultado da Análise').should('be.visible')
    cy.get('.stat-card.consoantes .stat-numero').should('contain', '2') 
    cy.get('.stat-card.vogais .stat-numero').should('contain', '1') 
    cy.get('.stat-card.total .stat-numero').should('contain', '3')
  })

  it('Deve contar consoantes e vogais na frase do exemplo', () => {
    cy.get('textarea[name="frase"]').clear().type('Programação em PHP é incrível!')
    cy.get('button[type="submit"]').click()

    cy.get('.stat-card.consoantes .stat-numero').should('contain', '15')
    cy.get('.stat-card.vogais .stat-numero').should('contain', '10')
    cy.get('.stat-card.total .stat-numero').should('contain', '25')
  })

  it('Deve calcular porcentagem corretamente', () => {
    cy.get('textarea[name="frase"]').clear().type('Programação em PHP é incrível!')
    cy.get('button[type="submit"]').click()

    cy.get('.stat-card.porcentagem .stat-numero').invoke('text').then((text) => {
      const porcentagem = parseFloat(text.replace('%', '').replace(',', '.'))
      expect(porcentagem).to.be.closeTo(60, 0.1) 
    })
  })

  //ACENTOS E Ç

  it('Deve contar Ç como consoante', () => {
    cy.get('textarea[name="frase"]').clear().type('ação')
    cy.get('button[type="submit"]').click()

    cy.get('.stat-card.consoantes .stat-numero').should('contain', '1') 
    cy.get('.stat-card.vogais .stat-numero').should('contain', '3') 
  })
  it('Deve contar vogais acentuadas', () => {
   cy.get('textarea[name="frase"]').clear().type('José está aqui')
   cy.get('button[type="submit"]').click()

   cy.get('.stat-card.consoantes .stat-numero').should('contain', '5') 
   cy.get('.stat-card.vogais .stat-numero').should('contain', '7')     
  })
  it('Deve ignorar números e símbolos', () => {
    cy.get('textarea[name="frase"]').clear().type('abc123!@#')
    cy.get('button[type="submit"]').click()

    cy.get('.stat-card.consoantes .stat-numero').should('contain', '2') 
    cy.get('.stat-card.vogais .stat-numero').should('contain', '1') 
    cy.get('.stat-card.total .stat-numero').should('contain', '3')
  })

  //MAIÚSCULAS E MINÚSCULAS

  it('Deve tratar maiúsculas como minúsculas', () => {
    cy.get('textarea[name="frase"]').clear().type('ABC')
    cy.get('button[type="submit"]').click()

    cy.get('.stat-card.consoantes .stat-numero').should('contain', '2')
    cy.get('.stat-card.vogais .stat-numero').should('contain', '1')
  })

  it('Deve funcionar com texto todo maiúsculo', () => {
    cy.get('textarea[name="frase"]').clear().type('PROGRAMAÇÃO')
    cy.get('button[type="submit"]').click()
    
    cy.get('.stat-card.consoantes .stat-numero').should('contain', '6') 
    cy.get('.stat-card.vogais .stat-numero').should('contain', '5') 
  })

  //LISTA DE CONSOANTES

  it('Deve listar cada consoante encontrada', () => {
    cy.get('textarea[name="frase"]').clear().type('abc')
    cy.get('button[type="submit"]').click()

    cy.contains('Consoantes encontradas:').should('be.visible')
    cy.get('.consoantes-grid .consoante-item').should('have.length', 2)
  })

  it('Deve exibir consoantes no grid', () => {
    cy.get('textarea[name="frase"]').clear().type('bcd')
    cy.get('button[type="submit"]').click()

    cy.get('.consoante-letra').eq(0).should('contain', 'b')
    cy.get('.consoante-letra').eq(1).should('contain', 'c')
    cy.get('.consoante-letra').eq(2).should('contain', 'd')
  })

  // FRASES VARIADAS

  it('Deve analisar frase com apenas vogais', () => {
    cy.get('textarea[name="frase"]').clear().type('aeiou')
    cy.get('button[type="submit"]').click()

    cy.get('.stat-card.consoantes .stat-numero').should('contain', '0')
    cy.get('.stat-card.vogais .stat-numero').should('contain', '5')
  })

  it('Deve analisar frase com apenas consoantes', () => {
    cy.get('textarea[name="frase"]').clear().type('bcdfg')
    cy.get('button[type="submit"]').click()

    cy.get('.stat-card.consoantes .stat-numero').should('contain', '5')
    cy.get('.stat-card.vogais .stat-numero').should('contain', '0')
  })

  it('Deve funcionar com texto longo', () => {
    const textoLongo = 'A programação em PHP é uma habilidade essencial para desenvolvimento web moderno e eficiente'
    cy.get('textarea[name="frase"]').clear().type(textoLongo)
    cy.get('button[type="submit"]').click()

    cy.get('.stat-card.total .stat-numero').should('exist')
    cy.contains('Consoantes encontradas:').should('be.visible')
  })

  // NAVEGAÇÃO

  it('Deve permitir fazer nova análise', () => {
    cy.get('textarea[name="frase"]').clear().type('teste')
    cy.get('button[type="submit"]').click()

    cy.contains('button', '↻ Nova Análise').should('be.visible').click()
    cy.url().should('include', '/exercicio9/index.php')
    cy.contains('Analisador de Consoantes').should('be.visible')
  })

  // VALIDAÇÃO

  it('Não deve permitir enviar formulário vazio', () => {
    cy.get('button[type="submit"]').click()
    
    cy.url().should('include', '/exercicio9/index.php')
  })

  // CSS E ANIMAÇÕES

  it('Deve ter cards com cores diferentes', () => {
    cy.get('textarea[name="frase"]').clear().type('teste')
    cy.get('button[type="submit"]').click()

    cy.get('.stat-card.consoantes').should('have.css', 'border-top-color', 'rgb(65, 105, 225)')
    cy.get('.stat-card.vogais').should('have.css', 'border-top-color', 'rgb(50, 205, 50)')
  })

  it('Deve ter animação de hover nos cards', () => {
    cy.get('textarea[name="frase"]').clear().type('teste')
    cy.get('button[type="submit"]').click()

    cy.get('.stat-card').first().trigger('mouseover')
    cy.get('.stat-card').first().should('have.css', 'transition-property')
  })

  it('Deve ter filter brightness no botão', () => {
    cy.get('button[type="submit"]')
      .should('have.css', 'filter')
  })

  //ACESSIBILIDADE

  it('Deve ter label associado ao textarea', () => {
    cy.get('label[for="frase"]').should('exist')
    cy.get('textarea[id="frase"]').should('exist')
  })

  it('Deve ter estrutura semântica adequada', () => {
    cy.get('h1').should('exist')
    cy.get('form').should('exist')
    cy.get('label').should('exist')
    cy.get('button').should('exist')
  })

  it('Deve ter título na página', () => {
    cy.title().should('eq', 'Analisador de Consoantes')
  })

})