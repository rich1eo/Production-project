import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib';
import { AppLogo, Button, ButtonSize, ButtonTheme, VStack } from '@/shared/ui';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { LangSwitcher } from '@/features/LangSwitcher';
import { ToggleFeature } from '@/shared/lib/features';

import SideBarItem from '../SideBarItem/SideBarItem';
import { getSideBarItems } from '../../model/selectors/getSideBarItems';

import * as styles from './SideBar.module.scss';

interface SideBarProps {
  className?: string;
}

const SideBar = memo(({ className }: SideBarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const sideBarItemsList = useSelector(getSideBarItems);

  function handleToggle() {
    setCollapsed((state) => !state);
  }

  const itemsList = useMemo(
    () =>
      sideBarItemsList.map((item) => {
        return (
          <SideBarItem key={item.path} item={item} collapsed={collapsed} />
        );
      }),
    [collapsed, sideBarItemsList],
  );

  return (
    <ToggleFeature
      name="isAppRedesigned"
      on={
        <aside
          className={classNames(
            styles.SideBarRedesigned,
            { [styles.collapsed]: collapsed },
            [className],
          )}
          data-testid="sidebar"
        >
          <AppLogo className={styles.appLogo} />
        </aside>
      }
      off={
        <aside
          className={classNames(
            styles.SideBar,
            { [styles.collapsed]: collapsed },
            [className],
          )}
          data-testid="sidebar"
        >
          <Button
            theme={ButtonTheme.BACKGROUND_INVERTED}
            onClick={handleToggle}
            data-testid="sidebar-toggle"
            className={styles.collapsedBtn}
            square
            size={ButtonSize.L}
          >
            {collapsed ? '>' : '<'}
          </Button>
          <VStack
            gap={collapsed ? '32' : '8'}
            className={styles.items}
            role="navigation"
          >
            {itemsList}
          </VStack>
          <div className={styles.switchers}>
            <ThemeSwitcher />
            <LangSwitcher short={collapsed} />
          </div>
        </aside>
      }
    />
  );
});

export default SideBar;
