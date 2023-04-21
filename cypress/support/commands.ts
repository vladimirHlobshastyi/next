const login = (username = "user", password = "password") => {
  cy.visit("/login");

  cy.get('input[name="login"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.intercept("POST", "/api/auth").as("login");
  cy.get('button[type="submit"]').click();
};

const clearCache = () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.window().its("sessionStorage").invoke("clear");
};

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      myLogin(username?: string, password?: string): Chainable<Subject>;
      myClearCache(): Chainable<Subject>;
    }
  }
}

Cypress.Commands.add("myLogin", (username, password) => {
  login(username, password);
});

Cypress.Commands.add("myClearCache", () => {
  clearCache();
});

export {};
