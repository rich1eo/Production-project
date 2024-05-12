import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getRouteArticleCreate } from '@/shared/const/router';
import { getUserAuthData } from '@/entities/User';
import { LoginModal } from '@/features/authByUsername';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { NotificationButton } from '@/features/notificationButton';
import { classNames } from '@/shared/lib';
import {
  AppLink,
  AppLinkTheme,
  Button,
  ButtonRedesigned,
  ButtonTheme,
  HStack,
  Text,
  TextTheme,
} from '@/shared/ui';

import * as styles from './NavBar.module.scss';
import { ToggleFeature, toggleFeature } from '@/shared/lib/features';

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
      <ToggleFeature
        name="isAppRedesigned"
        on={
          <header
            className={classNames(styles.NavbarRedesigned, {}, [className])}
          >
            <HStack gap="16" className={styles.actions}>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
          </header>
        }
        off={
          <header className={classNames(styles.Navbar, {}, [className])}>
            <Text
              theme={TextTheme.INVERTED}
              title={t('Articles App')}
              className={styles.appName}
            />
            <AppLink
              theme={AppLinkTheme.SECONDARY}
              to={getRouteArticleCreate()}
              // className={styles.createBtn}
            >
              {t('Create article')}
            </AppLink>
            <HStack gap="16" className={styles.actions}>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
          </header>
        }
      />
    );
  }

  return (
    <header
      className={classNames(
        toggleFeature({
          name: 'isAppRedesigned',
          on: () => styles.NavbarRedesigned,
          off: () => styles.Navbar,
        }),
        {},
        [className],
      )}
    >
      <ToggleFeature
        name="isAppRedesigned"
        on={
          <ButtonRedesigned
            variant="clear"
            onClick={handleOpenModal}
            className={styles.links}
          >
            {t('Sign In')}
          </ButtonRedesigned>
        }
        off={
          <Button
            theme={ButtonTheme.CLEAR_INVERTED}
            onClick={handleOpenModal}
            className={styles.links}
          >
            {t('Sign In')}
          </Button>
        }
      />
      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={handleCloseModal} />
      )}
    </header>
  );
});
