describe('Notificatiepagina', () => {
  it('register', () => {
    cy.visit('http://localhost:3000/register');
    cy.get('[data-cy=testUsernameRegister]').type('CypressCEO');
    cy.get('[data-cy=testEmailRegister]').type('cypessceo@qwict.com');
    cy.get('[data-cy=testPasswordRegister]').type('cypressceo@qwict.com');
    cy.get('[data-cy=submit_register]').click();
    cy.get('[data-cy=notificationsButton]').click();
    cy.get('[data-cy=page-title]').should('contain', 'Notificaties');
  });

  it('toont de juiste titel', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy=notificationsButton]').click();
    cy.get('[data-cy=page-title]').should('contain', 'Notificaties');
  });

  it('toont de lijst van notificaties', () => {
    cy.visit('http://localhost:3000/notifications');
    cy.get('[data-cy=notification-list]').should('exist');
  });

  it('geeft een boodschap als er geen notificaties zijn', () => {
    cy.visit('http://localhost:3000/notifications');
  });
});