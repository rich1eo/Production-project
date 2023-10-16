import { FC, lazy } from 'react';
import { AddCommentFormProps } from './AddCommentForm';

export const AddCommentFormAsync = lazy<FC<AddCommentFormProps>>(
  () =>
    new Promise((resolve) => {
      // @ts-ignore
      // prettier-ignore
      setTimeout(() => { resolve(import('./AddCommentForm')) }, 500);
    })
);
