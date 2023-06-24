describe('Create a company with a real VAT number', () => {
  it('Is online:', () => {
    cy.visit('http://localhost:3000');
  });
  it('register -> account -> ', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('[data-cy=testEmailLogIn]').type('cypressceo@qwict.com');
    cy.get('[data-cy=testPasswordLogIn]').type('cypressceo@qwict.com');
    cy.get('[data-cy=submit_login]').click();
    cy.get('[data-cy=testAuthButton]').click();
    cy.get('[data-cy=testAuthButton]').click();
    cy.get('[data-cy=testCreateCompanyRadio]').click();
    cy.get('[data-cy=testCompanyVATRegister]').type('NL863726392B01');
    cy.get('[data-cy=testValidateCompany]').click();
    cy.get('[data-cy=submit_register]').click();
  });
});