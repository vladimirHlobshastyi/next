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

  it("should successfully open all posts at posts category", () => {
    //intercept for data request
    cy.intercept("GET", "/api/blog/1").as("blogRequest");

    //receive data from backend
    cy.request({
      method: "GET",
      url: "/api/blog/1",
    }).then((request) => {
      const totalPages: number = request.body.totalPages;
      const totalBlogs: number = request.body.totalBlogs;

      //check is correct data
      expect(totalPages).to.be.a("number");
      expect(totalPages).to.be.at.least(1);

      let page = 1;
      const getPostForId = (id: number) =>
        cy.get(
          `[data-cy-blog-id="${id}"] > .BlogItem_blogContainer__OwE1U > .BlogItem_blogLogo__qKVm1 > img`
        );

      for (let postId = 1; postId <= totalBlogs; postId++) {
        cy.wait(1000);
        cy.visit(`/blog/${page}`);

        getPostForId(postId).click();
        cy.wait(1000);
        cy.url().should("include", `/blog/${page}/${postId}`);
        cy.go("back");

        //change post page
        if (postId % 5 === 0) {
          page++;
        }
      }
    });
  });
  it("should successfully rendering dropdown elements of search", () => {
    cy.visit("/");

    cy.get(".NavBar_navBarAreaControls__hv1tc > :nth-child(1) > div")
      .should("be.visible")
      .click();
    cy.get("input").type("тов");
    cy.get(".Search_dropdown__SV_XV").should("exist");
  });

  it("should successfully search product in search page", () => {
    //The search element it is in data
    const searchTitle = "рубашка";

    cy.visit("/");

    //click on serach button
    cy.get(".NavBar_navBarAreaControls__hv1tc > :nth-child(1) > div")
      .should("be.visible")
      .click();

    cy.get("input").type(searchTitle + "{enter}");
    cy.url().should("include", `/search/${encodeURIComponent(searchTitle)}`);
  });
});
