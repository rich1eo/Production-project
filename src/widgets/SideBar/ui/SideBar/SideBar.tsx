import { useState } from 'react';

import styles from './SideBar.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';

interface SideBarProps {
  className?: string;
}

export default function SideBar({ className }: SideBarProps) {
  const [collapsed, setCollapsed] = useState(false);

  function handleToggle() {
    setCollapsed(state => !state);
  }

  return (
    <aside
      className={classNames(styles.SideBar, { [styles.collapsed]: collapsed }, [
        className,
      ])}
    >
      <button onClick={handleToggle}>toggle</button>
      <div className={styles.switchers}>
        <ThemeSwitcher />
        {/* TODO: LangSwitcher */}
      </div>
    </aside>
  );
}
