import styles from './NavBar.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import AppLink from 'shared/ui/AppLink/AppLink';

interface NavBarProps {
  className?: string;
}

export function NavBar({ className }: NavBarProps) {
  return (
    <header className={classNames(styles.Navbar, {}, [className])}>
      <nav className={classNames(styles.links)}>
        <AppLink to="/">Главная</AppLink>
        <AppLink to="/about">О сайте</AppLink>
      </nav>
    </header>
  );
}
