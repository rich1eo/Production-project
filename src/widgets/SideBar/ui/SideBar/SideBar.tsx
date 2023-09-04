import { useState } from 'react';

import styles from './SideBar.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { useTranslation } from 'react-i18next';

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
    >
      <button onClick={handleToggle}>{t('toggle')}</button>
      <div className={styles.switchers}>
        <ThemeSwitcher />
        <LangSwitcher />
      </div>
    </aside>
  );
}