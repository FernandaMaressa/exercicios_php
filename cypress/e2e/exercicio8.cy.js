describe('Exercício 8 - Contador Regressivo', () => {
  beforeEach(() => {
    cy.visit('/exercicio8/index.php')
  })
  //Teste de INTERFACE

 it('Deve exibir o formulário corretamente', () => {
    cy.contains('Contagem Regressiva').should('be.visible')
    cy.get('input[name="numero"]').should('exist')
    cy.get('input[name="numero"]').should('have.attr', 'type', 'number')
    cy.get('button[type="submit"]').should('contain', 'Iniciar Contagem')
  })

  it('Deve ter validação min e max no campo', () => {
    cy.get('input[name="numero"]')
      .should('have.attr', 'min', '5')
      .and('have.attr', 'max', '50')
      .and('have.attr', 'required')
  })

  it('Deve ter placeholder informativo', () => {
    cy.get('input[name="numero"]')
      .should('have.attr', 'placeholder', 'Digite entre 5 e 50')
  })

  // TESTES DE CONTAGEM REGRESSIVA

  it('Deve realizar contagem regressiva de 5 até 1', () => {
    cy.get('input[name="numero"]').clear().type('5')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/exercicio8/processar.php')
    cy.contains('Resultado da Contagem').should('be.visible')
    
    // Verifica que os números aparecem
    cy.get('.resultado').should('contain', '5')
    cy.get('.resultado').should('contain', '4')
    cy.get('.resultado').should('contain', '3')
    cy.get('.resultado').should('contain', '2')
    cy.get('.resultado').should('contain', '1')
    cy.get('.resultado').should('contain', 'FIM DA CONTAGEM!')
  })

  it('Deve realizar contagem regressiva de 10 até 1', () => {
    cy.get('input[name="numero"]').clear().type('10')
    cy.get('button[type="submit"]').click()

    cy.get('.resultado').should('contain', '10')
    cy.get('.resultado').should('contain', '9')
    cy.get('.resultado').should('contain', '5')
    cy.get('.resultado').should('contain', '1')
    cy.get('.resultado').should('contain', 'FIM DA CONTAGEM!')
  })

  it('Deve realizar contagem com número mínimo (5)', () => {
    cy.get('input[name="numero"]').clear().type('5')
    cy.get('button[type="submit"]').click()

    cy.get('.resultado').invoke('text').then((text) => {
      expect(text).to.include('5')
      expect(text).to.include('4')
      expect(text).to.include('3')
      expect(text).to.include('2')
      expect(text).to.include('1')
      expect(text).to.include('FIM DA CONTAGEM!')
    })
  })

  it('Deve realizar contagem com número máximo (50)', () => {
    cy.get('input[name="numero"]').clear().type('50')
    cy.get('button[type="submit"]').click()

    cy.get('.resultado').should('contain', '50')
    cy.get('.resultado').should('contain', '49')
    cy.get('.resultado').should('contain', '25')
    cy.get('.resultado').should('contain', '1')
    cy.get('.resultado').should('contain', 'FIM DA CONTAGEM!')
  })

  it('Deve exibir mensagem final após a contagem', () => {
    cy.get('input[name="numero"]').clear().type('7')
    cy.get('button[type="submit"]').click()

    cy.contains('FIM DA CONTAGEM!').should('be.visible')
  })

  // TESTES DE ORDEM DA CONTAGEM

  it('Deve exibir números em ordem decrescente', () => {
    cy.get('input[name="numero"]').clear().type('5')
    cy.get('button[type="submit"]').click()

    cy.get('.resultado').invoke('text').then((text) => {
      const ordem = text.indexOf('5') < text.indexOf('4') &&
                    text.indexOf('4') < text.indexOf('3') &&
                    text.indexOf('3') < text.indexOf('2') &&
                    text.indexOf('2') < text.indexOf('1')
      expect(ordem).to.be.true
    })
  })

  it('Deve terminar sempre em 1', () => {
    cy.get('input[name="numero"]').clear().type('15')
    cy.get('button[type="submit"]').click()

    cy.get('.resultado').invoke('text').then((text) => {
      expect(text.indexOf('1') < text.indexOf('FIM')).to.be.true
    })
  })

  // TESTES DE NAVEGAÇÃO

  it('Deve permitir fazer nova contagem', () => {
    cy.get('input[name="numero"]').clear().type('8')
    cy.get('button[type="submit"]').click()

    cy.contains('button', 'Nova Contagem').should('be.visible').click()
    cy.url().should('include', '/exercicio8/index.php')
    cy.contains('Contagem Regressiva').should('be.visible')
  })

  // TESTES DE VALIDAÇÃO

  it('Não deve permitir enviar formulário vazio', () => {
    cy.get('button[type="submit"]').click()
    
    cy.url().should('include', '/exercicio8/index.php')
  })

  it('Deve aceitar apenas números no range 5-50', () => {
    cy.get('input[name="numero"]').clear().type('5')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/exercicio8/processar.php')
    cy.go('back')
    cy.get('input[name="numero"]').clear().type('50')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/exercicio8/processar.php')
  })

  // TESTES COM DIFERENTES NÚMEROS

  it('Deve funcionar com número intermediário (20)', () => {
    cy.get('input[name="numero"]').clear().type('20')
    cy.get('button[type="submit"]').click()

    cy.get('.resultado').should('contain', '20')
    cy.get('.resultado').should('contain', '10')
    cy.get('.resultado').should('contain', '1')
    cy.get('.resultado').should('contain', 'FIM DA CONTAGEM!')
  })

  it('Deve funcionar com número ímpar (13)', () => {
    cy.get('input[name="numero"]').clear().type('13')
    cy.get('button[type="submit"]').click()

    cy.get('.resultado').should('contain', '13')
    cy.get('.resultado').should('contain', '7')
    cy.get('.resultado').should('contain', '1')
  })

  it('Deve funcionar com número par (16)', () => {
    cy.get('input[name="numero"]').clear().type('16')
    cy.get('button[type="submit"]').click()

    cy.get('.resultado').should('contain', '16')
    cy.get('.resultado').should('contain', '8')
    cy.get('.resultado').should('contain', '1')
  })

  // TESTES DE CSS E ESTILO

  it('Deve ter estilo aplicado no container', () => {
    cy.get('.container')
      .should('have.css', 'background-color', 'rgb(255, 255, 255)')
      .and('have.css', 'border-radius', '20px')
  })

  it('Deve ter cor rosa no título', () => {
    cy.get('h1')
      .should('have.css', 'color', 'rgb(255, 105, 180)')
  })

  it('Deve ter botão com cor rosa', () => {
    cy.get('button[type="submit"]')
      .should('have.css', 'background-color', 'rgb(255, 105, 180)')
  })

  // TESTE DE MÚLTIPLAS CONTAGENS

  it('Deve permitir múltiplas contagens seguidas', () => {
    cy.get('input[name="numero"]').clear().type('5')
    cy.get('button[type="submit"]').click()
    cy.contains('FIM DA CONTAGEM!').should('be.visible')
    cy.contains('button', 'Nova Contagem').click()

    cy.get('input[name="numero"]').clear().type('10')
    cy.get('button[type="submit"]').click()
    cy.contains('FIM DA CONTAGEM!').should('be.visible')
    cy.contains('button', 'Nova Contagem').click()

    cy.get('input[name="numero"]').clear().type('8')
    cy.get('button[type="submit"]').click()
    cy.contains('FIM DA CONTAGEM!').should('be.visible')
  })

  // TESTE DE ACESSIBILIDADE

  it('Deve ter label associado ao input', () => {
    cy.get('label[for="numero"]').should('exist')
    cy.get('input[id="numero"]').should('exist')
  })

  it('Deve ter estrutura semântica adequada', () => {
    cy.get('h1').should('exist')
    cy.get('form').should('exist')
    cy.get('label').should('exist')
    cy.get('button').should('exist')
  })

  it('Deve ter título na página', () => {
    cy.title().should('eq', 'Contador Regressivo')
  })
})