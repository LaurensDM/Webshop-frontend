describe('Drawer', () => {
  it('should open and close when clicked', () => {
    cy.visit('http://localhost:3000');

    // cy.get('[data-cy=mobileDrawer]').should('not.be.visible');
    cy.get('[data-cy=drawerOpenButton]').click();
    cy.get('[data-cy=mobileDrawer]').should('be.visible');
    cy.get('[data-cy=drawerCloseButton]').click();
  });
});