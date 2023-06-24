describe('verify authentication of a user', () => {
  it('correct information should be shown', () => {
    cy.visit('http://localhost:3000/auth');
  });

  it('failed snackbar shown by login', () => {
    cy.visit('http://localhost:3000/login');

    // invullen van tekstvakken
    cy.get('[data-cy=testEmailLogIn]').type('test@user.be');
    cy.get('[data-cy=testPasswordLogIn]').type('test');

    // verifieren van ingevulde tekstvakken
    // cy.get('[data-cy=testEmail]').should("have.value", "test@user.be")
    // cy.get("[data-cy=testPassword]").should("have.value", "test")

    // inlog button indrukken
    cy.get('[data-cy=submit_login]').click();

    // gewenste resultaat te voorschijn -> nog niet in db
    cy.get('[data-cy=testSnack]').contains('Failed to login; email or password wrong');
  });

  it('succesful registration', () => {
    cy.visit('http://localhost:3000/register');

    // invullen van tekstvakken
    cy.get('[data-cy=testUsernameRegister]').type('testUser');
    cy.get('[data-cy=testEmailRegister]').type('test@user.be');
    cy.get('[data-cy=testPasswordRegister]').type('test');

    // verifieren van ingevulde tekstvakken
    // cy.get('[data-cy=testUsernameRegister]').should("have.value", "testUser")
    // cy.get('[data-cy=testEmail]').should("have.value", "test@user.be")
    // cy.get("[data-cy=testPassword]").should("have.value", "test")

    // inlog button indrukken
    cy.get('[data-cy=submit_register]').click();

    cy.get('[data-cy=testSnack]');
  });
});