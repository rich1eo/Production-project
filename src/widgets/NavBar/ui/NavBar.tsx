import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { RoutePath } from '@/shared/const/router';
import { getUserAuthData } from '@/entities/User';
import { LoginModal } from '@/features/authByUsername';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { NotificationButton } from '@/features/notificationButton';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  AppLink,
  AppLinkTheme,
  Button,
  ButtonTheme,
  HStack,
  Text,
  TextTheme,
} from '@/shared/ui';

import styles from './NavBar.module.scss';

interface NavBarProps {
  className?: string;
}

export const NavBar = memo(({ className }: NavBarProps) => {
  const [isAuthModal, setIsAuthModal] = useState(false);
  const { t } = useTranslation();
  const authData = useSelector(getUserAuthData);

  const handleCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const handleOpenModal = () => {
    setIsAuthModal(true);
  };

  if (authData) {
    return (
      <header className={classNames(styles.Navbar, {}, [className])}>
        <Text
          theme={TextTheme.INVERTED}
          title={t('Articles App')}
          className={styles.appName}
        />
        <AppLink
          theme={AppLinkTheme.SECONDARY}
          to={RoutePath.articles_create}
          className={styles.createBtn}
        >
          {t('Create article')}
        </AppLink>
        <HStack gap="16" className={styles.actions}>
          <NotificationButton />
          <AvatarDropdown />
        </HStack>
      </header>
    );
  }

  return (
    <header className={classNames(styles.Navbar, {}, [className])}>
      <Button
        theme={ButtonTheme.CLEAR_INVERTED}
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
