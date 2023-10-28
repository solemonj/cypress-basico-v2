/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
      //navega até a url
      cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
      //verifica se o título está conforme esperado
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
      const text = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, '
      //identifica elementos com .get()
      //digitar em campos com type()
      //clica em algo com .click
      cy.get('#firstName').type('Solemon')
      cy.get('#lastName').type('Junior')
      cy.get('#email').type('teste@gmail.com')
      cy.get('#open-text-area').type(text, {delay: 0})
      cy.contains('button', 'Enviar').click()

      //retorna sucesso se o elemento for visivel
      cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
      const text = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, '
      //identifica elementos com .get()
      //digitar em campos com type()
      //clica em algo com .click
      cy.get('#firstName').type('Solemon')
      cy.get('#lastName').type('Junior')
      cy.get('#email').type('teste.gmail.com')
      cy.get('#open-text-area').type(text, {delay: 0})
      cy.contains('button', 'Enviar').click()

      //retorna sucesso se o elemento for visivel
      cy.get('.error').should('be.visible')
    })

    it('verifica de o campo número continua vazio após tentar inserir letras', function(){
      cy.get('#phone').type('Solemon').should('have.value','')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatorio mas não é preenchido antes do envio', function(){
      cy.get('#phone-checkbox').click()
      cy.get('#firstName').type('Solemon')
      cy.get('#lastName').type('Junior')
      cy.get('#email').type('teste@gmail.com')
      cy.get('#open-text-area').type('texto')
      cy.contains('button', 'Enviar').click()

      //retorna sucesso se o elemento for visivel
      cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos principais', function(){
      cy.get('#firstName')
        .type('Solemon')
        .should('have.value', 'Solemon')
        .clear()
        .should('have.value', '')

      cy.get('#lastName')
        .type('Junior')
        .should('have.value', 'Junior')
        .clear()
        .should('have.value', '')

      cy.get('#email')
        .type('teste@gmail.com')
        .should('have.value', 'teste@gmail.com')
        .clear()
        .should('have.value', '')

      cy.get('#phone')
        .type('123456')
        .should('have.value', '123456')
        .clear()
        .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher campos obrigatorios', function(){
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')
    })

    it('envia o formulário com sucesso usando um comando customizado', function(){
      cy.fillMandatoryFieldsAndSubmit()
      cy.get('.success').should('be.visible')
    })

  })
  