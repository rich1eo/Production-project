import { selectByTestId } from '../../helpers/selectByTestId';

describe('Routing', () => {
  describe('the user is NOT logged in', () => {
    it('when visit base url - open "Main page"', () => {
      cy.visit('/');
      cy.get(selectByTestId('MainPage')).should('exist');
    });

    it('when visit "Profile page" - redirect on "Main page"', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('MainPage')).should('exist');
    });

    it('when visit not existing route - redirect on "Not found page"', () => {
      cy.visit('/this-route-is-not-exist');
      cy.get(selectByTestId('NotFoundPage')).should('exist');
    });
  });

  describe('the user is logged in', () => {
    beforeEach(() => {
      cy.login();
    });

    it('when visit "Profile page" - open "Profile page"', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('ProfilePage')).should('exist');
    });

    it('when visit "Articles page" - open "Articles page"', () => {
      cy.visit('/articles');
      cy.get(selectByTestId('ArticlesPage')).should('exist');
    });
  });
});
