import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';
import { CardRedesigned, Icon, InputRedesigned, VStack } from '@/shared/ui';
import { classNames } from '@/shared/lib/classNames/classNames';
import SearchIcon from '@/shared/assets/icons/search.svg';

import * as styles from './ArticlesFilters.module.scss';

interface ArticlesFiltersProps {
  className?: string;
  // ArticleSortSelector
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSortField: ArticleSortField) => void;
  // Input
  search: string;
  onChangeSearch: (value: string) => void;
  // Tabs
  type: ArticleType;
  onChangeType: (type: ArticleType) => void;
}

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
  const {
    className,
    onChangeOrder,
    onChangeSort,
    order,
    sort,
    onChangeSearch,
    onChangeType,
    search,
    type,
  } = props;
  const { t } = useTranslation();

  return (
    <CardRedesigned
      className={classNames(styles.ArticlesFilters, {}, [className])}
      cardPadding="24"
    >
      <VStack gap="32">
        <InputRedesigned
          placeholder={t('Search')}
          value={search}
          onChange={onChangeSearch}
          addonLeft={<Icon Svg={SearchIcon} />}
        />
        <ArticleTypeTabs
          value={type}
          onChangeType={onChangeType}
          className={styles.tabs}
        />
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
      </VStack>
    </CardRedesigned>
  );
});
