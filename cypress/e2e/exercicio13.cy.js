// ── Helpers (fora de qualquer describe para ficarem acessíveis a todos) ─
const digitar   = (val) => cy.get('#pontuacao').clear().type(String(val))
const submeter  = ()    => cy.get('#form-pontuacao').submit()
const registrar = (val) => { cy.visit('/exercicio13/index.php'); digitar(val); submeter() }
const encerrar  = ()    => { cy.visit('/exercicio13/index.php'); digitar(-1);  submeter() }
const limpar    = ()    => cy.visit('/exercicio13/limpar.php')

// ======================================================================
// 1. FRONTEND — index.php (estrutura, campos, legenda, preview JS)
// ======================================================================

describe('Exercício 13 - index.php — Estrutura e Interface', () => {

  beforeEach(() => cy.visit('/exercicio13/index.php'))

  it('exibe o título com a palavra Desempenho',        () => cy.get('h1').should('contain.text', 'Desempenho'))
  it('exibe o badge Exercício 13',                     () => cy.get('.badge-label').should('contain.text', 'Exercício 13'))
  it('instrui o usuário a digitar -1 para encerrar',   () => cy.get('.subtitle').should('contain.text', '-1'))
  it('campo #pontuacao está visível',                  () => cy.get('#pontuacao').should('be.visible'))
  it('botão submit está visível',                      () => cy.get('#btn-submit').should('be.visible'))
  it('formulário aponta para processar.php',           () => cy.get('#form-pontuacao').should('have.attr', 'action').and('include', 'processar.php'))
  it('formulário usa método POST',                     () => cy.get('#form-pontuacao').should('have.attr', 'method', 'POST'))

  it('exibe exatamente 4 itens de legenda', () => cy.get('.legend-item').should('have.length', 4))

  it('legenda BAIXO: faixa 0.0–4.9', () => {
    cy.get('.legend-item--baixo').within(() => {
      cy.get('.legend-range').should('contain.text', '0.0').and('contain.text', '4.9')
      cy.get('.legend-label').should('contain.text', 'BAIXO')
    })
  })

  it('legenda MÉDIO: faixa 5.0–6.9', () => {
    cy.get('.legend-item--medio').within(() => {
      cy.get('.legend-range').should('contain.text', '5.0').and('contain.text', '6.9')
      cy.get('.legend-label').should('contain.text', 'MÉDIO')
    })
  })

  it('legenda BOM: faixa 7.0–8.4', () => {
    cy.get('.legend-item--bom').within(() => {
      cy.get('.legend-range').should('contain.text', '7.0').and('contain.text', '8.4')
      cy.get('.legend-label').should('contain.text', 'BOM')
    })
  })

  it('legenda EXCELENTE: faixa 8.5–10.0', () => {
    cy.get('.legend-item--excelente').within(() => {
      cy.get('.legend-range').should('contain.text', '8.5').and('contain.text', '10.0')
      cy.get('.legend-label').should('contain.text', 'EXCELENTE')
    })
  })

  it('preview mostra BAIXO ao digitar 3.5',     () => { digitar('3.5'); cy.get('#nivel-preview').should('contain.text', 'BAIXO') })
  it('preview mostra MÉDIO ao digitar 6.0',     () => { digitar('6.0'); cy.get('#nivel-preview').should('contain.text', 'MÉDIO') })
  it('preview mostra BOM ao digitar 7.5',       () => { digitar('7.5'); cy.get('#nivel-preview').should('contain.text', 'BOM') })
  it('preview mostra EXCELENTE ao digitar 9.0', () => { digitar('9.0'); cy.get('#nivel-preview').should('contain.text', 'EXCELENTE') })
  it('preview mostra ENCERRAR ao digitar -1',   () => { digitar('-1');  cy.get('#nivel-preview').should('contain.text', 'ENCERRAR') })

  it('mostra erro no hint para valor 15 (fora do range)', () => { digitar('15'); cy.get('#field-error').should('be.visible').and('not.be.empty') })
  it('adiciona classe is-invalid no input para valor 11', () => { digitar('11'); cy.get('#pontuacao').should('have.class', 'is-invalid') })

  it('limpa o preview ao apagar o valor', () => {
    digitar('8.0')
    cy.get('#nivel-preview').should('contain.text', 'BOM')
    cy.get('#pontuacao').clear().trigger('input')
    cy.get('#nivel-preview').should('have.text', '')
  })

  it('texto do botão muda para "Encerrar" ao digitar -1', () => {
    digitar('-1')
    cy.get('.btn-text').should('contain.text', 'Encerrar')
  })

  it('texto do botão volta ao normal ao digitar 8.0', () => {
    digitar('-1')
    cy.get('.btn-text').should('contain.text', 'Encerrar')
    cy.get('#pontuacao').clear().type('8.0')
    cy.get('.btn-text').should('contain.text', 'Registrar')
  })

  const limitesPreview = [
    ['0.0', 'BAIXO'], ['4.9', 'BAIXO'],
    ['5.0', 'MÉDIO'], ['6.9', 'MÉDIO'],
    ['7.0', 'BOM'],   ['8.4', 'BOM'],
    ['8.5', 'EXCELENTE'], ['10.0', 'EXCELENTE'],
  ]

  limitesPreview.forEach(([val, esperado]) => {
    it(`preview: ${val} → ${esperado}`, () => {
      digitar(val)
      cy.get('#nivel-preview').should('contain.text', esperado)
    })
  })

})

