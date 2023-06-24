describe('orders test', () => {
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

  it('show orderlist', () => {
    cy.visit('http://localhost:3000/orders');
  });

  it('show orderdetails', () => {
    cy.visit('http://localhost:3000/orders/1');
  });

  it('show no orders if empty', () => {
    if (cy.get('[data-cy=ordersTable]').should('not.exist')) {
      cy.visit('http://localhost:3000/orders');
      cy.get('[data-cy=noOrders]').should('be.visible');
    }
  });
});