import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ArticleList } from 'entities/Article';
import Text, { TextSize } from 'shared/ui/Text/Text';
import { VStack } from 'shared/ui/Stack';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';

import styles from './ArticleRecommendationsList.module.scss';

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
      >
        <Text size={TextSize.L} title={t('Recommendations')} />
        <ArticleList articles={articles} target="_blank" virtualized={false} />
      </VStack>
    );
  }
);
