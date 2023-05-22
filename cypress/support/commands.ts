const login = (username = 'user', password = 'password') => {
  cy.visit('/login');

  cy.get('input[name="login"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.intercept('POST', '/api/auth').as('login');
  cy.get('button[type="submit"]').click();
};

const clearCache = () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.window().its('sessionStorage').invoke('clear');
};

const openCategories = () => {
  const menuButton = '.NavBar_navBarMenu__BeYEF';
  const allCategoryButton = '.NavBar_sidePanelCatalog__PMB0F > :nth-child(1)';

  cy.visit('/');

  // Click on menu button
  cy.get(menuButton).click();

  // Click on all category button
  cy.get(allCategoryButton).click();
};

const getElByDataAttr = (dataAttr: string) => cy.get(`[data-cy=${dataAttr}]`);

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      myLogin(username?: string, password?: string): Chainable<Subject>;
      myClearCache(): Chainable<Subject>;
      myOpenCategories(): Chainable<Subject>;
      myGetElByDataAttr(dataAttr: string): Chainable<Subject>;
    }
  }
}

Cypress.Commands.add('myLogin', (username, password) => {
  login(username, password);
});

Cypress.Commands.add('myClearCache', () => {
  clearCache();
});

Cypress.Commands.add('myOpenCategories', () => {
  openCategories();
});

Cypress.Commands.add('myGetElByDataAttr', (dataAttr: string) => {
  getElByDataAttr(dataAttr);
});

export {};
