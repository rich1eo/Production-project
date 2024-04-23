import { HTMLAttributes, ReactNode, memo } from 'react';

import { classNames } from '@/shared/lib';

import * as styles from './Card.module.scss';

type CardVariant = 'normal' | 'outline' | 'light';
type CardPadding = '0' | '8' | '16' | '24';
type CardBorderRadius = 'round' | 'normal';

const mapPaddingToClass: Record<CardPadding, string> = {
  '0': 'gap_0',
  '8': 'gap_8',
  '16': 'gap_16',
  '24': 'gap_24',
};

const mapBorderRadiusToClass: Record<CardBorderRadius, string> = {
  normal: 'borderRadiusNormal',
  round: 'borderRadiusRound',
};

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
  max?: boolean;
  cardPadding?: CardPadding;
  borderRadius?: CardBorderRadius;
}

export const Card = memo((props: CardProps) => {
  const {
    children,
    className,
    max,
    variant = 'normal',
    cardPadding = '8',
    borderRadius = 'normal',
    ...otherProps
  } = props;

  const cardMods = { [styles.max]: max };
  const padding = mapPaddingToClass[cardPadding];
  const border = mapBorderRadiusToClass[borderRadius];
  const cardClasses = [
    className,
    styles[variant],
    styles[padding],
    styles[border],
  ];

  return (
    <div
      className={classNames(styles.Card, cardMods, cardClasses)}
      {...otherProps}
    >
      {children}
    </div>
  );
});
