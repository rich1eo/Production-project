import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { ArticleList } from '@/entities/Article';
import { Text } from '@/shared/ui';

import { getArticles } from '../../model/slice/articlePageSlice';
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';

interface ArticleInfiniteListProps {
  className?: string;
}

export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
  const { className } = props;
  const { t } = useTranslation('articles');
  const isLoading = useSelector(getArticlesPageIsLoading);
  const view = useSelector(getArticlesPageView);
  const articles = useSelector(getArticles.selectAll);
  const error = useSelector(getArticlesPageError);

  if (error) {
    return <Text text={t('Error during loading articles')} />;
  }

  return (
    <ArticleList
      className={className}
      isLoading={isLoading}
      view={view}
      articles={articles}
    />
  );
});
