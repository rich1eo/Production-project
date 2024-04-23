import { memo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { ArticlePageGreeting } from '@/features/articlePageGreeting';
import { ToggleFeature } from '@/shared/lib/features';
import { StickyLayout } from '@/shared/layouts';

import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { ViewSelectorContainer } from '../ViewSelectorContainer';
import { articlesPageReducer } from '../../model/slice/articlePageSlice';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPages/initArticlesPage';

import * as styles from './ArticlesPage.module.scss';
import { FiltersContainer } from '../FiltersContainer';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducerList = {
  articlesPage: articlesPageReducer,
};

function ArticlesPage({ className }: ArticlesPageProps) {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams));
  });

  const content = (
    <ToggleFeature
      name="isAppRedesigned"
      on={
        <StickyLayout
          left={<ViewSelectorContainer />}
          right={<FiltersContainer />}
          content={
            <Page
              onScrollEnd={onLoadNextPart}
              className={classNames('', {}, [className])}
              data-testid="ArticlesPage"
            >
              <ArticleInfiniteList />
              <ArticlePageGreeting />
            </Page>
          }
        />
      }
      off={
        <Page
          onScrollEnd={onLoadNextPart}
          className={classNames(styles.ArticlePage, {}, [className])}
          data-testid="ArticlesPage"
        >
          <ArticlesPageFilters />
          <ArticleInfiniteList className={styles.list} />
          <ArticlePageGreeting />
        </Page>
      }
    />
  );

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      {content}
    </DynamicModuleLoader>
  );
}

export default memo(ArticlesPage);
