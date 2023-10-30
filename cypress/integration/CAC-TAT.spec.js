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
      cy.get('#phone-checkbox').check()
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

    it('seleciona um produto (YouTube) pelo seu texto', function(){
      cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
    })

    it('seleciona um produto (mentoria) pelo seu valor', function(){
      cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
    })

    it('seleciona um produto (blog) pelo seu indice', function(){
      cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
    })

    it('marca o tio de atendimento "Feedback"', function(){
      cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function(){
      cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio){
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
    })

    it('marca ambos checkboxes, depois desmarca o ultimo', function(){
      cy.get('input[type="checkbox"]')
      .check().should('be.checked')
      .last().uncheck().should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixture', function(){
      cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function($input){
        // console.log($input)
        expect($input[0].files[0].name).to.equal('example.json')
      })
    })

    it('seleciona um arquivo simulando drang-and-drop (arrastando)', function(){
      cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(function($input){
        // console.log($input)
        expect($input[0].files[0].name).to.equal('example.json')
      })
    })

    it('seleciona um arquivo utilizando um fixture para a qual foi dada um alias', function(){
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(function($input){
        // console.log($input)
        expect($input[0].files[0].name).to.equal('example.json')
      })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
      cy.get('#privacy a')
      .should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
      cy.get('#privacy a')
      .should('have.attr', 'target', '_blank')
      .invoke('removeAttr', 'target')
      .click()

      cy.contains('Talking About Testing').should('be.visible')
    })

  })
  