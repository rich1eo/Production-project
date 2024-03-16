/* eslint-disable @typescript-eslint/no-namespace */
export const updateProfile = (
  firstName: string = 'new first name',
  secondName: string = 'new second name'
) => {
  cy.getByTestId('EditableProfileCardHeader.EditBtn').click();
  cy.getByTestId('ProfileCard.firstName').clear().type(firstName);
  cy.getByTestId('ProfileCard.secondName').clear().type(secondName);
  cy.getByTestId('EditableProfileCardHeader.SaveBtn').click();
};

export const resetProfile = (profileId: string) => {
  return cy.request({
    method: 'PUT',
    url: `http://localhost:8000/profile/${profileId}`,
    headers: {
      Authorization: 'testToken',
    },
    body: {
      id: '4',
      firstName: 'Cypress',
      secondName: 'Test',
      age: 27,
      currency: 'RUB',
      country: 'Russia',
      city: 'Moscow',
      username: 'testuser',
      avatar:
        'https://xakep.ru/wp-content/uploads/2018/05/171485/KuroiSH-hacker.jpg',
    },
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(firstName?: string, secondName?: string): Chainable<void>;
      resetProfile(profileId: string): Chainable<void>;
    }
  }
}
