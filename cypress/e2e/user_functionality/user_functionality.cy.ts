import { Interception } from 'cypress/types/net-stubbing';
import '../../support/commands';
import { ceil } from 'cypress/types/lodash';
/// <reference types="cypress" />

const SEARCH_WORD = 'рубашка';

describe('user_functionality', () => {
  beforeEach(() => {
    cy.myClearCache();
  });
  it('should display sub categories after checking category button in the NavBar menu', () => {
    cy.visit('/');
  });

  it('should display sub categories after checking category button in the NavBar menu', () => {
    cy.visit('/');

    //Open navbar and click on the category button
    cy.get('.NavBar_navBarMenu__BeYEF').click();
    cy.get('.Dropdown_sidePanelCatalogElementC1__5OqgK').click();

    //Check is display the sub categories
    cy.get('.Dropdown_sidePanelCatalogElementOpen__Ap0mN')
      .find('a')
      .should('be.visible')
      .and(($linkElement) => {
        expect($linkElement).to.have.length.greaterThan(1);
      });
  });

  it('should display social network icons after scrolling down the NavBar menu', () => {
    cy.visit('/');

    // Scroll to the NavBar menu
    cy.get('.NavBar_navBarMenu__BeYEF').click();
    cy.get('.NavBar_sidePanel__kHV5b').scrollTo('bottom');

    // Verify visibility and attributes of social network icons
    cy.get('.NavBar_sidePanelCatalogSoclinks__9egQI')
      .find('svg')
      .should('be.visible')
      .and(($svgBlocks) => {
        // Check if any svg blocks are displayed
        expect($svgBlocks).to.have.length.above(0);
        $svgBlocks.each((index, $svgBlock) => {
          // Verify the presence of width and height attributes
          expect($svgBlock).to.have.attr('width');
          expect($svgBlock).to.have.attr('height');
        });
      });
  });

  it("should scroll to top of the page when clicking on the 'scroll to top' button", () => {
    cy.visit('/category/category1');

    cy.window().scrollTo('bottom');
    cy.get('.ArrowDropup_container__AHOaY').click();

    cy.window().should((win) => {
      expect(win.scrollY).to.be.eq(0);
    });
  });

  it('should check the children of the last element in the dropdown menu', () => {
    cy.visit('/');
    cy.get('.NavBar_navBarMenu__BeYEF').click();
    cy.get('.Dropdown_sidePanelCatalogElementC1__5OqgK').click();

    // check is active dropdown menu
    cy.get('.Dropdown_sidePanelCatalogElementOpen__Ap0mN').last().should('have.descendants', 'a');
  });

  it('should get 404 response after sending non-matching request on API', () => {
    cy.request({
      method: 'GET',
      url: '/blog/5',
      failOnStatusCode: false,
    }).then((res: Cypress.Response<any>) => {
      expect(res.status).to.be.equal(404);
    });
  });

  it('should successfully save user adress', () => {
    cy.myLogin();

    cy.url().should('include', '/user/history_of_orders');

    //go to the user/adress
    cy.get('.NavbarInUserComponent_dropDownNavigateNone__pHfgS > :nth-child(2)').click();

    cy.url().should('include', '/user/adress');

    cy.get('input[name="city"]').type('CORRECT_CITY');
    cy.get('input[name="street"]').type('CORRECT_STREET');
    cy.get('input[name="houseNumber"]').type('CORRECT_HOUSE_NUMBER');

    //submit adress
    cy.get('button[type="submit"]').click();
    cy.get('.adress_success__is6sj').should('have.text', 'Данные успешно сохранены');
  });

  it('should have respons blogs status', () => {
    cy.intercept('GET', '/blog/1').as('blog');
    cy.visit('/blog/1');
    cy.wait('@blog').its('response.statusCode').should('eq', 200);
  });

  it('should successfully open all posts at posts category', () => {
    cy.visit('/');

    // Open menu and go to the blog page
    cy.get('.NavBar_navBarMenu__BeYEF').click();
    cy.get(':nth-child(6) > a').click();

    // Wait for the loading data and check all pages of blogs
    cy.wait(3000);
    cy.get('[data-cy-pagination]').each(($paginationButton) => {
      cy.wait(1500);
      const pageBtnNumber = $paginationButton.attr('data-cy-pagination');
      cy.get(`[data-cy-pagination='${pageBtnNumber}']`).click();

      cy.wait(1500);
      // Check all blog items and click on each one
      cy.get('[data-cy-blog]').each(($element) => {
        const blogItem = $element.attr('data-cy-blog');

        // Click on the blog item
        cy.get(`[data-cy-blog="${blogItem}"]`).click({ multiple: true });

        // Wait for content to load
        cy.wait(1000);

        // Check content
        cy.get('.blogPost_wrapperInfoDate__Uc_qb').should('be.visible');
        cy.get('.blogPost_wrapperInfoContenet__fPh7i > p').should('be.visible');
        cy.go('back');
      });
    });
  });

  it('should successfully rendering dropdown elements of search', () => {
    cy.visit('/');

    //click on search button
    cy.get('.NavBar_navBarAreaControls__hv1tc > :nth-child(1) > div').should('be.visible').click();

    //type search text
    cy.get('input').type('тов');
    cy.get('.Search_dropdown__SV_XV').should('exist');
  });

  it('should successfully search product in search page', () => {
    //The search element it is in data
    const searchTitle = 'рубашка';

    cy.visit('/');

    //click on serach button
    cy.get('.NavBar_navBarAreaControls__hv1tc > :nth-child(1) > div').should('be.visible').click();

    cy.get('input').type(searchTitle + '{enter}');
    cy.url().should('include', `/search/${encodeURIComponent(searchTitle)}`);
  });

  it('should successfully change image in product page', () => {
    //open product page
    cy.visit('/category/category1/1aa');

    //get all small images
    cy.get('[data-cy-image]').each(($image, index) => {
      cy.wrap($image).click();

      // wait for the large image to load
      cy.get('.Product_wrapperProductImageLogo__hP62n > img').should('be.visible');

      //check logo image width check small image
      cy.get('[data-cy-logo-image]').should(($logoImage) => {
        expect(Number($logoImage.attr('data-cy-logo-image'))).to.eq(index);
      });
    });
  });

  it('should open description and parameters dropdowns', () => {
    //open product page
    cy.visit('/category/category1/1aa');

    //click on descr info menu
    cy.myGetElByDataAttr('Описание').click();
    //check is open
    cy.get('.Dropdown_sidePanelCatalogElementOpen__Ap0mN').should('be.visible');

    //click on param info menu
    cy.myGetElByDataAttr('Характеристики').click();
    //check is open
    cy.get(
      '.Product_wrapperProductInfoParametres__o4SZR > :nth-child(1) > .Dropdown_sidePanelCatalogElementOpen__Ap0mN'
    ).should('be.visible');

    //close descr info menu
    cy.get('[data-cy="Описание"] > .Dropdown_sidePanelCatalogElementC1__5OqgK').click();
    cy.get('[data-cy="dropDown Описание"] > .Dropdown_sidePanelCatalogElementC1__5OqgK').should(
      'not.exist'
    );

    //close param info menu
    cy.get('[data-cy="Характеристики"] > .Dropdown_sidePanelCatalogElementC1__5OqgK').click();
    cy.get(
      '[data-cy="dropDown Характеристики"] > .Dropdown_sidePanelCatalogElementC1__5OqgK'
    ).should('not.exist');
  });

  it('should successfully open and close navigate menu', () => {
    cy.visit('/');

    //click on menu button
    cy.get('.NavBar_navBarMenu__BeYEF').click();
    cy.get('.NavBar_sidePanel__kHV5b').should('be.visible');

    //sheck is close menu
    cy.get('.NavBar_closeIcon__zAL3P').click();
    cy.get('.NavBar_sidePanel__kHV5b').should('not.exist');
  });

  it('should successfully send search request', () => {
    cy.visit('/');

    cy.intercept('/api/search/*').as('searchRequest');

    //click on search button
    cy.get('.NavBar_navBarAreaControls__hv1tc > :nth-child(1) > div').should('be.visible').click();

    //type search word
    cy.get('input').type(SEARCH_WORD + '{enter}');

    //check intercept respons
    cy.wait('@searchRequest').then((interception: Interception) => {
      expect(interception.response?.statusCode).to.be.equal(200);
    });
  });
});
