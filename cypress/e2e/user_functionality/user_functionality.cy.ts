import "../../support/commands";
/// <reference types="cypress" />

describe("user_functionality", () => {
  beforeEach(() => {
    cy.myClearCache();
  });
  /* 
  it("should scroll to top of the page when clicking on the 'scroll to top' button", () => {
    cy.visit("/category/category1");

    cy.window().scrollTo("bottom");
    cy.get(".ArrowDropup_container__AHOaY").click();

    cy.window().should((win) => {
      expect(win.scrollY).to.be.eq(0);
    });
  });

  it("should check the children of the last element in the dropdown menu", () => {
    cy.visit("/");
    cy.get(".NavBar_navBarMenu__BeYEF").click();
    cy.get(".Dropdown_sidePanelCatalogElementC1__5OqgK").click();

    // check is active dropdown menu
    cy.get(".Dropdown_sidePanelCatalogElementOpen__Ap0mN")
      .last()
      .should("have.descendants", "a");
  });

  it("should get 404 response after sending non-matching request on API", () => {
    cy.request({
      method: "GET",
      url: "/blog/5",
      failOnStatusCode: false,
    }).then((res: Cypress.Response<any>) => {
      expect(res.status).to.be.equal(404);
    });
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
    //receive totalPages from backend

    cy.request({
      method: "GET",
      url: "/api/blog/1",
    }).then((request) => {
      const totalPages: number = request.body.totalPages;

      //check is correct data
      expect(totalPages).to.be.a("number");
      expect(totalPages).to.be.at.least(1);

      for (let page = 1; page <= totalPages; page++) {
        cy.visit(`/blog/${page}`);
        cy.get("[data-cy-blog-id]").each(($blog) => {
          const blogCyId = $blog.attr("data-cy-blog-id");

          const getBlog = (id: string | undefined) =>
            cy.get(
              `[data-cy-blog-id="${id}"] > .BlogItem_blogContainer__OwE1U > .BlogItem_blogLogo__qKVm1 > img`
            );

          //click at iteration product
          getBlog(blogCyId).click();
          cy.wait(1000);
          cy.go("back");
        });
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

  it("should successfully change image in product page", () => {
    //open product page
    cy.visit("/category/category1/1aa");

    //get all small images
    cy.get("[data-cy-image]").each(($image, index) => {
      cy.wrap($image).click();

      // wait for the large image to load
      cy.get(".Product_wrapperProductImageLogo__hP62n > img").should(
        "be.visible"
      );

      //check logo image width check small image
      cy.get("[data-cy-logo-image]").should(($logoImage) => {
        expect(Number($logoImage.attr("data-cy-logo-image"))).to.eq(index);
      });
    });
  });*/

  it("should successfully open drop down info in product", () => {
    //open product page
    cy.visit("/category/category1/1aa");

    //click on descr info menu
    cy.myGetElByDataAttr("Описание").click();
    //check is open
    cy.get(".Dropdown_sidePanelCatalogElementOpen__Ap0mN").should("be.visible");

    //click on param info menu
    cy.myGetElByDataAttr("Характеристики").click();
    //check is open
    cy.get(
      ".Product_wrapperProductInfoParametres__o4SZR > :nth-child(1) > .Dropdown_sidePanelCatalogElementOpen__Ap0mN"
    ).should("be.visible");

    //close descr info menu
    cy.get(
      '[data-cy="Описание"] > .Dropdown_sidePanelCatalogElementC1__5OqgK'
    ).click();
    cy.get(
      '[data-cy="dropDown Описание"] > .Dropdown_sidePanelCatalogElementC1__5OqgK'
    ).should("not.exist");

    //close param info menu
    cy.get(
      '[data-cy="Характеристики"] > .Dropdown_sidePanelCatalogElementC1__5OqgK'
    ).click();
    cy.get(
      '[data-cy="dropDown Характеристики"] > .Dropdown_sidePanelCatalogElementC1__5OqgK'
    ).should("not.exist");
  });
});
