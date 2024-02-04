describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test Testingus',
      username: 'test',
      password: 'banana'
    }
    const user2 = {
      name: 'Test Testingus2',
      username: 'test2',
      password: 'banana2'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  // describe('Login',function() {
  //   it('succeeds with correct credentials', function() {
  //     cy.visit('http://localhost:5173')
  //     cy.get('#username').type('test')
  //     cy.get('#password').type('banana')
  //     cy.get('#login-button').click()
  //     cy.contains('Test Testingus logged in')
  //   })

  //   it('fails with wrong credentials', function() {
  //     cy.visit('http://localhost:5173')
  //     cy.get('#username').type('test')
  //     cy.get('#password').type('wrong')
  //     cy.get('#login-button').click()
  //     cy.get('.notification')
  //       .should('contain', 'wrong username or password')
  //       .and('have.css', 'color', 'rgb(255, 0, 0)')
  //       .and('have.css', 'border-style', 'solid')
  //     cy.get('html')
  //       .should('not.contain', 'Test Testingus logged in')
  //   })
  // })

  // describe('When logged in', function() {
  //   beforeEach(function() {
  //     cy.visit('http://localhost:5173')
  //     cy.get('#username').type('test')
  //     cy.get('#password').type('banana')
  //     cy.get('#login-button').click()
  //   })

  //   it('A blog can be created', function() {
  //     cy.contains('new Blog').click()
  //     cy.get('#blog-title').type('new Cypress blog')
  //     cy.get('#blog-url').type('cypresstest.com/test')
  //     cy.get('#create-blog-button').click()
  //     cy.get('html')
  //       .should('contain', 'new Cypress blog')
  //     cy.get('#show-hide-button').click()
  //     cy.get('html')
  //       .should('contain', 'cypresstest.com/test')
  //   })

  //   it('A blog can be liked', function() {
  //     cy.contains('new Blog').click()
  //     cy.get('#blog-title').type('new Cypress blog')
  //     cy.get('#blog-url').type('cypresstest.com/test')
  //     cy.get('#create-blog-button').click()
  //     cy.get('#show-hide-button').click()
  //     cy.get('#likes-div')
  //       .contains('Likes 0')
  //     cy.get('#like-button').click()
  //     cy.get('#likes-div')
  //       .should('contain', 'Likes 1')
  //   })

  //   it('A blog can be deleted by the user that created it', function() {
  //     cy.contains('new Blog').click()
  //     cy.get('#blog-title').type('new Cypress blog')
  //     cy.get('#blog-url').type('cypresstest.com/test')
  //     cy.get('#create-blog-button').click()
  //     cy.get('#show-hide-button').click()
  //     cy.get('#remove-blog-button').click()
  //     cy.get('html')
  //       .should('not.contain', 'new Cypress blog')
  //   })
  // })

  describe('Another user logs in', function() {
    it('A blog cannot be deleted by an user that has not created the blog', function() {
      // User 1 logs in
      cy.visit('http://localhost:5173')
      cy.get('#username').type('test')
      cy.get('#password').type('banana')
      cy.get('#login-button').click()
      // User 1 creates a blog
      cy.contains('new Blog').click()
      cy.get('#blog-title').type('new Cypress blog')
      cy.get('#blog-url').type('cypresstest.com/test')
      cy.get('#create-blog-button').click()
      // User 1 logs out
      cy.get('#logout-button').click()
      // User 2 logs in
      cy.get('#username').type('test2')
      cy.get('#password').type('banana2')
      cy.get('#login-button').click()
      // User 2 checks the already created blog
      cy.get('#show-hide-button').click()
      // User 2 checks if it can remove blog created by User 1
      cy.get('html')
        .should('not.contain', '#remove-blog-button')

    })
  })
})