describe('LoanDetailsForm Component', () => {
  beforeEach(() => {
    // Visit the page where the LoanDetailsForm component is rendered
    cy.visit('http://localhost:3000/success'); // Adjust URL as necessary
  });

  it('should display loan summary', () => {
    cy.get('p').contains('Name:').should('be.visible');
    cy.get('p').contains('Email:').should('be.visible');
    cy.get('p').contains('Mobile:').should('be.visible');
    cy.get('p').contains('Lender:').should('be.visible');
    cy.get('p').contains('Interest Rate:').should('be.visible');
    cy.get('p').contains('Fee:').should('be.visible');
    cy.get('p').contains('Monthly Repayment:').should('be.visible');
  });

});
