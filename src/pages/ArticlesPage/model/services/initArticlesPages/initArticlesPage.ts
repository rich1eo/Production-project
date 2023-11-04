import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../slice/articlePageSlice';
import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';
import { ArticleSortField, ArticleType } from 'entities/Article';
import { SortOrder } from 'shared/types';

export const initArticlesPage = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>
>('articlesPage/initArticlesPage', async (searchParams, thunkApi) => {
  const { dispatch, getState } = thunkApi;
  const inited = getArticlesPageInited(getState());

  if (!inited) {
    const sortFromURL = searchParams.get('sort') as ArticleSortField;
    const orderFromURL = searchParams.get('order') as SortOrder;
    const searchFromURL = searchParams.get('search');
    const typeFromURL = searchParams.get('type') as ArticleType;

    if (sortFromURL) {
      dispatch(articlesPageActions.setSort(sortFromURL));
    }

    if (orderFromURL) {
      dispatch(articlesPageActions.setOrder(orderFromURL));
    }

    if (searchFromURL) {
      dispatch(articlesPageActions.setSearch(searchFromURL));
    }

    if (typeFromURL) {
      dispatch(articlesPageActions.setType(typeFromURL));
    }

    dispatch(articlesPageActions.initState());
    dispatch(fetchArticlesList({}));
  }
});
