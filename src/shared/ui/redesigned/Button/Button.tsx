import { ButtonHTMLAttributes, ReactNode } from 'react';

import { Mods, classNames } from '@/shared/lib/classNames/classNames';

import * as styles from './Button.module.scss';

type ButtonVariant = 'clear' | 'outline' | 'filled';

type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  variant?: ButtonVariant;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
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
    addonLeft,
    addonRight,
    ...otherProps
  } = props;

  const mods: Mods = {
    [styles.square]: square,
    [styles.disabled]: disabled,
    [styles.fullWidth]: fullWidth,
    // [styles.withAddonLeft]: !!addonLeft,
    // [styles.withAddonRight]: !!addonRight,
    [styles.withAddon]: !!addonRight || !!addonLeft,
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
      {addonLeft && <div className={styles.addonLeft}>{addonLeft}</div>}
      {children}
      {addonRight && <div className={styles.addonRight}>{addonRight}</div>}
    </button>
  );
};
