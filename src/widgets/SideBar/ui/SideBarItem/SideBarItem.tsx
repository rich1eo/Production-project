import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import styles from './SideBarItem.module.scss';
import { SideBarItemType } from 'widgets/SideBar/model/items';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

interface SideBarItemProps {
  item: SideBarItemType;
  collapsed: boolean;
}

const SideBarItem = memo(({ item, collapsed }: SideBarItemProps) => {
  const { t } = useTranslation();

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