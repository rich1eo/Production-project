import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib';
import { HStack, Text, TextSize } from '@/shared/ui';
import { ToggleFeature } from '@/shared/lib/features';

import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { Article } from '../../model/types/article';
import { ArticleListView } from '../../model/consts/consts';

import * as cls from './ArticleList.module.scss';

interface ArticleListProps {
  articles: Article[];
  className?: string;
  isLoading?: boolean;
  view?: ArticleListView;
  target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleListView) =>
  new Array(view === ArticleListView.SMALL ? 9 : 3)
    .fill(0)
    .map((item, index) => (
      <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
    ));

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    view = ArticleListView.SMALL,
    isLoading,
  } = props;
  const { t } = useTranslation();

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames('', {}, [className, cls[view]])}>
        <Text size={TextSize.L} title={t('Articles not found')} />
      </div>
    );
  }

  return (
    <ToggleFeature
      name="isAppRedesigned"
      on={
        <HStack gap="16" wrap max data-testid="ArticleList">
          {articles.map((article) => (
            <ArticleListItem
              className={cls.card}
              key={article.id}
              article={article}
              view={view}
            />
          ))}
          {isLoading && getSkeletons(view)}
        </HStack>
      }
      off={
        <div
          className={classNames('', {}, [className, cls[view]])}
          data-testid="ArticleList"
        >
          {articles.map((article) => (
            <ArticleListItem
              className={cls.card}
              key={article.id}
              article={article}
              view={view}
            />
          ))}
          {isLoading && getSkeletons(view)}
        </div>
      }
    />
  );
});
