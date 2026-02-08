describe('Exercício 7 - Sistema de Reserva de Sala de Estudo', () => {
  beforeEach(() => {
    cy.visit('/exercicio7/index.php')
  })

  // Testes de Inferface

  it('Deve exibir o formulário corretamente', () => {
    cy.contains('Reserva de Sala de Estudo').should('be.visible')
    cy.get('input[name="nome_sala"]').should('exist')
    cy.get('select[name="periodo"]').should('exist')
    cy.get('input[name="responsavel"]').should('exist')
    cy.get('button[type="submit"]').should('contain', 'Gerar Reserva')
  })

  it('Deve ter todos os campos obrigatórios', () => {
    cy.get('input[name="nome_sala"]').should('have.attr', 'required')
    cy.get('select[name="periodo"]').should('have.attr', 'required')
    cy.get('input[name="responsavel"]').should('have.attr', 'required')
  })

  it('Deve ter opções de período e permitir seleção', () => {
    cy.get('select[name="periodo"] option').should('have.length', 4)
    cy.get('select[name="periodo"]').select('Manhã').should('have.value', 'Manhã')
    cy.get('select[name="periodo"]').select('Tarde').should('have.value', 'Tarde')
    cy.get('select[name="periodo"]').select('Noite').should('have.value', 'Noite')
  })
  
  it('Deve ter placeholders informativos', () => {
    cy.get('input[name="nome_sala"]').should('have.attr', 'placeholder', 'Ex: Sala 101')
    cy.get('input[name="responsavel"]').should('have.attr', 'placeholder', 'Seu nome completo')
  })

  // Testes de Reserva - PERÍODO MANHÃ

  it('Deve gerar reserva para período Manhã com duração de 2 horas', () => {
    cy.get('input[name="nome_sala"]').clear().type('Sala 101')
    cy.get('select[name="periodo"]').select('Manhã')
    cy.get('input[name="responsavel"]').clear().type('Anna Lays')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/exercicio7/processar.php')
    cy.contains('Comprovante de Reserva').should('be.visible')
    cy.contains('Sala: Sala 101').should('be.visible')
    cy.contains('Responsável: Anna Lays').should('be.visible')
    cy.contains('Período: Manhã').should('be.visible')
    cy.contains('Duração máxima permitida: 2 horas').should('be.visible')
  })

  // Testes de Reserva - PERÍODO TARDE

  it('Deve gerar reserva para período Tarde com duração de 3 horas', () => {
    cy.get('input[name="nome_sala"]').clear().type('Sala de Estudo 3')
    cy.get('select[name="periodo"]').select('Tarde')
    cy.get('input[name="responsavel"]').clear().type('Alef Samuel')
    cy.get('button[type="submit"]').click()

    cy.contains('Comprovante de Reserva').should('be.visible')
    cy.contains('Sala: Sala de Estudo 3').should('be.visible')
    cy.contains('Responsável: Alef Samuel').should('be.visible')
    cy.contains('Período: Tarde').should('be.visible')
    cy.contains('Duração máxima permitida: 3 horas').should('be.visible')
  })

  // Testes de Reserva- PERÍODO NOITE

  it('Deve gerar reserva para período Noite com duração de 4 horas', () => {
    cy.get('input[name="nome_sala"]').clear().type('Sala 202')
    cy.get('select[name="periodo"]').select('Noite')
    cy.get('input[name="responsavel"]').clear().type('Anna Clara')
    cy.get('button[type="submit"]').click()

    cy.contains('Comprovante de Reserva').should('be.visible')
    cy.contains('Sala: Sala 202').should('be.visible')
    cy.contains('Responsável: Anna Clara').should('be.visible')
    cy.contains('Período: Noite').should('be.visible')
    cy.contains('Duração máxima permitida: 4 horas').should('be.visible')
  })

  // TESTES COM DIFERENTES NOMES DE SALA

  it('Deve aceitar nomes de sala com números', () => {
    cy.get('input[name="nome_sala"]').clear().type('Sala 305')
    cy.get('select[name="periodo"]').select('Manhã')
    cy.get('input[name="responsavel"]').clear().type('Rayane')
    cy.get('button[type="submit"]').click()

    cy.contains('Sala: Sala 305').should('be.visible')
  })

  it('Deve aceitar nomes de sala descritivos', () => {
    cy.get('input[name="nome_sala"]').clear().type('Laboratório de Informática')
    cy.get('select[name="periodo"]').select('Tarde')
    cy.get('input[name="responsavel"]').clear().type('Liliane')
    cy.get('button[type="submit"]').click()

    cy.contains('Sala: Laboratório de Informática').should('be.visible')
  })

  // TESTES COM DIFERENTES RESPONSÁVEIS

  it('Deve aceitar nomes completos', () => {
    cy.get('input[name="nome_sala"]').clear().type('Sala 101')
    cy.get('select[name="periodo"]').select('Manhã')
    cy.get('input[name="responsavel"]').clear().type('Edmar Gomes')
    cy.get('button[type="submit"]').click()

    cy.contains('Responsável: Edmar Gomes').should('be.visible')
  })

  it('Deve aceitar nomes com acentuação', () => {
    cy.get('input[name="nome_sala"]').clear().type('Sala 101')
    cy.get('select[name="periodo"]').select('Noite')
    cy.get('input[name="responsavel"]').clear().type('Fernanda Maressa')
    cy.get('button[type="submit"]').click()

    cy.contains('Responsável: Fernanda Maressa').should('be.visible')
  })

  // TESTES DE Navegação

  it('Deve permitir fazer nova reserva após gerar comprovante', () => {
    cy.get('input[name="nome_sala"]').clear().type('Sala 101')
    cy.get('select[name="periodo"]').select('Manhã')
    cy.get('input[name="responsavel"]').clear().type('Anna Clara Lima')
    cy.get('button[type="submit"]').click()

    cy.contains('button', 'Nova Reserva').should('be.visible').click()
    cy.url().should('include', '/exercicio7/index.php')
    cy.contains('Reserva de Sala de Estudo').should('be.visible')
  })

  // TESTES DE VALIDAÇÃO

  it('Não deve permitir enviar formulário vazio', () => {
    cy.get('button[type="submit"]').click()
    
    cy.url().should('include', '/exercicio7/index.php')
  })

  it('Não deve permitir enviar sem selecionar o período', () => {
    cy.get('input[name="nome_sala"]').clear().type('Sala 101')
    cy.get('input[name="responsavel"]').clear().type('Lays Silva')
    cy.get('button[type="submit"]').click()
    
    cy.url().should('include', '/exercicio7/index.php')
  })

  it('Não deve permitir enviar sem o nome da sala', () => {
    cy.get('select[name="periodo"]').select('Manhã')
    cy.get('input[name="responsavel"]').clear().type('Alef Costa')
    cy.get('button[type="submit"]').click()
    
    cy.url().should('include', '/exercicio7/index.php')
  })

  it('Não deve permitir enviar sem responsável', () => {
    cy.get('input[name="nome_sala"]').clear().type('Sala 101')
    cy.get('select[name="periodo"]').select('Tarde')
    cy.get('button[type="submit"]').click()
    
    cy.url().should('include', '/exercicio7/index.php')
  })

  // TESTE DE MÚLTIPLAS RESERVAS

  it('Deve permitir fazer múltiplas reservas seguidas', () => {
    // Primeira reserva - Manhã
    cy.get('input[name="nome_sala"]').clear().type('Sala 101')
    cy.get('select[name="periodo"]').select('Manhã')
    cy.get('input[name="responsavel"]').clear().type('Lays Silva')
    cy.get('button[type="submit"]').click()
    cy.contains('Duração máxima permitida: 2 horas').should('be.visible')
    cy.contains('button', 'Nova Reserva').click()

    // Segunda reserva - Tarde
    cy.get('input[name="nome_sala"]').clear().type('Sala 202')
    cy.get('select[name="periodo"]').select('Tarde')
    cy.get('input[name="responsavel"]').clear().type('Alef Costa')
    cy.get('button[type="submit"]').click()
    cy.contains('Duração máxima permitida: 3 horas').should('be.visible')
    cy.contains('button', 'Nova Reserva').click()

    // Terceira reserva - Noite
    cy.get('input[name="nome_sala"]').clear().type('Sala 303')
    cy.get('select[name="periodo"]').select('Noite')
    cy.get('input[name="responsavel"]').clear().type('Anna Clara')
    cy.get('button[type="submit"]').click()
    cy.contains('Duração máxima permitida: 4 horas').should('be.visible')
  })

  // TESTE DE ACESSIBILIDADE

  it('Deve ter labels associados aos inputs', () => {
    cy.get('label[for="nome_sala"]').should('exist')
    cy.get('label[for="periodo"]').should('exist')
    cy.get('label[for="responsavel"]').should('exist')
  })

  it('Deve ter estrutura semântica adequada', () => {
    cy.get('h2').should('exist')
    cy.get('form').should('exist')
    cy.get('label').should('have.length', 3)
    cy.get('button').should('exist')
  })

  it('Deve ter título na página', () => {
    cy.title().should('eq', 'Reserva de Sala de Estudo')
  })
})