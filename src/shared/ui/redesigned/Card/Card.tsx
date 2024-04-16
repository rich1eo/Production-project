import { HTMLAttributes, ReactNode, memo } from 'react';

import { classNames } from '@/shared/lib';

import * as styles from './Card.module.scss';

type CardVariant = 'normal' | 'outline' | 'light';
type CardPadding = '0' | '8' | '16' | '24';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
  max?: boolean;
  cardPadding?: CardPadding;
}

const mapPaddingToClass: Record<CardPadding, string> = {
  '0': 'gap_0',
  '8': 'gap_8',
  '16': 'gap_16',
  '24': 'gap_24',
};

export const Card = memo((props: CardProps) => {
  const {
    children,
    className,
    variant = 'normal',
    max,
    cardPadding = '8',
    ...otherProps
  } = props;

  const padding = mapPaddingToClass[cardPadding];
  const cardMods = { [styles.max]: max };
  const cardClasses = [className, styles[variant], styles[padding]];

  return (
    <div
      className={classNames(styles.Card, cardMods, cardClasses)}
      {...otherProps}
    >
      {children}
    </div>
  );
});
