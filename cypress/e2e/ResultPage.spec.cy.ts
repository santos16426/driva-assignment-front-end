describe('ResultPage Component', () => {
  beforeEach(() => {

    cy.intercept('GET', '/offers', {
      statusCode: 200,
      body: [
        { id: 1, name: 'Lender A', interestRate: 5.5, fee: '$10 processing fee' },
        { id: 2, name: 'Lender B', interestRate: 5.0, fee: '$15 application fee' },
        { id: 3, name: 'Lender C', interestRate: 6.0, fee: 'No fees' }
      ]
    }).as('fetchLendersData');
    cy.visit('http://localhost:3000/summary');
    cy.wait('@fetchLendersData').then(() => {
      cy.get('.lender-card').should('have.length', 3);
    });
    cy.get('p').contains('Loan Purpose:').should('be.visible');
    cy.get('p').contains('Loan Term:').should('be.visible');
    cy.get('div').contains('List of Lenders').should('be.visible');
    cy.get('.lender-card').should('have.length', 3);
  });

  it('should select a lender and enable the Submit button', () => {
    cy.get('.lender-card').first().click();
    cy.get('button').contains('Submit').should('not.be.disabled');
  });

  it('should submit the loan with selected lender', () => {
    cy.get('.lender-card').first().click();
    cy.intercept('POST', '/submit/1', {
      statusCode: 200,
      body: { success: true, message: 'Loan submitted successfully' }
    }).as('submitLoan');
    cy.get('button').contains('Submit').click();
    cy.wait('@submitLoan').then(() => {
      cy.url().should('include', '/success');
    });
  });

  it('should navigate back when Back button is clicked', () => {
    cy.get('button').contains('Back').click();
    cy.url().should('not.include', '/result');
  });
});



