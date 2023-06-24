describe('Register the cypressceo user', () => {
  it('Is online:', () => {
    cy.visit('http://localhost:3000');
  });
  it('register', () => {
    cy.visit('http://localhost:3000/register');
    cy.get('[data-cy=testUsernameRegister]').type('CypressCEO');
    cy.get('[data-cy=testEmailRegister]').type('cypressceo@qwict.com');
    cy.get('[data-cy=testPasswordRegister]').type('cypressceo@qwict.com');
    cy.get('[data-cy=submit_register]').click();
  });
});