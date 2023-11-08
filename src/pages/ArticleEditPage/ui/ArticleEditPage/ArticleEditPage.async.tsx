import { lazy } from 'react';

export const ArticleEditPageAsync = lazy(
  () =>
    new Promise((resolve) => {
      // @ts-ignore
      // prettier-ignore
      setTimeout(() => { resolve(import('./ArticleEditPage')) }, 500);
    })
);
