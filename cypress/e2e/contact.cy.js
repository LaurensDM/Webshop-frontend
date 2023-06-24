describe('Contact pagina', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/assistance');
  });

  it('Is online en geeft zich weer', () => {
    cy.visit('http://localhost:3000/assistance');
    cy.get('[data-cy=conctactHeader]').should('be.visible');
  });

  it('button naar contactformulier werkt', () => {
    cy.get('[data-cy=contactFormButton]').click();
    cy.url().should('include', '/assistance/formNotCustomer');
  });

  it('vul formulier in en verstuurt het', () => {
    cy.visit('http://localhost:3000/assistance/formNotCustomer');
    cy.get('[data-cy=firstName]').type('firstNameExample');
    cy.get('[data-cy=lastName]').type('lastNameExample');
    cy.get('[data-cy=email]').type('email@Example.com');
    cy.get('[data-cy=number]').type('123456789');
    cy.get('[data-cy=message]').type('messageExample');
    cy.get('[data-cy=submitFormButton]').click();
  });
});