/* eslint-disable @typescript-eslint/no-namespace */
export const addComment = (text: string) => {
  cy.getByTestId('AddCommentForm.input').type(text);
  cy.getByTestId('AddCommentForm.btn').click();
};

declare global {
  namespace Cypress {
    interface Chainable {
      addComment(text: string): Chainable<void>;
    }
  }
}
