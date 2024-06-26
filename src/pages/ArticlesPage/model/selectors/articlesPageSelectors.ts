import { StateSchema } from '@/app/providers/StoreProvider';
import {
  ArticleListView,
  ArticleSortField,
  ArticleType,
} from '@/entities/Article';
import { buildSelector } from '@/shared/lib/store';

export const getArticlesPageIsLoading = (state: StateSchema) =>
  state.articlesPage?.isLoading || false;

export const getArticlesPageError = (state: StateSchema) =>
  state.articlesPage?.error;

export const getArticlesPageView = (state: StateSchema) =>
  state.articlesPage?.view || ArticleListView.SMALL;

export const getArticlesPageInited = (state: StateSchema) =>
  state.articlesPage?._inited;

// Pagination

export const getArticlesPageNum = (state: StateSchema) =>
  state.articlesPage?.page || 1;

export const getArticlesPageLimit = (state: StateSchema) =>
  state.articlesPage?.limit || 9;

export const getArticlesPageHasMore = (state: StateSchema) =>
  state.articlesPage?.hasMore;

// Filters

export const getArticlesPageOrder = (state: StateSchema) =>
  state.articlesPage?.order ?? 'asc';

export const getArticlesPageSort = (state: StateSchema) =>
  state.articlesPage?.sort ?? ArticleSortField.CREATED;

export const getArticlesPageSearch = (state: StateSchema) =>
  state.articlesPage?.search ?? '';

export const getArticlesPageType = (state: StateSchema) =>
  state.articlesPage?.type ?? ArticleType.ALL;

export const [useArticleById] = buildSelector(
  (state, id: string) => state.articlesPage?.entities[id],
);
