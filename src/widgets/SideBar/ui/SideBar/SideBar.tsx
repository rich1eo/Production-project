import { memo, useState } from 'react';

import styles from './SideBar.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonSize, ThemeButton } from 'shared/ui/Button/Button';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { SideBarItemsList } from '../../model/items';
import SideBarItem from '../SideBarItem/SideBarItem';

interface SideBarProps {
  className?: string;
}

const SideBar = memo(({ className }: SideBarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  function handleToggle() {
    setCollapsed((state) => !state);
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
        {SideBarItemsList.map((item) => {
          return (
            <SideBarItem key={item.path} item={item} collapsed={collapsed} />
          );
        })}
      </div>
      <div className={styles.switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed} />
      </div>
    </aside>
  );
});

export default SideBar;
