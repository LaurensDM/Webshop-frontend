describe('Register a user and create a new company', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
  });
  it('Is online:', () => {
    cy.visit('http://localhost:3000');
  });
  it('login with new user and change account settings', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('[data-cy=testEmailLogIn]').type('qwertic@qwict.com');
    cy.get('[data-cy=testPasswordLogIn]').type('qwertic@qwict.com');
    cy.get('[data-cy=submit_login').click();

    cy.get('[data-cy=testAuthButton]').click();
    cy.get('[data-cy=testChangeUsername').type('QwerticPlayz');
    cy.get('[data-cy=testChangeFirstName').type('Qwertic');
    cy.get('[data-cy=testChangeLastName').type('Playz');
    cy.get('[data-cy=testSaveUserChanges').click();
    cy.get('[data-cy=testSnack]').contains('Successfully updated user');
  });
  it('login with admin and try to change email to existing mail', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('[data-cy=testEmailLogIn]').type('qwertic@qwict.com');
    cy.get('[data-cy=testPasswordLogIn]').type('qwertic@qwict.com');
    cy.get('[data-cy=submit_login').click();

    cy.get('[data-cy=testAuthButton]').click();
    cy.get('[data-cy=testChangeEmail').type('joris@qwict.com');
    cy.get('[data-cy=testSaveUserChanges').click();
    cy.get('[data-cy=testSnack]').contains('Failed to update user');
  });
});