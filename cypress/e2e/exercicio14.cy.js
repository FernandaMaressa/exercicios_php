const preencher = (qtd, val, sat) => {
  cy.get('[data-cy="input-quantidade"]').clear()
  if (qtd !== null) cy.get('[data-cy="input-quantidade"]').type(qtd)

  cy.get('[data-cy="input-valor"]').clear()
  if (val !== null) cy.get('[data-cy="input-valor"]').type(val)

  cy.get('[data-cy="input-satisfacao"]').clear()
  if (sat !== null) cy.get('[data-cy="input-satisfacao"]').type(sat)
}

const submeter = () => {
  cy.get('[data-cy="btn-avaliar"]').click()
}
const verificarClassificacao = (esperado) => {
  cy.get('[data-cy="resultado-classificacao"]').should('contain', esperado)
}

// ════════════════════════════════════════════════════════════
// BLOCO 1 — Estrutura da página
// ════════════════════════════════════════════════════════════
describe('Estrutura da página', () => {

  beforeEach(() => cy.visit('/exercicio14/index.php'))

    it('exibe o título da seção corretamente', () => {  
        cy.get('.section-header-text h2').should('contain.text', 'Avaliação de Vendas')
    })

    it('exibe os campos de quantidade, valor e satisfação', () => { 
        cy.get('[data-cy="input-quantidade"]').should('be.visible')
        cy.get('[data-cy="input-valor"]').should('be.visible')
        cy.get('[data-cy="input-satisfacao"]').should('be.visible')
    })
    
    it('exibe o botão de avaliar', () => { 
        cy.get('[data-cy="btn-avaliar"]').should('be.visible').and('contain.text', 'Avaliar')
    })  
    
  it('exibe o formulário de avaliação', () => {
    cy.get('[data-cy="formulario"]').should('be.visible')
  })

  it('exibe os três campos do formulário', () => {
    cy.get('[data-cy="input-quantidade"]').should('be.visible')
    cy.get('[data-cy="input-valor"]').should('be.visible')
    cy.get('[data-cy="input-satisfacao"]').should('be.visible')
  })

  it('exibe o botão de avaliar', () => {
    cy.get('[data-cy="btn-avaliar"]').should('be.visible')
    cy.get('[data-cy="btn-avaliar"]').should('contain', 'Avaliar')
  })

  it('exibe a seção de estatísticas', () => {
    cy.get('[data-cy="estatisticas"]').should('be.visible')
    cy.get('[data-cy="cards-stats"]').should('be.visible')
  })

  it('exibe a seção de histórico', () => {
    cy.get('[data-cy="historico"]').should('be.visible')
    cy.get('[data-cy="tabela-historico"]').should('be.visible')
  })

  it('exibe o botão de limpar histórico', () => {
    cy.get('[data-cy="btn-limpar"]').should('be.visible')
  })

  it('exibe estado vazio no histórico quando sem registros', () => {
    cy.get('[data-cy="historico-vazio"]').should('be.visible')
  })

})

