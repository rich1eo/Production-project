import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './ArticleSortSelector.module.scss';

import { ArticleSortField } from 'entities/Article/model/types/article';

import { Select, SelectOption } from 'shared/ui/Select/Select';
import { classNames } from 'shared/lib/classNames/classNames';
import { SortOrder } from 'shared/types';

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSortField: ArticleSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const { className, sort, order, onChangeOrder, onChangeSort } = props;

  const { t } = useTranslation();

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(
    () => [
      {
        value: 'asc',
        content: t('Ascend'),
      },
      {
        value: 'desc',
        content: t('Descend'),
      },
    ],
    [t]
  );

  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
    () => [
      {
        value: ArticleSortField.TITLE,
        content: t('title'),
      },
      {
        value: ArticleSortField.VIEWS,
        content: t('views'),
      },
      {
        value: ArticleSortField.CREATED,
        content: t('date created'),
      },
    ],
    [t]
  );

  return (
    <div className={classNames(styles.ArticleSortSelector, {}, [className])}>
      <Select<ArticleSortField>
        value={sort}
        options={sortFieldOptions}
        label={t('Sort by')}
        onChange={onChangeSort}
      />
      <Select<SortOrder>
        value={order}
        options={orderOptions}
        label={t('By')}
        onChange={onChangeOrder}
        className={styles.order}
      />
    </div>
  );
});
