import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleListView } from 'entities/Article';

export interface ArticlePageSchema extends EntityState<Article> {
  view: ArticleListView;
  isLoading?: boolean;
  error?: string;
  // pagination
  page: number;
  limit?: number;
  hasMore: boolean;
}
