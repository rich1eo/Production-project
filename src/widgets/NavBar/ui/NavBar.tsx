import { useSelector } from 'react-redux';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './NavBar.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/authByUsername';
import { getUserAuthData, userActions } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

interface NavBarProps {
  className?: string;
}

export const NavBar = memo(({ className }: NavBarProps) => {
  const [isAuthModal, setIsAuthModal] = useState(false);
  const { t } = useTranslation();
  const authData = useSelector(getUserAuthData);
  const dispath = useAppDispatch();

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
      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={handleCloseModal} />
      )}
    </header>
  );
});
