import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  ArticleListView,
  ArticleSortField,
  ArticleType,
} from '@/entities/Article';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { classNames } from '@/shared/lib';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { Card, Input } from '@/shared/ui';
import { SortOrder } from '@/shared/types/sort';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { articlesPageActions } from '../../model/slice/articlePageSlice';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import {
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';

import styles from './ArticlesPageFilters.module.scss';

interface ArticlesPageFiltersProps {
  className?: string;
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
  const { className } = props;

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const view = useSelector(getArticlesPageView);
  const sort = useSelector(getArticlesPageSort);
  const order = useSelector(getArticlesPageOrder);
  const search = useSelector(getArticlesPageSearch);
  const type = useSelector(getArticlesPageType);

  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }));
  }, [dispatch]);

  const debouncedFetchData = useDebounce(fetchData, 500);

  const handleChangeView = useCallback(
    (view: ArticleListView) => {
      dispatch(articlesPageActions.setView(view));
    },
    [dispatch]
  );

  const handleChangeOrder = useCallback(
    (newOrder: SortOrder) => {
      dispatch(articlesPageActions.setOrder(newOrder));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData]
  );

  const handleChangeSort = useCallback(
    (newSort: ArticleSortField) => {
      dispatch(articlesPageActions.setSort(newSort));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData]
  );

  const handleChangeSearch = useCallback(
    (newSearch: string) => {
      dispatch(articlesPageActions.setSearch(newSearch));
      dispatch(articlesPageActions.setPage(1));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData]
  );

  const handleChangeType = useCallback(
    (value: ArticleType) => {
      dispatch(articlesPageActions.setType(value));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData]
  );

  return (
    <div className={classNames(styles.ArticlesPageFilters, {}, [className])}>
      <div className={styles.sortWrapper}>
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={handleChangeOrder}
          onChangeSort={handleChangeSort}
        />
        <ArticleViewSelector view={view} onViewClick={handleChangeView} />
      </div>
      <Card className={styles.search}>
        <Input
          placeholder={t('Search')}
          value={search}
          onChange={handleChangeSearch}
        />
      </Card>
      <ArticleTypeTabs
        value={type}
        onChangeType={handleChangeType}
        className={styles.tabs}
      />
    </div>
  );
});
