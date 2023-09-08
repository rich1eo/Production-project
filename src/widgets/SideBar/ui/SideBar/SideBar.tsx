import { useState } from 'react';

import styles from './SideBar.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { Button, ButtonSize, ThemeButton } from 'shared/ui/Button/Button';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import MainIcon from 'shared/assets/icons/main-20-20.svg';

interface SideBarProps {
  className?: string;
}

export default function SideBar({ className }: SideBarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();

  function handleToggle() {
    setCollapsed(state => !state);
  }

  return (
    <aside
      className={classNames(styles.SideBar, { [styles.collapsed]: collapsed }, [
        className,
      ])}
      data-testid="sidebar"
    >
      <Button
        theme={ThemeButton.BACKGROUND_INVERTED}
        onClick={handleToggle}
        data-testid="sidebar-toggle"
        className={styles.collapsedBtn}
        square
        size={ButtonSize.L}
      >
        {collapsed ? '>' : '<'}
      </Button>
      <div className={styles.items}>
        <AppLink
          to={RoutePath.main}
          theme={AppLinkTheme.SECONDARY}
          className={styles.link}
        >
          <MainIcon className={styles.icon} />
          <span>{t('Home')}</span>
        </AppLink>
        <AppLink
          to={RoutePath.about}
          theme={AppLinkTheme.SECONDARY}
          className={styles.link}
        >
          <AboutIcon className={styles.icon} />
          <span>{t('About us')}</span>
        </AppLink>
      </div>
      <div className={styles.switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed} />
      </div>
    </aside>
  );
}
