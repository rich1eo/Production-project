import { lazy } from 'react';

export const ArticleDetailsPageAsync = lazy(
  () =>
    new Promise((resolve) => {
      // @ts-ignore
      // prettier-ignore
      setTimeout(() => { resolve(import('./ArticleDetailsPage')) }, 500);
    })
);
