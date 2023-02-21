describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/');
  });
  it('should go to site', () => { });
  it('should be able to search', () => {
    cy.get('#searchText').type('dogs');
  });
  it('search button should work', () => {
    cy.get('#searchButton').click();
  });
  it('should count 10 images', () => {
    cy.get('#searchText').type('dogs');
    cy.get('#searchButton').click();
    cy.get('#app').find('img').should('have.length', 10);
  });
});

export default {};
