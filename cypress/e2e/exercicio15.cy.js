describe('Exercício 15 — Entrega 1: Interface e Validação Client-Side', () => {

    beforeEach(() => {
        cy.visit('/exercicio15/index.php');
    });
    
    context('Estrutura da página', () => {

        it('exibe o título principal com "Simulador" e "Investimento"', () => {
            cy.get('.header-title')
                .should('contain.text', 'Simulador')
                .and('contain.text', 'Investimento');
        });

        it('exibe a informação de rendimento de 8% ao mês', () => {
            cy.get('body').should('contain.text', '8%');
        });

        it('exibe o texto informando que a meta deve ser maior que o valor inicial', () => {
            cy.get('.card-hint').should('contain.text', 'meta');
        });

        it('exibe o campo de valor inicial', () => {
            cy.get('#valor_inicial').should('exist').and('be.visible');
        });

        it('exibe o campo de meta financeira', () => {
            cy.get('#meta').should('exist').and('be.visible');
        });

        it('exibe o botão de simular investimento', () => {
            cy.get('#btn-simular').should('exist').and('be.visible');
        });

        it('exibe o botão de nova simulação', () => {
            cy.get('#btn-nova').should('exist').and('be.visible');
        });

        it('exibe a seção de histórico de simulações', () => {
            cy.get('.historico-card').should('exist').and('be.visible');
        });

        it('o formulário possui action apontando para simular.php', () => {
            cy.get('#form-simulacao').should('have.attr', 'action', 'simular.php');
        });

        it('o formulário possui o atributo novalidate', () => {
            cy.get('#form-simulacao').should('have.attr', 'novalidate');
        });

        it('o formulário usa método POST', () => {
            cy.get('#form-simulacao').should('have.attr', 'method', 'POST');
        });

    });

    context('Assets carregados', () => {

        it('carrega o arquivo style.css', () => {
            cy.get('link[rel="stylesheet"][href*="style.css"]').should('exist');
        });

        it('utiliza fontes via Google Fonts', () => {
            cy.get('link[href*="fonts.googleapis.com"]').should('exist');
        });

        it('carrega o arquivo main.js', () => {
            cy.get('script[src="main.js"]').should('exist');
        });

    });

    context('Validação JS — campos obrigatórios', () => {

        it('impede o envio e exibe erro quando valor inicial está vazio', () => {
            cy.get('#meta').type('5000');
            cy.get('#btn-simular').click();
            cy.get('#erro-valor').should('not.be.empty');
            cy.url().should('include', 'index.php');
        });

        it('impede o envio e exibe erro quando a meta está vazia', () => {
            cy.get('#valor_inicial').type('1000');
            cy.get('#btn-simular').click();
            cy.get('#erro-meta').should('not.be.empty');
            cy.url().should('include', 'index.php');
        });

        it('impede o envio quando ambos os campos estão vazios', () => {
            cy.get('#btn-simular').click();
            cy.get('#erro-valor').should('not.be.empty');
            cy.get('#erro-meta').should('not.be.empty');
            cy.url().should('include', 'index.php');
        });

    });

    context('Validação JS — meta deve ser maior que o valor inicial', () => {

        it('impede o envio quando a meta é igual ao valor inicial', () => {
            cy.get('#valor_inicial').type('1000');
            cy.get('#meta').type('1000');
            cy.get('#btn-simular').click();
            cy.get('#erro-meta').should('not.be.empty');
            cy.url().should('include', 'index.php');
        });

        it('impede o envio quando a meta é menor que o valor inicial', () => {
            cy.get('#valor_inicial').type('5000');
            cy.get('#meta').type('1000');
            cy.get('#btn-simular').click();
            cy.get('#erro-meta').should('not.be.empty');
            cy.url().should('include', 'index.php');
        });

        it('exibe erro em tempo real ao digitar meta menor que o valor inicial', () => {
            cy.get('#valor_inicial').type('2000');
            cy.get('#meta').type('500');
            cy.get('#meta').trigger('input');
            cy.get('#erro-meta').should('not.be.empty');
        });

        it('não exibe erro quando a meta é maior que o valor inicial', () => {
            cy.get('#valor_inicial').type('1000');
            cy.get('#meta').type('5000');
            cy.get('#meta').trigger('input');
            cy.get('#erro-meta').should('be.empty');
        });

        it('não exibe erro no campo de valor quando preenchido corretamente', () => {
            cy.get('#valor_inicial').type('1000');
            cy.get('#valor_inicial').trigger('input');
            cy.get('#erro-valor').should('be.empty');
        });

    });

    context('Botão Nova Simulação', () => {

        it('limpa o campo de valor inicial ao clicar em Nova Simulação', () => {
            cy.get('#valor_inicial').type('1000');
            cy.get('#btn-nova').click();
            cy.get('#valor_inicial').should('have.value', '');
        });

        it('limpa o campo de meta ao clicar em Nova Simulação', () => {
            cy.get('#meta').type('5000');
            cy.get('#btn-nova').click();
            cy.get('#meta').should('have.value', '');
        });

        it('remove as mensagens de erro ao clicar em Nova Simulação', () => {
            cy.get('#btn-simular').click();
            cy.get('#btn-nova').click();
            cy.get('#erro-valor').should('be.empty');
            cy.get('#erro-meta').should('be.empty');
        });

        it('remove a classe de erro dos inputs ao clicar em Nova Simulação', () => {
            cy.get('#btn-simular').click();
            cy.get('#btn-nova').click();
            cy.get('#valor_inicial').should('not.have.class', 'input--erro');
            cy.get('#meta').should('not.have.class', 'input--erro');
        });

    });

});