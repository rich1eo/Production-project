import { useSelector } from 'react-redux';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './NavBar.module.scss';

import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/authByUsername';
import { getUserAuthData, userActions } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import Text, { TextTheme } from 'shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

interface NavBarProps {
  className?: string;
}

export const NavBar = memo(({ className }: NavBarProps) => {
  const [isAuthModal, setIsAuthModal] = useState(false);
  const { t } = useTranslation();
  const authData = useSelector(getUserAuthData);
  const dispatch = useAppDispatch();

  const handleCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const handleOpenModal = () => {
    setIsAuthModal(true);
  };

  const handleLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  if (authData) {
    return (
      <header className={classNames(styles.Navbar, {}, [className])}>
        <Text
          theme={TextTheme.INVERTED}
          title={t('Ulbi TV App')}
          className={styles.appName}
        />
        <AppLink
          theme={AppLinkTheme.SECONDARY}
          to={RoutePath.articles_create}
          className={styles.createBtn}
        >
          {t('Create article')}
        </AppLink>
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
