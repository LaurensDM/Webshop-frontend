describe('home test', () => {
  it('Is online:', () => {
    cy.visit('http://localhost:3000/home');
  });

  it('show messages', () => {
    cy.visit('http://localhost:3000/home');
    cy.get('[data-cy=messagesHeader]').should('contain', 'Welcome to delaware shipping!');
  });

  it('werkt de translate functie', () => {
    cy.visit('http://localhost:3000/home');
    cy.get('[data-cy=languageButton]').click();
    cy.get('[data-cy=languageDropdown]').click();
    cy.get('[data-cy=translateHeader]').should('contain', 'Intéressé?');
  });
});