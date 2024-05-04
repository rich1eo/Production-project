import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ArticleDetails } from '@/entities/Article';
import { ArticleRating } from '@/features/articleRating';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { classNames } from '@/shared/lib';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib';
import { Card, VStack } from '@/shared/ui';
import { Page } from '@/widgets/Page';
import { ToggleFeature } from '@/shared/lib/features';
import { StickyLayout } from '@/shared/layouts';

import { articleDetailsPageReducer } from '../../model/slice';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { DetailsContainer } from '../DetailsContainer';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer';

import * as styles from './ArticleDetailsPage.module.scss';

const reducers: ReducerList = {
  articleDetailsPage: articleDetailsPageReducer,
};

interface ArticlesPageProps {
  className?: string;
}

function ArticleDetailsPage({ className }: ArticlesPageProps) {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation('article-details');

  if (!id) {
    return null;
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <ToggleFeature
        name="isAppRedesigned"
        on={
          <StickyLayout
            right={<AdditionalInfoContainer />}
            content={
              <Page className={classNames('', {}, [className])}>
                <VStack gap="16" max>
                  <DetailsContainer />
                  <ArticleRating articleId={id} />
                  <ArticleRecommendationsList
                    className={styles.recommendations}
                  />
                  <ArticleDetailsComments id={id} />
                </VStack>
              </Page>
            }
          />
        }
        off={
          <Page className={classNames('', {}, [className])}>
            <VStack gap="16" max>
              <ArticleDetailsPageHeader />
              <ArticleDetails id={id} />
              <ToggleFeature
                name="isArticleRatingEnabled"
                on={<ArticleRating articleId={id} />}
                off={
                  <Card>{t('article.details.rating.card.not.available')}</Card>
                }
              />
              <ArticleRecommendationsList className={styles.recommendations} />
              <ArticleDetailsComments id={id} />
            </VStack>
          </Page>
        }
      />
    </DynamicModuleLoader>
  );
}

export default memo(ArticleDetailsPage);
