import { HTMLAttributes, ReactNode, memo } from 'react';

import styles from './Card.module.scss';

import { classNames } from 'shared/lib/classNames/classNames';

export enum CardTheme {
  NORMAL = 'normal',
  OUTLINED = 'outlined',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  theme?: CardTheme;
}

export const Card = memo((props: CardProps) => {
  const {
    children,
    className,
    theme = CardTheme.NORMAL,
    ...otherProps
  } = props;

  return (
    <div
      className={classNames(styles.Card, {}, [className, styles[theme]])}
      {...otherProps}
    >
      {children}
    </div>
  );
});
