import { ReactNode, memo, useCallback } from 'react';

import * as styles from './Tabs.module.scss';

import { classNames } from '@/shared/lib';
import { Card, CardTheme } from '../Card/Card';

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tab: TabItem) => void;
}

/**
 * @deprecated
 */
export const Tabs = memo((props: TabsProps) => {
  const { className, tabs, value, onTabClick } = props;

  const handleClick = useCallback(
    (tab: TabItem) => {
      return () => {
        onTabClick(tab);
      };
    },
    [onTabClick],
  );

  return (
    <div className={classNames(styles.Tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Card
          key={tab.value}
          theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
          onClick={handleClick(tab)}
        >
          {tab.content}
        </Card>
      ))}
    </div>
  );
});
