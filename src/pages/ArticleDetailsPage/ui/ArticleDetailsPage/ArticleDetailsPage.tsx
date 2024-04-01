import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { ArticleDetails } from '@/entities/Article';
import { ArticleRating } from '@/features/articleRating';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { classNames } from '@/shared/lib';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib';
import { VStack } from '@/shared/ui';
import { Page } from '@/widgets/Page';

import { articleDetailsPageReducer } from '../../model/slice';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';

import styles from './ArticleDetailsPage.module.scss';
import { toggleFeature } from '@/shared/lib/features';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducerList = {
  articleDetailsPage: articleDetailsPageReducer,
};

function ArticleDetailsPage({ className }: ArticlesPageProps) {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return null;
  }

  const articleRating = toggleFeature({
    name: 'isArticleRatingEnabled',
    on: () => <ArticleRating articleId={id} />,
    off: () => null,
  });

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames('', {}, [className])}>
        <VStack gap="16" max>
          <ArticleDetailsPageHeader />
          <ArticleDetails id={id} />
          {articleRating}
          <ArticleRecommendationsList className={styles.recommendations} />
          <ArticleDetailsComments id={id} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
}

export default memo(ArticleDetailsPage);
