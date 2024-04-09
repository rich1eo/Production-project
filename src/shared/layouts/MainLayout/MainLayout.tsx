import { ReactNode, memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import * as styles from './MainLayout.module.scss';

interface MainLayoutProps {
  className?: string;
  header: ReactNode;
  content: ReactNode;
  sidebar: ReactNode;
  toolbar?: ReactNode;
}

export const MainLayout = memo((props: MainLayoutProps) => {
  const { className, header, content, sidebar, toolbar } = props;

  return (
    <div className={classNames(styles.MainLayout, {}, [className])}>
      <div className={styles.sidebar}>{sidebar}</div>
      <div className={styles.content}>{content}</div>
      <div className={styles.rightbar}>
        <div className={styles?.header}>{header}</div>
        <div className={styles.toolbar}>{toolbar}</div>
      </div>
    </div>
  );
});
