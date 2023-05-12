import { store } from "../../../store/store";
import "../../support/commands";
/// <reference types="cypress" />

describe("products_functionality", () => {
  const productsInCart = store.getState().cart.products;
  const productsInCartTotal = store.getState().cart.totalCount;
  const productsInFavorite = store.getState().favorites.count;
  const productsInCompare = store.getState().compare.count;

  const categoryButton = (idCategory: number = 1) =>
    `.category_categoryWrapper__ARdj_ > :nth-child(${idCategory}) > a`;

  const addProductInCart = (index: number) =>
    `:nth-child(${index}) > .ProductPreview_count__smdAc > .CardButton_cart__6_N23`;
  const addProductInFavorite = (index: number) =>
    `:nth-child(${index}) > .ProductPreview_favorit__mCoU1`;
  const addProductInCompare = (index: number) =>
    `:nth-child(${index}) > .ProductPreview_compare__6mew7`;

  beforeEach(() => {
    cy.myClearCache();
    //go to the all categories
    cy.myOpenCategories();
  });

  /*  it("should navigate to all categories and products", () => {
    // check all categories
    cy.get("[data-cy-category-id]").each(($category) => {
      const dataCyCategory = $category.attr("data-cy-category-id");

      const getCategory = (id: string | undefined) =>
        cy.get(`[data-cy-category-id="${id}"] > a`);

      //click on iteration category
      getCategory(dataCyCategory).click();

      //check all product in iteration category
      cy.get("[data-cy-product-preview]").each(($productPreview) => {
        const dataCyValue = $productPreview.attr("data-cy-product-preview");

        const getProduct = (id: string | undefined) =>
          cy.get(
            `[data-cy-product-preview="${id}"] > :nth-child(3) > :nth-child(1) > img`
          );

        //click at iteration product
        getProduct(dataCyValue).click();
        cy.wait(200);

        //check info of product
        cy.url().should(
          "include",
          `/category/${dataCyCategory}/${dataCyValue}`
        );
        cy.wait(500);
        cy.get(".Product_wrapperProductInfoCurrency__g9D59").should(
          "be.visible"
        );
        cy.get(".Product_wrapperProductInfoLabel__lygPI").should("be.visible");

        //back to the iteration category
        cy.go("back");
      });

      //go to the all categories
      cy.go("back");
    });
  });

  it("should add all products on the page to cart and remove they them", () => {
    // Click on first category button
    cy.get(categoryButton()).click();

    for (let index = 1; index <= 8; index++) {
      // Click add to cart button
      cy.get(addProductInCart(index)).click();

      if (productsInCart.length > 0 && productsInCart[0].data) {
        const lastProduct = productsInCart[productsInCart.length - 1];
        expect(lastProduct.data.id).to.equal(`${index}aa`);
      }
    }

    //click on curt button
    cy.get(":nth-child(5) > a").click();

    for (let index = 8; index >= 1; index--) {
      let removeProductButton = cy.get(
        `:nth-child(${index}) > .CartProduct_orderAddToCart__Lc2Cy`
      );
      removeProductButton.each(($el) => {
        cy.wrap($el).click();
      });
    }
    expect(productsInCartTotal).to.equal(0);
  });

  it("should add all products on the page to favorite and remove they them", () => {
    // Click on first category button
    cy.get(categoryButton()).click();

    for (let index = 1; index <= 8; index++) {
      // Click add to favorite button
      cy.get(addProductInFavorite(index)).click();
    }

    //click on favorite button
    cy.get(".NavBar_navBarAreaControls__hv1tc > :nth-child(4) > a").click();

    for (let index = 8; index >= 1; index--) {
      let removeProductFromFavoriteButton = cy.get(
        `.favorites_favoritesProduct__tO2Ym > :nth-child(${index}) > .ProductPreview_favorit__mCoU1`
      );

      removeProductFromFavoriteButton.each(($el) => {
        cy.wrap($el).click();
      });
    }
    expect(productsInFavorite).to.equal(0);
  });

  it("should add all products on the page to compare and remove they them", () => {
    // Click on first category button
    cy.get(categoryButton()).click();

    for (let index = 1; index <= 5; index++) {
      // Click add to favorite button
      cy.get(addProductInCompare(index)).click();
    }

    //click on compare button
    cy.get(".NavBar_navBarAreaControls__hv1tc > :nth-child(3) > a").click();

    for (let index = 5; index >= 1; index--) {
      let removeProductFromCompareButton = cy.get(
        `:nth-child(${index}) > .compare_buttons__iKvlv > :nth-child(2)`
      );

      removeProductFromCompareButton.each(($el) => {
        cy.wrap($el).click();
      });
    }
    expect(productsInCompare).to.equal(0);
  });

  it("should show the product after checking the item", () => {
    cy.visit("/");
    cy.get(".Home_wrapperContentProducts__ij3_j").find("img").first().click();
    cy.url().should("include", "/category/category1/1aa");
  }); */
});
