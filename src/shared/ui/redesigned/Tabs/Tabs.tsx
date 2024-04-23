import { ReactNode, memo, useCallback } from 'react';

import { classNames } from '@/shared/lib';
import { CardRedesigned } from '../..';
import { Flex, FlexDirection } from '../Stack/Flex/Flex';

import * as styles from './Tabs.module.scss';

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tab: TabItem) => void;
  direction?: FlexDirection;
}

export const Tabs = memo((props: TabsProps) => {
  const { className, tabs, value, direction = 'row', onTabClick } = props;

  const handleClick = useCallback(
    (tab: TabItem) => {
      return () => {
        onTabClick(tab);
      };
    },
    [onTabClick],
  );

  return (
    <Flex
      direction={direction}
      gap="8"
      className={classNames(styles.Tabs, {}, [className])}
      align="start"
    >
      {tabs.map((tab) => {
        const isSelected = tab.value === value;
        return (
          <CardRedesigned
            key={tab.value}
            variant={isSelected ? 'light' : 'normal'}
            onClick={handleClick(tab)}
            borderRadius="round"
            className={classNames('', {
              [styles.selected]: isSelected,
            })}
          >
            {tab.content}
          </CardRedesigned>
        );
      })}
    </Flex>
  );
});
