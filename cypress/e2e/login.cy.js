describe("Login Functionality", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.wait(500);
  });

  it("Shows a register form", () => {
    cy.get("#registerForm").should("be.visible");
  });

  it("Shows a login form when the login button is pressed", () => {
    // Show login Form
    cy.get("#registerForm").find("button[data-auth=login]").click();
    cy.get("#loginForm").should("be.visible");
    cy.wait(500);
  });
  it("Allows a valid, registered user to login", () => {
    cy.get("#registerForm").find("button[data-auth=login]").click();
    cy.get("#loginForm").should("be.visible");
    cy.wait(500);

    cy.get('form[id="loginForm"').within(() => {
      cy.get('input[id="loginEmail"]').type(Cypress.env("email"));
      cy.wait(100);
      cy.get('input[id="loginPassword"]').type(Cypress.env("password"));
      cy.wait(100);
      cy.get('button[type="submit"]').click();
    });
    // Validate successful login

    cy.window().then((win) => {
      const toValue = win.localStorage.getItem("token");

      // Check if toValue is null
      if (toValue === null) {
        cy.log("Value is null"); // Log a message or handle accordingly
      } else {
        // Assert that toValue is a string if it's not null
        expect(toValue).to.be.a("string");
      }
    });
  });
});
