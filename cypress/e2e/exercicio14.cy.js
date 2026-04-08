const preencher = (qtd, val, sat) => {
  cy.get('[data-cy="input-quantidade"]').clear().type(qtd)
  cy.get('[data-cy="input-valor"]').clear().type(val)
  cy.get('[data-cy="input-satisfacao"]').clear().type(sat)
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