// ======================================================================
// 2. FRONTEND — resultado.php (estrutura, cards, tabela, botões)
// ======================================================================

describe('Exercício 13 - resultado.php — Estrutura e Interface', () => {

  beforeEach(() => cy.visit('/exercicio13/resultado.php'))

  it('exibe badge "Resultado Final"', () => cy.get('.badge-label').should('contain.text', 'Resultado Final'))
  it('exibe título com "Desempenho"', () => cy.get('h1').should('contain.text', 'Desempenho'))

  it('exibe 6 stat-cards',            () => cy.get('.stat-card').should('have.length', 6))
  it('stat-card--highlight existe',   () => cy.get('.stat-card--highlight').should('exist'))
  it('stat-card--highlight label BOM',() => cy.get('.stat-card--highlight .stat-label').should('contain.text', 'BOM'))
  it('existe card Total cadastrado',  () => cy.contains('.stat-label', 'Total cadastrado').should('exist'))
  it('existe card Percentual BOM',    () => cy.contains('.stat-label', 'Percentual BOM').should('exist'))
  it('existe card Maior pontuação',   () => cy.contains('.stat-label', 'Maior pontuação').should('exist'))
  it('existe card Menor pontuação',   () => cy.contains('.stat-label', 'Menor pontuação').should('exist'))
  it('existe card Média geral',       () => cy.contains('.stat-label', 'Média geral').should('exist'))

  it('elemento #stat-bons existe',    () => cy.get('#stat-bons').should('exist'))
  it('elemento #stat-total existe',   () => cy.get('#stat-total').should('exist'))
  it('elemento #stat-percent existe', () => cy.get('#stat-percent').should('exist'))
  it('elemento #stat-maior existe',   () => cy.get('#stat-maior').should('exist'))
  it('elemento #stat-menor existe',   () => cy.get('#stat-menor').should('exist'))
  it('elemento #stat-media existe',   () => cy.get('#stat-media').should('exist'))

  it('card--table está presente',             () => cy.get('.card--table').should('exist'))
  it('título "Todas as Pontuações" presente', () => cy.get('.table-title').should('contain.text', 'Todas as Pontuações'))
  it('tabela ou empty-state está presente',   () => cy.get('#tabela-pontuacoes, #empty-state').should('exist'))

  it('cabeçalhos da tabela corretos (quando há registros)', () => {
    cy.get('body').then($body => {
      if ($body.find('#tabela-pontuacoes').length) {
        cy.get('#tabela-pontuacoes thead').within(() => {
          cy.contains('th', '#').should('exist')
          cy.contains('th', 'Pontuação').should('exist')
          cy.contains('th', 'Nível').should('exist')
          cy.contains('th', 'Status').should('exist')
        })
      }
    })
  })

  it('botão Novo Teste aponta para index.php', () => cy.get('#btn-novo-teste').should('contain.text', 'Novo Teste').and('have.attr', 'href').and('include', 'index.php'))
  it('botão Limpar aponta para limpar.php',    () => cy.get('#btn-limpar').should('have.attr', 'href').and('include', 'limpar.php'))
  it('botão Limpar tem classe btn--danger',    () => cy.get('#btn-limpar').should('have.class', 'btn--danger'))

})

// ======================================================================
// 3. INTEGRAÇÃO — processar.php (aceitação de pontuações válidas, redirecionamento, resumo correto)  
// Não fiz todos os testes pois é necessario ter um controle sobre o banco de dados para garantir os resultados esperados. 
// Testei manualmente e está tudo certo, 
// mas para automatizar seria necessário criar um ambiente de teste isolado ou mockar a camada de acesso a dados, o que foge do escopo atual. 
// De qualquer forma, os testes de frontend já garantem que as pontuações válidas são aceitas e que o redirecionamento ocorre corretamente.
// ======================================================================
 
