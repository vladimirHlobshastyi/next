import { store } from '../../../store/store';
import '../../support/commands';
import { Interception } from 'cypress/types/net-stubbing';
/// <reference types="cypress" />

const INCORRECT_USERNAME: string = 'incorrectUserName';
const INCORRECT_PASSWORD: string = 'incorrectPassword';
const IS_AUTH = store.getState().auth.isAuth;

describe('login_testing', () => {
  beforeEach(() => {
    cy.myClearCache();
  });

  it('should successfully login with correct credentials', () => {
    cy.myLogin();
    cy.wait('@login').then((interception: Interception) => {
      if (interception.response) {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.response.body.token).to.not.be.empty;
        expect(interception.response.body).to.have.property('token');
      }
    });

    cy.url().should('include', '/user/history_of_orders');
  });

  it('should not navigate after logout', () => {
    cy.myLogin();

    cy.url().should('include', '/user/history_of_orders');

    // click on logout Button
    cy.get(
      '.NavbarInUserComponent_dropDownNavigateNone__pHfgS > :nth-child(5)'
    ).click();

    expect(IS_AUTH).to.be.false;

    cy.visit('/user/adress');
    cy.url().should('include', '/login');
  });

  it('should display error message with incorrect credentials', () => {
    cy.myLogin(INCORRECT_USERNAME, INCORRECT_PASSWORD);

    cy.wait('@login').then((interception: Interception) => {
      if (interception.response) {
        expect(interception.response.statusCode).to.equal(401);
      }
    });
  });
  it("should password are visible after click on 'show password'", () => {
    cy.visit('/login');

    cy.get('input[name="login"]').type(INCORRECT_USERNAME);
    cy.get('input[name="password"]').type(INCORRECT_PASSWORD);

    //click on 'show password' button
    cy.get('form > :nth-child(2) > button').click();

    cy.get('input[name="password"]').should('have.attr', 'type', 'text');
    cy.get('form > :nth-child(2) > button').click();
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
  });

  it('should not be allowed into a private component', () => {
    cy.myLogin(INCORRECT_USERNAME, INCORRECT_PASSWORD);

    cy.get('.NavBar_navBarAreaControls__hv1tc > :nth-child(2) > a').click();
    cy.url().should('include', '/login');
  });

  it('should not navigate to private component user_address_page', () => {
    cy.visit('/user/adress');
    cy.wait(1000);
    cy.url().should('include', '/login');
  });

  it('should submit form with custom input values', () => {
    cy.intercept('POST', '/api/auth', (req) => {
      req.body.username = 'user';
      req.body.password = 'password';
    }).as('login');

    cy.visit('/login');
    cy.get('input[name="login"]').type(INCORRECT_USERNAME);
    cy.get('input[name="password"]').type(INCORRECT_PASSWORD);
    cy.get('form > :nth-child(2) > button').click();
    cy.get('form').submit();

    cy.wait('@login').its('response.statusCode').should('eq', 200);
  });
});
