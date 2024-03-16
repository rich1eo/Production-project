/* eslint-disable @typescript-eslint/no-namespace */
import { Article } from '../../../src/entities/Article';

const defaultArticle = {
  title: 'Testing Article',
  subtitle: 'Testing article sub title',
  img: 'https://mblogthumb-phinf.pstatic.net/MjAyMjAyMTJfNSAg/MDAxNjQ0NTkzNzE5MzQ1.q5g3zqnCq2Rt1xUmpSFx2xWRQTl4VmngS8FGT7eGD0Ig.UKr_wLSCCg8PD-v8TfDddCKFIWhKoeqh5lZM09FVrsYg.PNG.sw4r/image.png?type=w800',
  views: 345234,
  createdAt: '30.12.2022',
  userId: '1',
  type: ['IT'],
  blocks: [],
};

export const createArticle = (article?: Article) => {
  return cy
    .request({
      method: 'POST',
      url: 'http://localhost:8000/articles',
      headers: {
        Authorization: 'testToken',
      },
      body: article ?? defaultArticle,
    })
    .then((res) => res.body);
};

export const removeArticle = (articleId: string) => {
  return cy.request({
    method: 'DELETE',
    url: `http://localhost:8000/articles/${articleId}`,
    headers: {
      Authorization: 'testToken',
    },
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      createArticle(article?: Article): Chainable<Article>;
      removeArticle(articleId: string): Chainable<void>;
    }
  }
}
