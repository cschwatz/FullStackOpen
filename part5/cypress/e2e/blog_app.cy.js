describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test Testingus',
      username: 'test',
      password: 'banana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.visit('http://localhost:5173')
      cy.get('#username').type('test')
      cy.get('#password').type('banana')
      cy.get('#login-button').click()
      cy.contains('Test Testingus logged in')
    })

    it('fails with wrong credentials', function() {
      cy.visit('http://localhost:5173')
      cy.get('#username').type('test')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.notification')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html')
        .should('not.contain', 'Test Testingus logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.visit('http://localhost:5173')
      cy.get('#username').type('test')
      cy.get('#password').type('banana')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new Blog').click()
      cy.get('#blog-title').type('new Cypress blog')
      cy.get('#blog-url').type('cypresstest.com/test')
      cy.get('#create-blog-button').click()
      cy.get('html')
        .should('contain', 'new Cypress blog')
      cy.get('#show-hide-button').click()
      cy.get('html')
        .should('contain', 'cypresstest.com/test')
    })
  })
})