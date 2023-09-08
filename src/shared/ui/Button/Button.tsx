import { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './Button.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

export enum ThemeButton {
  CLEAR = 'clear',
  OUTLINE = 'outline',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  theme?: ThemeButton;
  square?: boolean;
  size?: ButtonSize;
}

export function Button(props: ButtonProps) {
  const {
    className,
    children,
    theme,
    square,
    size = ButtonSize.M,
    ...otherProps
  } = props;

  const mods: Record<string, boolean> = {
    [styles.square]: square,
    [styles[size]]: true,
  };

  return (
    <button
      type="button"
      className={classNames(styles.Button, mods, [className, styles[theme]])}
      {...otherProps}
    >
      {children}
    </button>
  );
}
