import { store } from "../../../store/store";

describe("products_functionality", () => {
  const menuButton = ".NavBar_navBarMenu__BeYEF";
  const allCategoryButton = ".NavBar_sidePanelCatalog__PMB0F > :nth-child(1)";
  const firstCategoryButton =
    ".category_categoryWrapper__ARdj_ > :nth-child(1) > a";
  const productPreview = (index: number) =>
    `:nth-child(${index}) > .ProductPreview_count__smdAc > .CardButton_cart__6_N23`;

  it("should show the product after checking the item", () => {
    cy.visit("/");
    cy.get(".Home_wrapperContentProducts__ij3_j").find("img").first().click();
    cy.url().should("include", "/category/category1/1aa");
  });

  it("should add all products on the page to cart", () => {
    const productsInCart = store.getState().cart.products;

    cy.visit("/");

    // Click on menu button
    cy.get(menuButton).click();

    // Click on all category button
    cy.get(allCategoryButton).click();

    // Click on first category button
    cy.get(firstCategoryButton).click();

    for (let index = 1; index <= 8; index++) {
      // Click add to cart button
      cy.get(productPreview(index)).click();

      if (productsInCart.length > 0 && productsInCart[0].data) {
        const lastProduct = productsInCart[productsInCart.length - 1];
        expect(lastProduct.data.id).to.equal(`${index}aa`);
      }
    }
  });
});
