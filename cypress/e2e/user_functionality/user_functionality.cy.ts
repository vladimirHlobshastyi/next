import "../../support/commands";
/// <reference types="cypress" />

describe("user_functionality", () => {
  beforeEach(() => {
    cy.myClearCache();
  });

  it("should successfully save user adress", () => {
    cy.myLogin();

    cy.url().should("include", "/user/history_of_orders");

    //go to the user/adress
    cy.get(
      ".NavbarInUserComponent_dropDownNavigateNone__pHfgS > :nth-child(2)"
    ).click();

    cy.url().should("include", "/user/adress");

    cy.get('input[name="city"]').type("CORRECT_CITY");
    cy.get('input[name="street"]').type("CORRECT_STREET");
    cy.get('input[name="houseNumber"]').type("CORRECT_HOUSE_NUMBER");

    //submit adress
    cy.get('button[type="submit"]').click();

    cy.get(".adress_success__is6sj").should(
      "have.text",
      "Данные успешно сохранены"
    );
  });
  it("should have respons blogs status", () => {
    cy.intercept("GET", "/blog/1").as("blog");
    cy.visit("/blog/1");
    cy.wait("@blog").its("response.statusCode").should("eq", 200);
  });
});
