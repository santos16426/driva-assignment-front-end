describe("PersonalDetailsForm Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should display the form with all fields", () => {
    cy.get("form").should("be.visible");
    cy.get('input[name="firstName"]').should("be.visible");
    cy.get('input[name="lastName"]').should("be.visible");
    cy.get('input[name="dob"]').should("be.visible");
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="mobile"]').should("be.visible");
    cy.get('input[name="address"]').should("be.visible");
    cy.get('select[name="employmentStatus"]').should("be.visible");
    cy.get('input[name="annualIncome"]').should("be.visible");
    cy.get('button[type="submit"]').should("be.visible");
  });

  it("should display employer name field when employment status is employed", () => {
    cy.get('select[name="employmentStatus"]').select("Employed");
    cy.get('input[name="employerName"]').should("be.visible");
  });

  it("should not display employer name field when employment status is not employed", () => {
    cy.get('select[name="employmentStatus"]').select("Unemployed");
    cy.get('input[name="employerName"]').should("not.exist");
  });

  it("should submit the form with valid data", () => {
    cy.get('input[name="firstName"]').type("John");
    cy.get('input[name="lastName"]').type("Doe");
    cy.get('input[name="dob"]').type("1990-01-01");
    cy.get('input[name="email"]').type("john.doe@example.com");
    cy.get('input[name="mobile"]').type("1234567890");
    cy.get('input[name="address"]').type("123 Main St");
    cy.get('select[name="employmentStatus"]').select("Employed");
    cy.get('input[name="employerName"]').type("Example Inc.");
    cy.get('input[name="annualIncome"]').type("50000");

    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/loan-details");
  });

  it("should show validation errors for invalid data", () => {
    cy.get('input[name="firstName"]').type("1");
    cy.get('button[type="submit"]').click();
    cy.contains("Must be 2 or more characters long").should("be.visible");
  });
});
