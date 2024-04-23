import { memo } from 'react';

import { ArticlesFilters } from '@/widgets/ArticlesFilters';
import { useArticlesFilters } from '../../lib/hooks/useArticlesFilters';

interface FiltersContainerProps {
  className?: string;
}

export const FiltersContainer = memo(({ className }: FiltersContainerProps) => {
  const {
    order,
    handleChangeOrder,
    search,
    handleChangeSearch,
    sort,
    handleChangeSort,
    type,
    handleChangeType,
  } = useArticlesFilters();

  return (
    <ArticlesFilters
      className={className}
      order={order}
      onChangeOrder={handleChangeOrder}
      search={search}
      onChangeSearch={handleChangeSearch}
      sort={sort}
      onChangeSort={handleChangeSort}
      type={type}
      onChangeType={handleChangeType}
    />
  );
});
