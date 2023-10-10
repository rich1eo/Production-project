import { memo } from 'react';
import styles from './ArticleDetailsPage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

interface ArticlesPageProps {
  className?: string;
}

function ArticleDetailsPage({ className }: ArticlesPageProps) {
  return (
    <div className={classNames(styles.ArticleDetailPage, {}, [className])}>
      Article Details Page
    </div>
  );
}

export default memo(ArticleDetailsPage);
