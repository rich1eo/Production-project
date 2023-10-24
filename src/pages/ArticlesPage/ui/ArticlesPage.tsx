import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import {
  ArticleList,
  ArticleListView,
  ArticleViewSelector,
} from 'entities/Article';
import DynamicModuleLoader, {
  ReducerList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  articlePageActions,
  articlePageReducer,
  getArticles,
} from '../model/slice/articlePageSlice';
import { fetchArticlesList } from '../model/services/fetchArticlesList/fetchArticlesList';
import { useSelector } from 'react-redux';
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from '../model/selectors/articlesPageSelectors';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducerList = {
  articlesPage: articlePageReducer,
};

function ArticlesPage({ className }: ArticlesPageProps) {
  const isLoading = useSelector(getArticlesPageIsLoading);
  const error = useSelector(getArticlesPageError);
  const view = useSelector(getArticlesPageView);

  const dispatch = useAppDispatch();
  const articles = useSelector(getArticles.selectAll);

  useInitialEffect(() => {
    dispatch(fetchArticlesList());
    dispatch(articlePageActions.initState());
  });

  const handleChangeView = useCallback(
    (view: ArticleListView) => {
      dispatch(articlePageActions.setView(view));
    },
    [dispatch]
  );

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames('', {}, [className])}>
        <ArticleViewSelector view={view} onViewClick={handleChangeView} />
        <ArticleList isLoading={isLoading} view={view} articles={articles} />
      </div>
    </DynamicModuleLoader>
  );
}

export default memo(ArticlesPage);
