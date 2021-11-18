/// <reference types="cypress" />

const baseUrl = Cypress.env('urlBase');
const registerLoginPage = Cypress.env('urlBase')+'/qa-portal/registerlogin/registerlogin.php';

const successfully = 'Successfully'
const error_message_not_valid_password = "The password you entered was not valid."
const error_message_username = "Please enter username."
const error_message_password = "Please enter your password."

describe ('Login Pecode Tests', function(){

  beforeEach('Login Page', () => {
    cy.visit(registerLoginPage)
    cy.fixture('users').then(function (user) {
      this.user = user;
    })
  });

  it('Successful login', function() {
    // cy.request('POST', baseUrl+'/users', { this.user = user })
    cy.get('input[name=username]').type(this.user.name)
    cy.get('input[name=password]').type(this.user.password)
    cy.get('.btn').click()
    //cy.get('.help-block').should('have.text', successfully)
    //cy.get('#username').should('have.text', this.user.name);
 })

  it('Show error message for Incorrect password', function(){
    // cy.request('DELETE', baseUrl+'/users', { this.user = user })
    cy.get('input[name=username]').type(this.user.name)
    cy.get('input[name=password]').type(this.user.password)
    cy.get('.btn').click()
    cy.url().should('contain', registerLoginPage)
    cy.get('.help-block').should('have.text', error_message_not_valid_password )
    cy.wait(5000)
  })

  it('Show error message for Incorrect login', function(){
    // cy.request('DELETE', baseUrl+'/users', { this.user = user })
    cy.get('input[name=password]').type(this.user.password)
    cy.get('.btn').click()
    cy.url().should('contain', registerLoginPage)
    cy.get('.help-block').should('have.text', error_message_username)
  })

  it('The button Login is not disabled', function(){
    cy.get('.btn').should('not.have.attr', 'disabled', 'disabled');
    cy.get('input[name=username]').type(this.user.name)
    cy.get('.btn').should('not.have.attr', 'disabled', 'disabled');
  })

  it('Not existing user', function(){
    // cy.request('DELETE', baseUrl+'/users', { this.user = user })
    cy.get('input[name=username]').type(this.user.name)
    cy.get('input[name=password]').type(this.user.password)
    cy.get('.btn').click()
  })

  it('Empty fields login page', function () {
    cy.get('.btn').click()    
    cy.get('.help-block').eq(0).should('have.text', error_message_username)
    cy.get('.help-block').eq(1).should('have.text', error_message_password)
    cy.url().should('contain', registerLoginPage)
   
})



})