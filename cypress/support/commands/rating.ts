/* eslint-disable @typescript-eslint/no-namespace */
export const setRate = (rate: number = 5, feedback: string = 'feedback') => {
  cy.getByTestId(`StarRating.${rate}`).click();
  cy.getByTestId('RatingCard.input').type(feedback);
  cy.getByTestId('RatingCard.send').click();
};

declare global {
  namespace Cypress {
    interface Chainable {
      setRate(rate: number, feedback: string): Chainable<void>;
    }
  }
}
