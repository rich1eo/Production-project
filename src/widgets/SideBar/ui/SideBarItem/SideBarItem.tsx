import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import styles from './SideBarItem.module.scss';
import { SideBarItemType } from 'widgets/SideBar/model/types/sidebar';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';

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
