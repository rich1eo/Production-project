import { HTMLAttributes, ReactNode, memo } from 'react';

import * as styles from './Card.module.scss';

import { classNames } from '@/shared/lib';

export enum CardTheme {
  NORMAL = 'normal',
  OUTLINED = 'outlined',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  theme?: CardTheme;
  max?: boolean;
}

/**
 * @deprecated
 */
export const Card = memo((props: CardProps) => {
  const {
    children,
    className,
    theme = CardTheme.NORMAL,
    max,
    ...otherProps
  } = props;

  return (
    <div
      className={classNames(styles.Card, { [styles.max]: max }, [
        className,
        styles[theme],
      ])}
      {...otherProps}
    >
      {children}
    </div>
  );
});
