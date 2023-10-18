import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleList, ArticleListView } from 'entities/Article';

interface ArticlesPageProps {
  className?: string;
}

function ArticlesPage({ className }: ArticlesPageProps) {
  return (
    <div className={classNames('', {}, [className])}>
      <ArticleList isLoading view={ArticleListView.SMALL} articles={[]} />
    </div>
  );
}

export default memo(ArticlesPage);
