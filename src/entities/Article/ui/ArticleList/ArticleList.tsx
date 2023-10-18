import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './ArticleList.module.scss';
import { Article, ArticleListView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

interface ArticleListProps {
  articles: Article[];
  className?: string;
  isLoading?: boolean;
  view?: ArticleListView;
}

const getSkeletons = (view: ArticleListView) =>
  new Array(view === ArticleListView.SMALL ? 9 : 3)
    .fill(0)
    .map((_, index) => (
      <ArticleListItemSkeleton
        className={styles.card}
        key={index}
        view={view}
      />
    ));

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    view = ArticleListView.SMALL,
    isLoading,
  } = props;

  if (isLoading) {
    return (
      <div
        className={classNames(styles.ArticleList, {}, [
          className,
          styles[view],
        ])}
      >
        {getSkeletons(view)}
      </div>
    );
  }

  const renderArticle = (article: Article) => (
    <ArticleListItem
      key={article.id}
      article={article}
      view={view}
      className={styles.card}
    />
  );

  return (
    <div
      className={classNames(styles.ArticleList, {}, [className, styles[view]])}
    >
      {articles.length ? articles.map(renderArticle) : null}
    </div>
  );
});
