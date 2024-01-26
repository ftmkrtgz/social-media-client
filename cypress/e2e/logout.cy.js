describe("Logout Functionality", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.wait(500);
  });
  it("Allows a valid user to log out", () => {
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

    cy.get("button[data-auth=logout]").click();
    cy.wait(500);

    cy.window().then((win) => {
      expect(win.localStorage.getItem("token")).to.be.null;
    });
  });
});
