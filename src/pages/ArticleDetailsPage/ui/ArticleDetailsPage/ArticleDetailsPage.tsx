import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleDetails } from 'entities/Article';

import DynamicModuleLoader, {
  ReducerList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { VStack } from 'shared/ui/Stack';
import { articleDetailsPageReducer } from '../../model/slice';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ArticleRecommendationsList } from 'features/articleRecommendationsList';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { Page } from 'widgets/Page/Page';

import styles from './ArticleDetailsPage.module.scss';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducerList = {
  articleDetailsPage: articleDetailsPageReducer,
};

function ArticleDetailsPage({ className }: ArticlesPageProps) {
  const { id } = useParams<{ id: string }>();

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames('', {}, [className])}>
        <VStack gap="16" max>
          <ArticleDetailsPageHeader />
          <ArticleDetails id={id} />
          <ArticleRecommendationsList className={styles.recommendations} />
          <ArticleDetailsComments id={id} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
}

export default memo(ArticleDetailsPage);
