import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib';
import { AppLink, AppLinkRedesigned, AppLinkTheme, Icon } from '@/shared/ui';
import { ToggleFeature } from '@/shared/lib/features';

import { SideBarItemType } from '../../model/types/sidebar';

import * as styles from './SideBarItem.module.scss';

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
    <ToggleFeature
      name="isAppRedesigned"
      on={
        <AppLinkRedesigned
          to={item.path}
          activeClassName={styles.active}
          className={classNames(styles.linkRedesigned, {
            [styles.collapsed]: collapsed,
          })}
        >
          <Icon Svg={item.Icon} clickable={collapsed} onClick={() => {}} />
          <span>{t(item.text)}</span>
        </AppLinkRedesigned>
      }
      off={
        <AppLink
          className={classNames(styles.link, { [styles.collapsed]: collapsed })}
          to={item.path}
          theme={AppLinkTheme.SECONDARY}
        >
          <item.Icon className={styles.icon} />
          <span>{t(item.text)}</span>
        </AppLink>
      }
    />
  );
});

export default SideBarItem;
