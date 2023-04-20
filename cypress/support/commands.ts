const login = (username = "user", password = "password") => {
  cy.visit("/login");

  cy.get('input[name="login"]').type(username);
  cy.get('input[name="password"]').type(password);

  cy.get('button[type="submit"]').click();
};

const clearCache = () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.window().its("sessionStorage").invoke("clear");
};

declare namespace Cypress {
  interface Chainable<Subject> {
    myLogin: typeof login;
    myClearCache: typeof clearCache;
  }
}

Cypress.Commands.add("myLogin", (username, password) => {
  login(username, password);
});

Cypress.Commands.add("myClearCache", () => {
  clearCache();
});
