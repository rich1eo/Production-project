import { lazy } from 'react';

export const MainPageAsync = lazy(
  () =>
    new Promise(resolve => {
      // @ts-ignore
      // prettier-ignore
      setTimeout(() => { resolve(import('./MainPage')) }, 1500);
    })
);
