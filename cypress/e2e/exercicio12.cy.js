describe('Exercício 12 - Escada da Motivação (processar.php)', () => {
  // ── Helpers inline (mesmo padrão do arquivo base) ──────────
  const submeter = (meta, niveis, direcao = 'crescente') => {
    cy.visit('/exercicio12/index.php')
    cy.get('#meta').type(meta)
    cy.get('#niveis').select(niveis)
    cy.get(`input[name="direcao"][value="${direcao}"]`).check({ force: true })
    cy.get('#formEscada').submit()
  }

  // ==========================================================
  // NAVEGAÇÃO E ESTRUTURA
  // ==========================================================

  it('redireciona para processar.php após submissão válida', () => {
    submeter('VENCER', '5')
    cy.url().should('include', 'processar.php')
  })

  it('processar.php exibe o header com logo', () => {
    submeter('VENCER', '5')
    cy.get('.header').should('be.visible')
    cy.get('.logo-text').should('contain.text', 'Escada da Motivação')
  })

  it('processar.php exibe os dois links de navegação', () => {
    submeter('VENCER', '5')
    cy.get('.header-nav .nav-link').should('have.length', 2)
  })

  it('link Gerar no processar.php aponta para index.php', () => {
    submeter('VENCER', '5')
    cy.get('.header-nav').contains('Gerar')
      .should('have.attr', 'href')
      .and('include', 'index.php')
  })

  it('link Histórico no processar.php aponta para historico.php', () => {
    submeter('VENCER', '5')
    cy.get('.header-nav').contains('Histórico')
      .should('have.attr', 'href')
      .and('include', 'historico.php')
  })

  it('processar.php exibe o footer', () => {
    submeter('VENCER', '5')
    cy.get('.footer').should('be.visible')
  })

  // ==========================================================
  // CARD DE CONFIRMAÇÃO
  // ==========================================================

  it('exibe card de confirmação após submissão válida', () => {
    submeter('FOCO', '4')
    cy.get('#secao-confirmacao').should('be.visible')
  })

  it('card de confirmação exibe a meta em maiúsculas', () => {
    submeter('foco', '4')
    cy.get('#secao-confirmacao').should('contain.text', 'FOCO')
  })

  it('card de confirmação exibe o número de níveis escolhido', () => {
    submeter('META', '6')
    cy.get('#secao-confirmacao').should('contain.text', '6')
  })

  it('card de confirmação exibe a direção crescente', () => {
    submeter('META', '5', 'crescente')
    cy.get('#secao-confirmacao').should('contain.text', 'Crescente')
  })

  it('card de confirmação exibe a direção decrescente', () => {
    submeter('META', '5', 'decrescente')
    cy.get('#secao-confirmacao').should('contain.text', 'Decrescente')
  })

  it('card de confirmação exibe o badge de modo Mock', () => {
    submeter('TESTE', '3')
    cy.get('.badge-mock').should('be.visible')
  })

  // ==========================================================
  // SEÇÃO DA ESCADA — ESTRUTURA
  // ==========================================================

  it('exibe a seção da escada após submissão válida', () => {
    submeter('VENCER', '5')
    cy.get('#secao-escada').should('be.visible')
  })

  it('título da seção da escada é "Sua Escada"', () => {
    submeter('VENCER', '5')
    cy.get('#secao-escada .card-title').should('contain.text', 'Sua Escada')
  })

  it('tabela da escada é renderizada', () => {
    submeter('VENCER', '5')
    cy.get('.escada-tabela').should('be.visible')
  })

  it('gera exatamente 3 linhas para 3 níveis', () => {
    submeter('OK', '3')
    cy.get('.escada-linha').should('have.length', 3)
  })

  it('gera exatamente 4 linhas para 4 níveis', () => {
    submeter('OK', '4')
    cy.get('.escada-linha').should('have.length', 4)
  })

  it('gera exatamente 5 linhas para 5 níveis', () => {
    submeter('OK', '5')
    cy.get('.escada-linha').should('have.length', 5)
  })

  it('gera exatamente 6 linhas para 6 níveis', () => {
    submeter('OK', '6')
    cy.get('.escada-linha').should('have.length', 6)
  })

  it('gera exatamente 7 linhas para 7 níveis', () => {
    submeter('OK', '7')
    cy.get('.escada-linha').should('have.length', 7)
  })

  it('exibe números de nível de 1 a N em cada linha', () => {
    submeter('TOP', '4')
    cy.get('.nivel-numero').each(($td, i) => {
      cy.wrap($td).should('contain.text', String(i + 1))
    })
  })

  it('todos os chips exibem a meta digitada', () => {
    submeter('SONHAR', '3')
    cy.get('.palavra-chip').each($chip => {
      cy.wrap($chip).should('contain.text', 'SONHAR')
    })
  })

  it('meta digitada em minúsculas aparece em maiúsculas nos chips', () => {
    submeter('ganhar', '3')
    cy.get('.palavra-chip').first().should('contain.text', 'GANHAR')
  })

  it('meta com 15 caracteres é exibida corretamente nos chips', () => {
    submeter('ABCDEFGHIJKLMNO', '3')
    cy.get('.palavra-chip').first().should('contain.text', 'ABCDEFGHIJKLMNO')
  })

  // ==========================================================
  // LÓGICA CRESCENTE
  // ==========================================================

  it('crescente: linha 1 tem exatamente 1 chip', () => {
    submeter('WIN', '5', 'crescente')
    cy.get('.escada-linha').eq(0).find('.palavra-chip').should('have.length', 1)
  })

  it('crescente: linha 2 tem exatamente 2 chips', () => {
    submeter('WIN', '5', 'crescente')
    cy.get('.escada-linha').eq(1).find('.palavra-chip').should('have.length', 2)
  })

  it('crescente: linha 3 tem exatamente 3 chips', () => {
    submeter('WIN', '5', 'crescente')
    cy.get('.escada-linha').eq(2).find('.palavra-chip').should('have.length', 3)
  })

  it('crescente: última linha tem N chips igual ao total de níveis', () => {
    submeter('WIN', '5', 'crescente')
    cy.get('.escada-linha').last().find('.palavra-chip').should('have.length', 5)
  })

  it('crescente: todas as linhas têm chips progressivamente maiores', () => {
    submeter('IR', '5', 'crescente')
    cy.get('.escada-linha').each(($row, i) => {
      cy.wrap($row).find('.palavra-chip').should('have.length', i + 1)
    })
  })

  it('crescente: contador da linha 1 exibe "1x"', () => {
    submeter('WIN', '5', 'crescente')
    cy.get('.nivel-contagem').eq(0).should('contain.text', '1x')
  })

  it('crescente: contador da última linha exibe "5x" para 5 níveis', () => {
    submeter('WIN', '5', 'crescente')
    cy.get('.nivel-contagem').last().should('contain.text', '5x')
  })

  it('crescente com 3 níveis: linha 3 tem 3 chips', () => {
    submeter('GO', '3', 'crescente')
    cy.get('.escada-linha').eq(2).find('.palavra-chip').should('have.length', 3)
  })

  it('crescente com 7 níveis: linha 7 tem 7 chips', () => {
    submeter('GO', '7', 'crescente')
    cy.get('.escada-linha').eq(6).find('.palavra-chip').should('have.length', 7)
  })

  // ==========================================================
  // LÓGICA DECRESCENTE
  // ==========================================================

  it('decrescente: linha 1 tem N chips igual ao total de níveis', () => {
    submeter('WIN', '5', 'decrescente')
    cy.get('.escada-linha').eq(0).find('.palavra-chip').should('have.length', 5)
  })

  it('decrescente: linha 2 tem N-1 chips', () => {
    submeter('WIN', '5', 'decrescente')
    cy.get('.escada-linha').eq(1).find('.palavra-chip').should('have.length', 4)
  })

  it('decrescente: linha 3 tem N-2 chips', () => {
    submeter('WIN', '5', 'decrescente')
    cy.get('.escada-linha').eq(2).find('.palavra-chip').should('have.length', 3)
  })

  it('decrescente: última linha tem exatamente 1 chip', () => {
    submeter('WIN', '5', 'decrescente')
    cy.get('.escada-linha').last().find('.palavra-chip').should('have.length', 1)
  })

  it('decrescente: todas as linhas têm chips progressivamente menores', () => {
    const total = 5
    submeter('IR', '5', 'decrescente')
    cy.get('.escada-linha').each(($row, i) => {
      cy.wrap($row).find('.palavra-chip').should('have.length', total - i)
    })
  })

  it('decrescente: contador da linha 1 exibe "5x" para 5 níveis', () => {
    submeter('WIN', '5', 'decrescente')
    cy.get('.nivel-contagem').eq(0).should('contain.text', '5x')
  })

  it('decrescente: contador da última linha exibe "1x"', () => {
    submeter('WIN', '5', 'decrescente')
    cy.get('.nivel-contagem').last().should('contain.text', '1x')
  })

  it('decrescente com 3 níveis: linha 1 tem 3 chips', () => {
    submeter('GO', '3', 'decrescente')
    cy.get('.escada-linha').eq(0).find('.palavra-chip').should('have.length', 3)
  })

  it('decrescente com 7 níveis: linha 1 tem 7 chips', () => {
    submeter('GO', '7', 'decrescente')
    cy.get('.escada-linha').eq(0).find('.palavra-chip').should('have.length', 7)
  })

  it('decrescente com 7 níveis: linha 7 tem 1 chip', () => {
    submeter('GO', '7', 'decrescente')
    cy.get('.escada-linha').eq(6).find('.palavra-chip').should('have.length', 1)
  })

  // ==========================================================
  // VALIDAÇÕES — TELA DE ERRO
  // ==========================================================

  it('exibe card de erros ao enviar meta vazia via POST direto', () => {
    cy.visit('/exercicio12/processar.php', {
      method: 'POST',
      body: { meta: '', niveis: '5', direcao: 'crescente' },
    })
    cy.get('#secao-erros').should('be.visible')
  })

  it('mensagem de erro cita o campo meta quando vazio', () => {
    cy.visit('/exercicio12/processar.php', {
      method: 'POST',
      body: { meta: '', niveis: '5', direcao: 'crescente' },
    })
    cy.get('.lista-erros').should('contain.text', 'meta')
  })

  it('exibe erro ao enviar meta com mais de 15 caracteres via POST direto', () => {
    cy.visit('/exercicio12/processar.php', {
      method: 'POST',
      body: { meta: 'ABCDEFGHIJKLMNOP', niveis: '5', direcao: 'crescente' },
    })
    cy.get('#secao-erros').should('be.visible')
  })

  it('exibe erro ao enviar nível 2 (abaixo do mínimo) via POST direto', () => {
    cy.visit('/exercicio12/processar.php', {
      method: 'POST',
      body: { meta: 'FOCO', niveis: '2', direcao: 'crescente' },
    })
    cy.get('#secao-erros').should('be.visible')
  })

  it('exibe erro ao enviar nível 8 (acima do máximo) via POST direto', () => {
    cy.visit('/exercicio12/processar.php', {
      method: 'POST',
      body: { meta: 'FOCO', niveis: '8', direcao: 'crescente' },
    })
    cy.get('#secao-erros').should('be.visible')
  })

  it('exibe erro ao enviar direção inválida via POST direto', () => {
    cy.visit('/exercicio12/processar.php', {
      method: 'POST',
      body: { meta: 'FOCO', niveis: '5', direcao: 'lateral' },
    })
    cy.get('#secao-erros').should('be.visible')
  })

  it('tela de erro exibe link para voltar ao formulário', () => {
    cy.visit('/exercicio12/processar.php', {
      method: 'POST',
      body: { meta: '', niveis: '5', direcao: 'crescente' },
    })
    cy.get('.btn-voltar-link')
      .should('be.visible')
      .and('have.attr', 'href')
      .and('include', 'index.php')
  })

  it('tela de erro não exibe a seção da escada', () => {
    cy.visit('/exercicio12/processar.php', {
      method: 'POST',
      body: { meta: '', niveis: '5', direcao: 'crescente' },
    })
    cy.get('#secao-escada').should('not.exist')
  })

  it('tela de erro não exibe o card de confirmação', () => {
    cy.visit('/exercicio12/processar.php', {
      method: 'POST',
      body: { meta: '', niveis: '5', direcao: 'crescente' },
    })
    cy.get('#secao-confirmacao').should('not.exist')
  })

  // ==========================================================
  // BOTÕES DE AÇÃO PÓS-ESCADA
  // ==========================================================

  it('botão "Nova Escada" está visível após gerar', () => {
    submeter('GANHAR', '5')
    cy.get('.btn-secundario').should('be.visible').and('contain.text', 'Nova Escada')
  })

  it('botão "Ver Histórico" está visível após gerar', () => {
    submeter('GANHAR', '5')
    cy.get('.btn-primario').should('be.visible').and('contain.text', 'Ver Histórico')
  })

  it('botão "Nova Escada" redireciona para index.php ao clicar', () => {
    submeter('GANHAR', '5')
    cy.get('.btn-secundario').click()
    cy.url().should('include', 'index.php')
  })

  it('botão "Ver Histórico" redireciona para historico.php ao clicar', () => {
    submeter('GANHAR', '5')
    cy.get('.btn-primario').click()
    cy.url().should('include', 'historico.php')
  })

  // ==========================================================
  // HISTÓRICO MOCK
  // ==========================================================

  it('seção de histórico recente é visível após gerar', () => {
    submeter('LUTAR', '4')
    cy.get('#secao-historico').should('be.visible')
  })

  it('tabela de histórico exibe cabeçalho "#"', () => {
    submeter('LUTAR', '4')
    cy.get('#tabela-historico thead').should('contain.text', '#')
  })

  it('tabela de histórico exibe cabeçalho "Meta"', () => {
    submeter('LUTAR', '4')
    cy.get('#tabela-historico thead').should('contain.text', 'Meta')
  })

  it('tabela de histórico exibe cabeçalho "Níveis"', () => {
    submeter('LUTAR', '4')
    cy.get('#tabela-historico thead').should('contain.text', 'Níveis')
  })

  it('tabela de histórico exibe cabeçalho "Direção"', () => {
    submeter('LUTAR', '4')
    cy.get('#tabela-historico thead').should('contain.text', 'Direção')
  })

  it('tabela de histórico exibe cabeçalho "Data / Hora"', () => {
    submeter('LUTAR', '4')
    cy.get('#tabela-historico thead').should('contain.text', 'Data / Hora')
  })

  it('novo registro aparece em destaque com classe linha-nova', () => {
    submeter('LUTAR', '4')
    cy.get('#linha-novo-registro').should('be.visible')
  })

  it('linha em destaque contém a meta recém-gerada', () => {
    submeter('LUTAR', '4')
    cy.get('#linha-novo-registro').should('contain.text', 'LUTAR')
  })

  it('histórico mock exibe pelo menos 5 registros no total', () => {
    submeter('FOCO', '3')
    cy.get('#tabela-historico tbody tr').should('have.length.gte', 5)
  })

  it('botão "Ver tudo" do histórico aponta para historico.php', () => {
    submeter('FOCO', '3')
    cy.get('#secao-historico .btn-ver-mais')
      .should('have.attr', 'href')
      .and('include', 'historico.php')
  })

  // ==========================================================
  // RESPONSIVIDADE MOBILE
  // ==========================================================

  it('processar.php exibe a escada corretamente em mobile (390px)', () => {
    cy.viewport(390, 844)
    submeter('MOBILE', '4')
    cy.get('#secao-escada').should('be.visible')
  })

  it('chips da escada são visíveis em mobile', () => {
    cy.viewport(390, 844)
    submeter('GO', '3')
    cy.get('.palavra-chip').should('be.visible')
  })

  it('tabela de histórico tem wrapper com scroll em mobile', () => {
    cy.viewport(390, 844)
    submeter('FOCO', '4')
    cy.get('.tabela-wrapper').should('be.visible')
  })

  it('botões de ação são visíveis em mobile', () => {
    cy.viewport(390, 844)
    submeter('FOCO', '4')
    cy.get('.escada-acoes').should('be.visible')
    cy.get('.btn-acao').should('have.length', 2)
  })

  it('card de confirmação é visível em mobile', () => {
    cy.viewport(390, 844)
    submeter('FOCO', '4')
    cy.get('#secao-confirmacao').should('be.visible')
  })

  it('header permanece visível ao rolar processar.php em mobile', () => {
    cy.viewport(390, 844)
    submeter('FOCO', '5')
    cy.scrollTo('bottom')
    cy.get('.header').should('be.visible')
  })
})