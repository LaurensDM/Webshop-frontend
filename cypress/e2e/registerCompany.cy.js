describe('Register a user and create a new company', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
  });
  it('Is online:', () => {
    cy.visit('http://localhost:3000');
  });
  it('register user', () => {
    cy.visit('http://localhost:3000/register');
    cy.get('[data-cy=testUsernameRegister]').click();
    cy.get('[data-cy=testUsernameRegister]').type('CyperssUser');
    cy.get('[data-cy=testEmailRegister]').click();
    cy.get('[data-cy=testEmailRegister]').type('CyperssUser@cypress.com');
    cy.get('[data-cy=testPasswordRegister]').click();
    cy.get('[data-cy=testPasswordRegister]').type('CyperssUser');
    cy.get('[data-cy=submit_register]').click();
    cy.get('[data-cy=testSnack]').contains(/Welcome CyperssUser@cypress.com|Failed to register; user already exists/g);
  });
  it('login with new user and register new real company', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('[data-cy=testEmailLogIn]').type('CyperssUser@cypress.com');
    cy.get('[data-cy=testPasswordLogIn]').type('CyperssUser');
    cy.get('[data-cy=submit_login]').click();
    cy.visit('http://localhost:3000/account');
    cy.get('[data-cy=testCreateCompanyRadio]').click();
    cy.get('[data-cy=testCompanyVATRegister]').type('BE0684579082');
    cy.get('[data-cy=testValidateCompany').click();
    cy.get('[data-cy=testSnack]').contains('Successfully added company information for BVBA MILJAAR');
  });
});