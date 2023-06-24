describe('products test', () => {
  it('Is online:', () => {
    cy.visit('http://localhost:3000/');
  });

  it('show productlist', () => {
    cy.visit('http://localhost:3000/products');
    cy.get('[data-cy=individualProduct]').should('be.visible');
  });

  it('show product details', () => {
    cy.visit('http://localhost:3000/products/Tanita%20RD-953%20Black/4');
    cy.get('[data-cy=productTitle]').should('be.visible');
  });
});