describe('LoanDetailsForm Component', () => {
  beforeEach(() => {
    // Visit the page where the LoanDetailsForm component is rendered
    cy.visit('http://localhost:3000/loan-details'); // Adjust URL as necessary
  });

  it('should display the form with all fields', () => {
    cy.get('form').should('be.visible');
    cy.get('input[name="vehiclePrice"]').should('be.visible');
    cy.get('input[name="deposit"]').should('be.visible');
    cy.get('select[name="loanPurpose"]').should('be.visible');
    cy.get('input[name="loanTerm"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should submit the form with valid data', () => {
    cy.get('input[name="vehiclePrice"]').type('300000');
    cy.get('input[name="deposit"]').type('5000');
    cy.get('select[name="loanPurpose"]').select('Vehicle'); // Adjust based on actual options
    cy.get('input[name="loanTerm"]').type('5');

    cy.get('button[type="submit"]').click();

    // Verify navigation or state update
    cy.url().should('include', '/summary'); // Adjust based on actual navigation
  });

  it('should show validation errors for invalid data', () => {
    cy.get('input[name="vehiclePrice"]').type('1000');
    cy.get('input[name="deposit"]').type('2000');
    cy.get('input[name="loanTerm"]').type('8');
    cy.get('button[type="submit"]').click();

    // Adjust based on actual validation messages
    cy.contains('Vehicle price must be at least greater than $2000').should('be.visible');
    cy.contains('Deposit should not exceed vehicle price or 2000 less than vehicle price').should('be.visible');
    cy.contains('Loan term must be at most 7 years').should('be.visible');
  });

  it('should navigate back when Back button is clicked', () => {
    cy.get('button').contains('Back').click();
    // Verify navigation or state update
    cy.url().should('not.include', '/loan-details'); // Adjust based on actual navigation
  });
});
