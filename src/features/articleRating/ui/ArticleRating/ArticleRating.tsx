import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { RatingCard } from '@/entities/Rating';
import { getUserAuthData } from '@/entities/User';
import Skeleton from '@/shared/ui/Skeleton/Skeleton';

import {
  useGetArticleRating,
  useRateArticle,
} from '../../api/articleRatingApi';

export interface ArticleRatingProps {
  className?: string;
  articleId: string;
}

const ArticleRating = memo((props: ArticleRatingProps) => {
  const { className, articleId } = props;
  const { t } = useTranslation('article-details');
  const userData = useSelector(getUserAuthData);

  const { isLoading, data } = useGetArticleRating({
    articleId,
    userId: userData?.id ?? '',
  });

  const [rateArticleMutation] = useRateArticle();

  const handleRateArticle = useCallback(
    (starsCount: number, feedback?: string) => {
      try {
        rateArticleMutation({
          userId: userData?.id ?? '',
          articleId,
          rate: starsCount,
          feedback,
        });
      } catch (error) {
        console.error(error);
      }
    },
    [articleId, rateArticleMutation, userData?.id]
  );
  const handleCancel = useCallback(
    (starsCount: number) => {
      handleRateArticle(starsCount);
    },
    [handleRateArticle]
  );
  const handleAccept = useCallback(
    (starsCount: number, feedback?: string) => {
      handleRateArticle(starsCount, feedback);
    },
    [handleRateArticle]
  );

  if (isLoading) {
    return <Skeleton width="100%" height={120} />;
  }

  const rating = data?.[0];

  return (
    <RatingCard
      onAccept={handleAccept}
      onCancel={handleCancel}
      rate={rating?.rate}
      className={className}
      title={t('Rate article')}
      feedbackTitle={t('Leave a review about article')}
      hasFeedback
    />
  );
});

export default ArticleRating;
