import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/const/localstorage';

export const login = (
  username: string = 'testuser',
  password: string = '123'
) => {
  cy.log(`Logging in as ${username}`);
  const client_id = Cypress.env('auth0_client_id');
  const client_secret = Cypress.env('auth0_client_secret');
  const audience = Cypress.env('auth0_audience');
  const scope = Cypress.env('auth0_scope');

  cy.request({
    method: 'POST',
    url: 'http://localhost:8000/login',
    body: {
      username,
      password,
    },
  }).then(({ body }) => {
    window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body));
  });
};
