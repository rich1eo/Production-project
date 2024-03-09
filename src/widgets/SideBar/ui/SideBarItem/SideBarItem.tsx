import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib';
import { AppLink, AppLinkTheme } from '@/shared/ui';

import { SideBarItemType } from '../../model/types/sidebar';

import styles from './SideBarItem.module.scss';

interface SideBarItemProps {
  item: SideBarItemType;
  collapsed: boolean;
}

const SideBarItem = memo(({ item, collapsed }: SideBarItemProps) => {
  const { t } = useTranslation();
  const isAuth = useSelector(getUserAuthData);

  if (item.authOnly && !isAuth) {
    return null;
  }

  return (
    <AppLink
      className={classNames(styles.link, { [styles.collapsed]: collapsed })}
      to={item.path}
      theme={AppLinkTheme.SECONDARY}
    >
      <item.Icon className={styles.icon} />
      <span>{t(item.text)}</span>
    </AppLink>
  );
});

export default SideBarItem;
