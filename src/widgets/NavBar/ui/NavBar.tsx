import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './NavBar.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/authByUsername';
import { getUserAuthData, userActions } from 'entities/User';

interface NavBarProps {
  className?: string;
}

export function NavBar({ className }: NavBarProps) {
  const [isAuthModal, setIsAuthModal] = useState(false);
  const { t } = useTranslation();
  const authData = useSelector(getUserAuthData);
  const dispath = useDispatch();

  const handleCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const handleOpenModal = () => {
    setIsAuthModal(true);
  };

  const handleLogout = useCallback(() => {
    dispath(userActions.logout());
  }, [dispath]);

  if (authData) {
    return (
      <header className={classNames(styles.Navbar, {}, [className])}>
        <Button
          theme={ThemeButton.CLEAR_INVERTED}
          onClick={handleLogout}
          className={styles.links}
        >
          {t('Sign Out')}
        </Button>
      </header>
    );
  }

  return (
    <header className={classNames(styles.Navbar, {}, [className])}>
      <Button
        theme={ThemeButton.CLEAR_INVERTED}
        onClick={handleOpenModal}
        className={styles.links}
      >
        {t('Sign In')}
      </Button>
      <LoginModal isOpen={isAuthModal} onClose={handleCloseModal} />
    </header>
  );
}
