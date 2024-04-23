import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { classNames } from '@/shared/lib';
import { Card, Input } from '@/shared/ui';

import { useArticlesFilters } from '../../lib/hooks/useArticlesFilters';

import * as styles from './ArticlesPageFilters.module.scss';

interface ArticlesPageFiltersProps {
  className?: string;
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const {
    search,
    type,
    view,
    order,
    sort,
    handleChangeOrder,
    handleChangeSearch,
    handleChangeSort,
    handleChangeType,
    handleChangeView,
  } = useArticlesFilters();

  return (
    <div className={classNames('', {}, [className])}>
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
