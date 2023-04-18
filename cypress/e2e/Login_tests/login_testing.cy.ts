import { store } from "../../../store/store";

type ApiResponse = {
  status: number;
};
const INCORRECT_USERNAME: string = "incorrectUserName";
const INCORRECT_PASSWORD: string = "incorrectPassword";
const CORRECT_USERNAME: "user" = "user";
const CORRECT_PASSWORD: "password" = "password";

export const login = (
  login: string = CORRECT_USERNAME,
  password: string = CORRECT_PASSWORD
) => {
  cy.visit("/login");

  cy.get('input[name="login"]').type(login);
  cy.get('input[name="password"]').type(password);

  cy.get('button[type="submit"]').click();
};

describe("login_testing", () => {
  it("should successfully login with correct credentials", () => {
    login();

    cy.url().should("include", "/user/history_of_orders");
  });

  it("should not navigate after logout", () => {
    login();

    cy.url().should("include", "/user/history_of_orders");
    cy.get(
      ".NavbarInUserComponent_dropDownNavigateNone__pHfgS > :nth-child(5)"
    ).click();
    cy.visit("/user/adress");
    cy.url().should("include", "/login");
  });

  it("should display error message with incorrect credentials", () => {
    login(INCORRECT_USERNAME, INCORRECT_PASSWORD);

    cy.request({
      method: "POST",
      url: "/api/auth",
      failOnStatusCode: false,
      body: {
        username: INCORRECT_USERNAME,
        password: INCORRECT_PASSWORD,
      },
    }).then((response: Cypress.Response<ApiResponse>) => {
      expect(response.status).to.equal(401);
    });
  });
  it("should password are visible after click on 'show password'", () => {
    cy.visit("/login");

    cy.get('input[name="login"]').type(INCORRECT_USERNAME);
    cy.get('input[name="password"]').type(INCORRECT_PASSWORD);
    cy.get("form > :nth-child(2) > button").click();

    cy.get('input[name="password"]').should("have.attr", "type", "text");
    cy.get("form > :nth-child(2) > button").click();
    cy.get('input[name="password"]').should("have.attr", "type", "password");
  });

  it("should not be allowed into a private component", () => {
    login(INCORRECT_USERNAME, INCORRECT_PASSWORD);

    cy.get(".NavBar_navBarAreaControls__hv1tc > :nth-child(2) > a").click();
    cy.url().should("include", "/login");
  });

  it("should not navigate to private component user_address_page", () => {
    const isAuth = store.getState().auth.isAuth;
    if (!isAuth) {
      cy.visit("/user/adress");
      cy.url().should("include", "/login");
    }
  });
});
