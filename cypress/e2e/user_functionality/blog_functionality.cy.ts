import { login } from "../Login_tests/login_testing.cy";

describe("blog_functionality", () => {
  beforeEach(() => login());
  it("should successfully transition and open blogs", () => {
    cy.url().should("include", "/user/history_of_orders");

    //go to the user/adress
    cy.get(
      ".NavbarInUserComponent_dropDownNavigateNone__pHfgS > :nth-child(2)"
    ).click();

    cy.url().should("include", "/user/adress");

    cy.get('input[name="city"]').type("CORRECT_CITY");
    cy.get('input[name="street"]').type("CORRECT_STREET");
    cy.get('input[name="houseNumber"]').type("CORRECT_HOUSE_NUMBER");

    cy.get('button[type="submit"]').click();

    cy.get(".adress_success__is6sj").should(
      "have.text",
      "Данные успешно сохранены"
    );
  });
});
