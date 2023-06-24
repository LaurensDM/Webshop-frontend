describe('Categories', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/category');
  });

  it('moet naar de productpagina navigeren als er op een categorie wordt geklikt', () => {
    cy.get('[data-cy=categoryListItem]').first().click();
    cy.url().should('include', '/products');
  });
});