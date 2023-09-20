import { lazy } from 'react';

export const ProfilePageAsync = lazy(
  () =>
    new Promise((resolve) => {
      // @ts-ignore
      // prettier-ignore
      setTimeout(() => { resolve(import('./ProfilePage')) }, 500);
    })
);
