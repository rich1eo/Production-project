import { ReactNode } from 'react';
import { LinkProps } from 'react-router-dom';

import { classNames } from '@/shared/lib';

import * as styles from './AppLink.module.scss';
import { NavLink } from 'react-router-dom';

type AppLinkVariant = 'primary' | 'secondary' | 'red';

interface AppLinkProps extends LinkProps {
  className?: string;
  activeClassName?: string;
  children: ReactNode;
  variant?: AppLinkVariant;
}

export const AppLink = (props: AppLinkProps) => {
  const {
    className,
    activeClassName = '',
    children,
    to,
    variant = 'primary',
    ...otherProps
  } = props;

  return (
    <NavLink
      className={({ isActive }) =>
        classNames(styles.AppLink, { [activeClassName]: isActive }, [
          className,
          styles[variant],
        ])
      }
      to={to}
      {...otherProps}
    >
      {children}
    </NavLink>
  );
};
