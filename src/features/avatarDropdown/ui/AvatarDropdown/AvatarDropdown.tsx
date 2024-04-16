import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getRouteAdminPanel, getRouteProfile } from '@/shared/const/router';
import { ToggleFeature } from '@/shared/lib/features';

import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from '@/entities/User';

import {
  Avatar,
  AvatarRedesigned,
  Dropdown,
  DropdownRedesigned,
} from '@/shared/ui';

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

  const items = [
    ...(isAdminPanelAvailable
      ? [
          {
            content: t('Admin panel'),
            href: getRouteAdminPanel(),
          },
        ]
      : []),
    {
      content: t('Profile'),
      href: getRouteProfile(authData.id),
    },
    {
      content: t('Sign Out'),
      onClick: handleLogout,
    },
  ];

  return (
    <ToggleFeature
      name="isAppRedesigned"
      on={
        <DropdownRedesigned
          className={classNames('', {}, [className])}
          trigger={<AvatarRedesigned size={48} src={authData.avatar} />}
          items={items}
          direction="bottom left"
        />
      }
      off={
        <Dropdown
          className={classNames('', {}, [className])}
          trigger={<Avatar size={30} src={authData.avatar} />}
          items={items}
          direction="bottom left"
        />
      }
    />
  );
});
