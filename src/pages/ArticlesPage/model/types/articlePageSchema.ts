import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleListView } from 'entities/Article';

export interface ArticlePageSchema extends EntityState<Article> {
  isLoading?: boolean;
  error?: string;
  view: ArticleListView;
}
