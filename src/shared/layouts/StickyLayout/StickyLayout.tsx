import { ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import * as styles from './StickyLayout.module.scss';

interface StickyLayoutProps {
  className?: string;
  left?: ReactNode;
  content: ReactNode;
  right?: ReactNode;
}

export const StickyLayout = (props: StickyLayoutProps) => {
  const { className, right, left, content } = props;

  console.log(left);

  return (
    <div className={classNames(styles.StickyLayout, {}, [className])}>
      {left && <div className={styles.left}>{left}</div>}
      <div className={styles.content}>{content}</div>
      {right && <div className={styles.right}>{right}</div>}
    </div>
  );
};