/* ════════════════════════════════════════════════════════════
   BLOCO 2 — Atributos dos campos
════════════════════════════════════════════════════════════ */
describe('Atributos e limites dos campos', () => {
 
  beforeEach(() => cy.visit('/exercicio14/index.php'))
 
  it('campo quantidade: type=number, min=0, max=100, step=1', () => {
    cy.get('[data-cy="input-quantidade"]')
      .should('have.attr', 'type', 'number')
      .and('have.attr', 'min', '0')
      .and('have.attr', 'max', '100')
      .and('have.attr', 'step', '1')
  })
 
  it('campo valor: type=number, min=0, max=500, step=0.01', () => {
    cy.get('[data-cy="input-valor"]')
      .should('have.attr', 'type', 'number')
      .and('have.attr', 'min', '0')
      .and('have.attr', 'max', '500')
      .and('have.attr', 'step', '0.01')
  })
 
  it('campo satisfação: type=number, min=0, max=10, step=0.1', () => {
    cy.get('[data-cy="input-satisfacao"]')
      .should('have.attr', 'type', 'number')
      .and('have.attr', 'min', '0')
      .and('have.attr', 'max', '10')
      .and('have.attr', 'step', '0.1')
  })
 
  it('formulário envia para processar.php via POST', () => {
    cy.get('#form-avaliacao')
      .should('have.attr', 'action').and('include', 'processar.php')
    cy.get('#form-avaliacao')
      .should('have.attr', 'method', 'POST')
  })
 
})
 
 
/* ════════════════════════════════════════════════════════════
   BLOCO 3 — Validação JS (frontend, sem envio ao servidor)
════════════════════════════════════════════════════════════ */
describe('Validação frontend (JS)', () => {
 
  beforeEach(() => cy.visit('/exercicio14/index.php'))
 
  it('impede envio e mostra erro quando quantidade está vazia', () => {
    preencher(null, '150', '8')
    submeter()
    cy.get('[data-cy="erro-quantidade"]').should('be.visible')
  })
 
  it('impede envio e mostra erro quando valor médio está vazio', () => {
    preencher('40', null, '8')
    cy.get('[data-cy="input-valor"]').clear()
    submeter()
    cy.get('[data-cy="erro-valor"]').should('be.visible')
    cy.url().should('include', 'index.php')
  })
 
  it('impede envio e mostra erro quando satisfação está vazia', () => {
    preencher('40', '150', null)
    cy.get('[data-cy="input-satisfacao"]').clear()
    submeter()
    cy.get('[data-cy="erro-satisfacao"]').should('be.visible')
    cy.url().should('include', 'index.php')
  })
 
  it('impede envio quando quantidade é maior que 100', () => {
    preencher('150', '150', '8')
    submeter()
    cy.get('[data-cy="erro-quantidade"]').should('be.visible')
    cy.url().should('include', 'index.php')
  })
 
  it('impede envio quando quantidade é negativa', () => {
    preencher('-1', '150', '8')
    submeter()
    cy.get('[data-cy="erro-quantidade"]').should('be.visible')
  })
 
  it('impede envio quando valor médio é maior que 500', () => {
    preencher('40', '600', '8')
    submeter()
    cy.get('[data-cy="erro-valor"]').should('be.visible')
    cy.url().should('include', 'index.php')
  })
 
  it('impede envio quando satisfação é maior que 10', () => {
    preencher('40', '150', '15')
    submeter()
    cy.get('[data-cy="erro-satisfacao"]').should('be.visible')
    cy.url().should('include', 'index.php')
  })
 
  it('impede envio quando satisfação é negativa', () => {
    preencher('40', '150', '-1')
    submeter()
    cy.get('[data-cy="erro-satisfacao"]').should('be.visible')
  })
 
  it('remove o erro do campo ao começar a digitar', () => {
    preencher(null, '150', '8')
    cy.get('[data-cy="input-quantidade"]').clear()
    submeter()
    cy.get('[data-cy="erro-quantidade"]').should('be.visible')
    cy.get('[data-cy="input-quantidade"]').type('40')
    cy.get('[data-cy="input-quantidade"]').should('not.have.class', 'input-erro')
  })
 
  it('não exibe resultado quando há erros de validação', () => {
    preencher(null, null, null)
    cy.get('[data-cy="input-quantidade"]').clear()
    cy.get('[data-cy="input-valor"]').clear()
    cy.get('[data-cy="input-satisfacao"]').clear()
    submeter()
    cy.get('[data-cy="resultado"]').should('not.exist')
  })
 
})
 
 
/* ════════════════════════════════════════════════════════════
   BLOCO 4 — Classificações (via envio ao servidor)
════════════════════════════════════════════════════════════ */
describe('Classificações corretas', () => {
 
  beforeEach(() => cy.visit('/exercicio14/index.php'))
 
  it('classifica como Diamante (todos os 3 critérios top)', () => {
    preencher('60', '250', '9.5')
    submeter()
    cy.get('[data-cy="resultado"]').should('be.visible')
    verificarClassificacao('Diamante')
  })
 
  it('classifica como Ouro (2 critérios top — qtd e sat)', () => {
    preencher('55', '180', '9.2')
    submeter()
    verificarClassificacao('Ouro')
  })
 
  it('classifica como Ouro (2 critérios top — val e sat)', () => {
    preencher('40', '220', '9.5')
    submeter()
    verificarClassificacao('Ouro')
  })
 
  it('classifica como Prata (critérios intermediários)', () => {
    preencher('35', '120', '7.5')
    submeter()
    verificarClassificacao('Prata')
  })
 
  it('classifica como Bronze (satisfação entre 5 e 6.9)', () => {
    preencher('5', '50', '6.0')
    submeter()
    verificarClassificacao('Bronze')
  })
 
  it('classifica como Bronze (quantidade entre 10 e 29)', () => {
    preencher('20', '80', '4.0')
    submeter()
    verificarClassificacao('Bronze')
  })
 
  it('classifica como Insuficiente (satisfação < 5)', () => {
    preencher('5', '50', '3.0')
    submeter()
    verificarClassificacao('Insuficiente')
  })
 
  it('classifica como Insuficiente (quantidade zerada)', () => {
    preencher('0', '200', '9.5')
    submeter()
    verificarClassificacao('Insuficiente')
  })
 
  it('classifica como Insuficiente (valor zerado)', () => {
    preencher('60', '0', '9.5')
    submeter()
    verificarClassificacao('Insuficiente')
  })
 
  it('classifica como Insuficiente (satisfação zerada)', () => {
    preencher('60', '250', '0')
    submeter()
    verificarClassificacao('Insuficiente')
  })
 
  it('classifica como Insuficiente (quantidade < 10)', () => {
    preencher('5', '50', '4.9')
    submeter()
    verificarClassificacao('Insuficiente')
  })
 
})
 