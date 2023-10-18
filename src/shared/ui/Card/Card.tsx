import { HTMLAttributes, ReactNode, memo } from 'react';
import styles from './Card.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const Card = memo((props: CardProps) => {
  const { children, className, ...otherProps } = props;

  return (
    <div className={classNames(styles.Card, {}, [className])} {...otherProps}>
      {children}
    </div>
  );
});
