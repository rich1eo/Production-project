import { lazy } from 'react';

export const ArticlesPageAsync = lazy(
  () =>
    new Promise((resolve) => {
      // @ts-ignore
      // prettier-ignore
      setTimeout(() => { resolve(import('./ArticlesPage')) }, 500);
    })
);
