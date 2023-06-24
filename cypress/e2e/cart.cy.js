describe('Winkelmandje functionaliteit', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/cart');
  });

  it('winkelmand moet een boodschap weergeven als er geen producten in zitten', () => {
    cy.get('[data-cy=noItemsInCart]').should('exist');
  });

  it('moet producten kunnen toevoegen aan de winkelmand', () => {
    cy.visit('http://localhost:3000/products/Tanita%20RD-953%20Black/4');
    cy.get('[data-cy=amountInput]').type('2');
    cy.get('[data-cy=addToCartButton]').click();
    cy.visit('http://localhost:3000/cart');
    // product title = Tanita RD-953 Black
    cy.get('[data-cy=chosenProductName]').should('contain', 'Tanita RD-953 Black');
  });
});