import { HTMLAttributeAnchorTarget, memo } from 'react';

import { ToggleFeature } from '@/shared/lib/features';

import { Article } from '../../model/types/article';
import { ArticleListView } from '../../model/consts/consts';

import { ArticleListItemDeprecated } from './ArticleListItemDeprecated/ArticleListItemDeprecated';
import { ArticleListItemRedesigned } from './ArticleListItemRedesigned/ArticleListItemRedesigned';

export interface ArticleListItemProps {
  article: Article;
  view: ArticleListView;
  target?: HTMLAttributeAnchorTarget;
  className?: string;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  return (
    <ToggleFeature
      name="isAppRedesigned"
      on={<ArticleListItemRedesigned {...props} />}
      off={<ArticleListItemDeprecated {...props} />}
    />
  );
});
