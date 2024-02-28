/* eslint-disable indent */
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import Avatar from '@/shared/ui/Avatar/Avatar';
import { Dropdown } from '@/shared/ui/Popups';
import { RoutePath } from '@/shared/const/router';

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);
  const isAdminPanelAvailable = isAdmin || isManager;
  const authData = useSelector(getUserAuthData);

  const handleLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  if (!authData) {
    return null;
  }

  return (
    <Dropdown
      className={classNames('', {}, [className])}
      trigger={<Avatar size={30} src={authData.avatar} />}
      items={[
        ...(isAdminPanelAvailable
          ? [
              {
                content: t('Admin panel'),
                href: RoutePath.admin_panel,
              },
            ]
          : []),
        {
          content: t('Profile'),
          href: RoutePath.profile + authData.id,
        },
        {
          content: t('Sign Out'),
          onClick: handleLogout,
        },
      ]}
      direction="bottom left"
    />
  );
});
