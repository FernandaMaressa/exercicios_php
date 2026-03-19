describe('Exercício 12 - Escada da Motivação', () => {
  beforeEach(() => {
    cy.visit('/exercicio12/index.php')
  })

  it('exibe o logo com texto correto', () => {
    cy.get('.header-logo').should('be.visible')
    cy.get('.logo-mark').should('exist')
    cy.get('.logo-text').should('contain.text', 'Escada da Motivação')
  })

  it('link do logo aponta para index.php', () => {
    cy.get('.header-logo')
      .should('have.attr', 'href')
      .and('include', 'index.php')
  })

  it('nav exibe os links Gerar e Histórico', () => {
    cy.get('.header-nav .nav-link').should('have.length', 2)
    cy.get('.header-nav .nav-link').first().should('contain.text', 'Gerar')
    cy.get('.header-nav .nav-link').last().should('contain.text', 'Histórico')
  })

  it('link Gerar está marcado como ativo na página inicial', () => {
    cy.get('.header-nav .nav-link.active').should('contain.text', 'Gerar')
  })

  it('link Histórico aponta para historico.php', () => {
    cy.get('.header-nav .nav-link').last()
      .should('have.attr', 'href')
      .and('include', 'historico.php')
  })

  it('header permanece visível ao rolar a página', () => {
    cy.scrollTo('bottom')
    cy.get('.header').should('be.visible')
  })

  it('hero exibe título principal com texto em itálico', () => {
    cy.get('.hero-title').should('contain.text', 'Construa sua')
    cy.get('.hero-title em').should('contain.text', 'Escada de Sucesso')
  })

  it('hero renderiza os 5 degraus decorativos', () => {
    cy.get('.hero-deco .deco-bar').should('have.length', 5)
  })

  it('card do formulário exibe título "Configure sua Escada"', () => {
    cy.get('.form-card .card-title').should('contain.text', 'Configure sua Escada')
  })

  it('formulário usa método POST e aponta para processar.php', () => {
    cy.get('#formEscada')
      .should('have.attr', 'method', 'POST')
      .and('have.attr', 'action')
      .and('include', 'processar.php')
  })

  it('campo meta existe com maxlength 15 e required', () => {
    cy.get('#meta')
      .should('exist')
      .and('have.attr', 'maxlength', '15')
      .and('have.attr', 'required')
  })

  it('select de níveis contém as opções de 3 a 7', () => {
    ;[3, 4, 5, 6, 7].forEach(n => {
      cy.get(`#niveis option[value="${n}"]`).should('exist')
    })
  })
  
  it('radio crescente está marcado por padrão', () => {
    cy.get('input[name="direcao"][value="crescente"]').should('be.checked')
  })

  it('radio decrescente existe e está desmarcado por padrão', () => {
    cy.get('input[name="direcao"][value="decrescente"]').should('not.be.checked')
  })

  it('botão Gerar Escada está visível', () => {
    cy.get('.btn-gerar')
      .should('be.visible')
      .and('contain.text', 'Gerar Escada')
  })

  it('campo meta converte texto para maiúsculas automaticamente', () => {
    cy.get('#meta').type('vencer')
    cy.get('#meta').should('have.value', 'VENCER')
  })

  it('contador inicia em 0/15', () => {
    cy.get('#contador').should('have.text', '0/15')
  })

  it('contador atualiza em tempo real conforme digitação', () => {
    cy.get('#meta').type('META')
    cy.get('#contador').should('have.text', '4/15')
  })

  it('contador exibe 15/15 ao atingir o limite máximo', () => {
    cy.get('#meta').type('ABCDEFGHIJKLMNO')
    cy.get('#contador').should('have.text', '15/15')
  })

  it('campo meta não aceita mais de 15 caracteres', () => {
    cy.get('#meta').type('ABCDEFGHIJKLMNOPQRST')
    cy.get('#meta').invoke('val').then(val => {
      expect(val.length).to.be.lte(15)
    })
  })

  it('exibe dica informando que a meta é convertida para maiúsculas', () => {
    cy.get('.form-hint').should('contain.text', 'maiúsculas')
  })

  it('seleciona corretamente cada nível de 3 a 7', () => {
    ;[3, 4, 5, 6, 7].forEach(n => {
      cy.get('#niveis').select(String(n))
      cy.get('#niveis').should('have.value', String(n))
    })
  })

  it('radio cards exibem os rótulos Crescente e Decrescente', () => {
    cy.get('.radio-card').first().find('.radio-label').should('contain.text', 'Crescente')
    cy.get('.radio-card').last().find('.radio-label').should('contain.text', 'Decrescente')
  })

  it('radio cards exibem as descrições "1 até N" e "N até 1"', () => {
    cy.get('.radio-card').first().find('.radio-desc').should('contain.text', '1 até N')
    cy.get('.radio-card').last().find('.radio-desc').should('contain.text', 'N até 1')
  })

  it('exibe erro de meta ao submeter formulário sem preenchê-la', () => {
    cy.get('.btn-gerar').click()
    cy.get('#erro-meta').should('be.visible')
  })

  it('exibe erro de nível ao submeter sem selecionar nível', () => {
    cy.get('#meta').type('VENCER')
    cy.get('.btn-gerar').click()
    cy.get('#erro-niveis').should('be.visible')
  })

  it('não exibe erros quando todos os campos estão preenchidos', () => {
    cy.get('#meta').type('VENCER')
    cy.get('#niveis').select('5')
    cy.get('#erro-meta').should('not.have.class', 'visivel')
    cy.get('#erro-niveis').should('not.have.class', 'visivel')
  })

  it('erro de meta desaparece ao começar a digitar', () => {
    cy.get('.btn-gerar').click()
    cy.get('#erro-meta').should('be.visible')
    cy.get('#meta').type('M')
    cy.get('#erro-meta').should('not.have.class', 'visivel')
  })

  it('erro de nível desaparece ao selecionar uma opção', () => {
    cy.get('#meta').type('VENCER')
    cy.get('.btn-gerar').click()
    cy.get('#erro-niveis').should('be.visible')
    cy.get('#niveis').select('3')
    cy.get('#erro-niveis').should('not.have.class', 'visivel')
  })

  it('campo meta recebe classe "invalido" ao submeter vazio', () => {
    cy.get('.btn-gerar').click()
    cy.get('#meta').should('have.class', 'invalido')
  })

  it('classe "invalido" é removida ao corrigir o campo meta', () => {
    cy.get('.btn-gerar').click()
    cy.get('#meta').type('FOCO')
    cy.get('#meta').should('not.have.class', 'invalido')
  })

  it('não redireciona para processar.php com meta vazia', () => {
    cy.get('#niveis').select('5')
    cy.get('.btn-gerar').click()
    cy.url().should('not.include', 'processar.php')
  })

  it('não redireciona para processar.php sem nível selecionado', () => {
    cy.get('#meta').type('VENCER')
    cy.get('.btn-gerar').click()
    cy.url().should('not.include', 'processar.php')
  })


  it('card de resultado exibe título "Resultado"', () => {
    cy.get('.resultado-card .card-title').should('contain.text', 'Resultado')
  })

  it('exibe placeholder com 5 degraus animados antes de gerar', () => {
    cy.get('#resultado .placeholder-estado').should('be.visible')
    cy.get('#resultado .placeholder-degrau').should('have.length', 5)
  })

  it('placeholder orienta o usuário a clicar em Gerar Escada', () => {
    cy.get('.placeholder-texto').should('contain.text', 'Gerar Escada')
  })

  it('card histórico exibe título "Histórico Recente"', () => {
    cy.get('.historico-card .card-title').should('contain.text', 'Histórico Recente')
  })

  it('botão "Ver tudo" está visível e aponta para historico.php', () => {
    cy.get('.btn-ver-mais')
      .should('be.visible')
      .and('have.attr', 'href')
      .and('include', 'historico.php')
  })

  it('tabela do histórico possui todos os cabeçalhos corretos', () => {
    const headers = ['#', 'Meta', 'Níveis', 'Direção', 'Data / Hora', 'Ação']
    cy.get('.historico-tabela thead th').each(($th, i) => {
      cy.wrap($th).should('contain.text', headers[i])
    })
  })

  it('exibe linha vazia com mensagem quando não há registros', () => {
    cy.get('#historico-corpo .linha-vazia')
      .should('exist')
      .and('contain.text', 'Nenhuma escada gerada ainda')
  })

  it('link da linha vazia aponta para historico.php', () => {
    cy.get('#historico-corpo .linha-vazia a')
      .should('have.attr', 'href')
      .and('include', 'historico.php')
  })

  it('header permanece visível em viewport mobile', () => {
    cy.viewport(375, 812)
    cy.get('.header').should('be.visible')
  })

  it('formulário é exibido corretamente em mobile', () => {
    cy.viewport(375, 812)
    cy.get('#formEscada').should('be.visible')
    cy.get('#meta').should('be.visible')
    cy.get('#niveis').should('be.visible')
    cy.get('.btn-gerar').should('be.visible')
  })

  it('radio cards são acessíveis em mobile', () => {
    cy.viewport(375, 812)
    cy.get('input[name="direcao"][value="decrescente"]').check({ force: true })
    cy.get('input[name="direcao"][value="decrescente"]').should('be.checked')
  })

  it('tabela do histórico possui wrapper com scroll horizontal em mobile', () => {
    cy.viewport(375, 812)
    cy.get('.tabela-wrapper').should('exist')
  })
})