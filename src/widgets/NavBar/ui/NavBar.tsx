import { useTranslation } from 'react-i18next';
import styles from './NavBar.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import AppLink from 'shared/ui/AppLink/AppLink';

interface NavBarProps {
  className?: string;
}

export function NavBar({ className }: NavBarProps) {
  const { t } = useTranslation();

  return (
    <header className={classNames(styles.Navbar, {}, [className])}>
      <nav className={classNames(styles.links)}>
        <AppLink to="/">{t('Home')}</AppLink>
        <AppLink to="/about">{t('About us')}</AppLink>
      </nav>
    </header>
  );
}
