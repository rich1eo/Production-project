import { memo } from 'react';

import { VStack } from '@/shared/ui';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ScrollToTopButton } from '@/features/scrollToTopButton';

import * as styles from './ScrollToolbar.module.scss';

type ScrollToolbarProps = {
  className?: string;
};

export const ScrollToolbar = memo(({ className }: ScrollToolbarProps) => {
  return (
    <VStack
      justify="center"
      align="center"
      max
      className={classNames(styles.ScrollToolbar, {}, [className])}
    >
      <ScrollToTopButton />
    </VStack>
  );
});
