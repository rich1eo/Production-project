import styles from './NavBar.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

interface NavBarProps {
  className?: string;
}

export function NavBar({ className }: NavBarProps) {
  return (
    <header className={classNames(styles.Navbar, {}, [className])}>
      <nav className={classNames(styles.links)}></nav>
    </header>
  );
}
