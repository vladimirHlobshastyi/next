import { productsTypes } from "../../../moc/moc";
import { store } from "../../../store/store";
import "../../support/commands";
/// <reference types="cypress" />

describe("products_functionality", () => {
  const productsInCart = store.getState().cart.products;
  const productsInCartTotal = store.getState().cart.totalCount;
  const productsInFavorite = store.getState().favorites.count;
  const productsInCompare = store.getState().compare.count;

  const menuButton = ".NavBar_navBarMenu__BeYEF";
  const allCategoryButton = ".NavBar_sidePanelCatalog__PMB0F > :nth-child(1)";
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
  });

  it("should navigate to all categories and products", () => {
    cy.visit("/");

    // Click on menu button
    cy.get(menuButton).click();

    // Click on all category button
    cy.get(allCategoryButton).click();

    cy.get(categoryButton(1)).click();

    cy.get("[data-cy-product-preview]").each(($productPreview) => {
      const dataCyValue = $productPreview.attr("data-cy-product-preview");
      let getProduct = (id: string | undefined) =>
        cy.get(
          `[data-cy-product-preview="${id}"] > :nth-child(3) > :nth-child(1) > img`
        );
      getProduct(dataCyValue).click();
      cy.wait(500);
      cy.url().should("include", `/category/category1/${dataCyValue}`);
      cy.go("back");
    });
  });

  /* 

  it("should show the product after checking the item", () => {
      cy.visit("/");
      cy.get(".Home_wrapperContentProducts__ij3_j").find("img").first().click();
      cy.url().should("include", "/category/category1/1aa");
    });
  it("should add all products on the page to cart and remove they them", () => {
    cy.visit("/");

    // Click on menu button
    cy.get(menuButton).click();

    // Click on all category button
    cy.get(allCategoryButton).click();

    // Click on first category button
    cy.get(categoryButton).click();

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
    cy.visit("/");

    // Click on menu button
    cy.get(menuButton).click();

    // Click on all category button
    cy.get(allCategoryButton).click();

    // Click on first category button
    cy.get(categoryButton).click();

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
    cy.visit("/");

    // Click on menu button
    cy.get(menuButton).click();

    // Click on all category button
    cy.get(allCategoryButton).click();

    // Click on first category button
    cy.get(categoryButton).click();

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
  }); */
});
