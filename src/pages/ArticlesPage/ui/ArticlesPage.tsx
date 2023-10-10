import { memo } from 'react';
import styles from './ArticlesPage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

interface ArticlesPageProps {
  className?: string;
}

function ArticlesPage({ className }: ArticlesPageProps) {
  return (
    <div className={classNames(styles.ArticlesPage, {}, [className])}>
      Articles Page
    </div>
  );
}

export default memo(ArticlesPage);