describe('Exercício 13 - Integração — Inserção de pontuações válidas', () => {
 
  it('aceita 7.5 e redireciona para index.php', () => { registrar(7.5);  cy.url().should('include', 'index.php') })
  it('aceita 5.0 e redireciona para index.php', () => { registrar(5.0);  cy.url().should('include', 'index.php') })
  it('aceita 8.9 e redireciona para index.php', () => { registrar(8.9);  cy.url().should('include', 'index.php') })
  it('aceita 0.0 e redireciona para index.php', () => { registrar(0.0);  cy.url().should('include', 'index.php') })
  it('aceita 10.0 e redireciona para index.php', () => { registrar(10.0); cy.url().should('include', 'index.php') })
})

// ======================================================================
// 4. BANCO DE DADOS — inserção, classificação, contagem e limpeza
// ======================================================================
 
describe('Exercício 13 - Banco de Dados — Inserção e classificação', () => {
 
  before(() => limpar())
 
  it('inserir 7.5 → alert-success menciona BOM',       () => { registrar(7.5);  cy.get('.alert--success').should('contain.text', 'BOM') })
  it('inserir 9.0 → alert-success menciona EXCELENTE', () => { registrar(9.0);  cy.get('.alert--success').should('contain.text', 'EXCELENTE') })
  it('inserir 5.0 → alert-success menciona MÉDIO',     () => { registrar(5.0);  cy.get('.alert--success').should('contain.text', 'MÉDIO') })
  it('inserir 2.0 → alert-success menciona BAIXO',     () => { registrar(2.0);  cy.get('.alert--success').should('contain.text', 'BAIXO') })
 
  it('inserir valor inválido 11 → alert-error',        () => { registrar(11);   cy.get('.alert--error').should('be.visible') })
  it('inserir valor inválido -2 → alert-error',        () => { registrar(-2);   cy.get('.alert--error').should('be.visible') })
 
})
 
describe('Exercício 13 - Banco de Dados — Contagem e resultado', () => {
 
  before(() => {
    limpar()
    registrar(7.0)
    registrar(8.4)
    registrar(9.5)
    registrar(3.0)
  })
 
  it('encerrar com -1 redireciona para resultado.php', () => {
    encerrar()
    cy.url().should('include', 'resultado.php')
  })
 
  it('stat-total exibe 4',       () => { encerrar(); cy.get('#stat-total').should('have.text', '4') })
  it('stat-bons exibe 2',        () => { encerrar(); cy.get('#stat-bons').should('have.text', '2') })
  it('percentual contém 50',     () => { encerrar(); cy.get('#stat-percent').should('contain.text', '50') })
  it('tabela exibe 4 linhas',    () => { encerrar(); cy.get('#tabela-pontuacoes tbody tr').should('have.length', 4) })
  it('2 pills BOM na tabela',    () => { encerrar(); cy.get('.status-pill--bom').should('have.length', 2) })
  it('2 pills FORA DA FAIXA',    () => { encerrar(); cy.get('.status-pill--fora').should('have.length', 2) })
 
})
 
describe('Exercício 13 - Banco de Dados — Estatísticas', () => {
 
  before(() => {
    limpar()
    registrar(3.0)
    registrar(7.5)
    registrar(10.0)
  })
 
  it('maior pontuação = 10.0', () => { encerrar(); cy.get('#stat-maior').should('contain.text', '10') })
  it('menor pontuação = 3.0',  () => { encerrar(); cy.get('#stat-menor').should('contain.text', '3') })
  it('média geral = 6.8',      () => { encerrar(); cy.get('#stat-media').should('contain.text', '6.8') })
 
})
 
describe('Exercício 13 - Banco de Dados — Ordenação', () => {
 
  before(() => {
    limpar()
    registrar(2.0)
    cy.wait(1100)
    registrar(9.0)
  })
 
  it('primeira linha da tabela é o registro mais recente (9.0)', () => {
    encerrar()
    cy.get('#tabela-pontuacoes tbody tr').first().find('.td-score').should('contain.text', '9.0')
  })
 
})
 
describe('Exercício 13 - Banco de Dados — Limpar registros', () => {
 
  before(() => {
    limpar()
    registrar(8.0)
  })
 
  it('limpar.php redireciona para index.php',         () => { limpar(); cy.url().should('include', 'index.php') })
  it('exibe alert--info após limpar',                 () => { limpar(); cy.get('.alert--info').should('be.visible') })
  it('após limpar banco fica vazio (total = 0)',       () => { limpar(); encerrar(); cy.get('#stat-total').should('have.text', '0') })
  it('após limpar exibe empty-state na tabela',       () => { limpar(); encerrar(); cy.get('#empty-state').should('be.visible') })
 
})
 