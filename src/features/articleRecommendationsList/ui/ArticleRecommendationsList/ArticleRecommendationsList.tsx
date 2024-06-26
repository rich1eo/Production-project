import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib';
import { ArticleList } from '@/entities/Article';
import { Text, TextRedesigned, TextSize, VStack } from '@/shared/ui';

import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';

import * as styles from './ArticleRecommendationsList.module.scss';
import { ToggleFeature } from '@/shared/lib/features';

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = memo(
  (props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation('article-details');
    const {
      data: articles,
      isLoading,
      error,
    } = useArticleRecommendationsList(3);

    if (isLoading || error || !articles) {
      return null;
    }

    return (
      <VStack
        gap="8"
        className={classNames(styles.ArticleRecommendationsList, {}, [
          className,
        ])}
        data-testid="ArticleRecommendationList"
      >
        <ToggleFeature
          name="isAppRedesigned"
          on={<TextRedesigned size="l" title={t('Recommendations')} />}
          off={<Text size={TextSize.L} title={t('Recommendations')} />}
        />
        <ArticleList articles={articles} target="_blank" />
      </VStack>
    );
  },
);
