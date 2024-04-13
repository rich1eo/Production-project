import { ButtonHTMLAttributes, ReactNode } from 'react';

import { Mods, classNames } from '@/shared/lib/classNames/classNames';

import * as styles from './Button.module.scss';

type ButtonVariant =
  | 'clear'
  | 'clearInverted'
  | 'outline'
  | 'outlineRed'
  | 'background'
  | 'backgroundInverted';

type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  variant?: ButtonVariant;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Button = (props: ButtonProps) => {
  const {
    className,
    children,
    variant = 'outline',
    square,
    size = 'm',
    disabled,
    fullWidth,
    ...otherProps
  } = props;

  const mods: Mods = {
    [styles.square]: square,
    [styles.disabled]: disabled,
    [styles.fullWidth]: fullWidth,
  };

  return (
    <button
      type="button"
      className={classNames(styles.Button, mods, [
        className,
        styles[variant],
        styles[size],
      ])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
};
