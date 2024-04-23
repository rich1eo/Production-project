import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib';
import { Tabs, TabsRedesigned } from '@/shared/ui';
import { ArticleType } from '@/entities/Article';
import type { TabItem } from '@/shared/ui';
import { ToggleFeature } from '@/shared/lib/features';

interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType;
  onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
  const { className, value, onChangeType } = props;
  const { t } = useTranslation();

  const tabs = useMemo<TabItem[]>(
    () => [
      {
        value: ArticleType.ALL,
        content: t('All'),
      },
      {
        value: ArticleType.IT,
        content: 'IT',
      },
      {
        value: ArticleType.SCIENCE,
        content: t('Science'),
      },
      {
        value: ArticleType.ECONOMICS,
        content: t('Economics'),
      },
    ],
    [t],
  );

  const handleChangeType = useCallback(
    (tab: TabItem) => {
      onChangeType(tab.value as ArticleType);
    },
    [onChangeType],
  );

  return (
    <ToggleFeature
      name="isAppRedesigned"
      on={
        <TabsRedesigned
          className={classNames('', {}, [className])}
          tabs={tabs}
          value={value}
          onTabClick={handleChangeType}
          direction="column"
        />
      }
      off={
        <Tabs
          className={classNames('', {}, [className])}
          tabs={tabs}
          value={value}
          onTabClick={handleChangeType}
        />
      }
    />
  );
});
