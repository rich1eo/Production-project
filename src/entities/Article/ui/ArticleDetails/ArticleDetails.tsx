import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { DynamicModuleLoader, ReducerList, classNames } from '@/shared/lib';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  Text,
  TextAlign,
  TextSize,
  Skeleton as SkeletonDeprecated,
  Avatar,
  HStack,
  VStack,
  TextRedesigned,
  AppImage,
  SkeletonRedesigned,
} from '@/shared/ui';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg';

import * as selectors from '../../model/selectors/getArticleDetails';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';

import { renderArticleBlock } from './renderArticleBlock';

import * as styles from './ArticleDetails.module.scss';
import { ToggleFeature, toggleFeature } from '@/shared/lib/features';

interface ArticleDetailsProps {
  id?: string;
  className?: string;
}

const reducers: ReducerList = {
  articleDetails: articleDetailsReducer,
};

const Deprecated = () => {
  const data = selectors.useArticleDetailsData();

  if (!data) return;

  return (
    <>
      <HStack justify="center" max>
        <Avatar size={200} src={data.img} />
      </HStack>
      <VStack gap="4" max data-testid="ArticleDetails.Info">
        <Text
          className={styles.title}
          title={data?.title}
          text={data.subtitle}
          size={TextSize.L}
        />
        <HStack gap="8">
          <EyeIcon className={styles.icon} />
          {<Text text={data.views.toString()} />}
        </HStack>
        <HStack gap="8">
          <CalendarIcon className={styles.icon} />
          {<Text text={data.createdAt} />}
        </HStack>
      </VStack>
      {data.blocks.map((block) => renderArticleBlock(block))}
    </>
  );
};

const Redesigned = () => {
  const article = selectors.useArticleDetailsData();

  if (!article) return;

  return (
    <>
      <TextRedesigned title={article.title} size={'l'} bold />
      <TextRedesigned title={article.subtitle} />
      <AppImage
        fallback={
          <SkeletonRedesigned width="100%" height={420} border="16px" />
        }
        src={article.img}
        className={styles.img}
      />
      {article.blocks.map((block) => renderArticleBlock(block))}
    </>
  );
};

export const ArticleDetails = memo(({ id, className }: ArticleDetailsProps) => {
  const { t } = useTranslation('article-details');
  const dispatch = useAppDispatch();
  const isLoading = selectors.useArticleDetailsIsLoading();
  const error = selectors.useArticleDetailsError();
  const data = selectors.useArticleDetailsData();

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id]);

  let content;

  if (isLoading) {
    const Skeleton = toggleFeature({
      name: 'isAppRedesigned',
      on: () => SkeletonRedesigned,
      off: () => SkeletonDeprecated,
    });

    content = (
      <>
        <Skeleton width={200} height={200} border="50%" />
        <Skeleton className={styles.title} width={300} height={32} />
        <Skeleton className={styles.skeleton} width={600} height={24} />
        <Skeleton className={styles.skeleton} width="100%" height={200} />
        <Skeleton className={styles.skeleton} width="100%" height={200} />
      </>
    );
  } else if (error) {
    content = (
      <ToggleFeature
        name="isAppRedesigned"
        on={<TextRedesigned title={t('Article not found')} align="center" />}
        off={<Text title={t('Article not found')} align={TextAlign.CENTER} />}
      />
    );
  } else if (data) {
    content = (
      <ToggleFeature
        name="isAppRedesigned"
        on={<Redesigned />}
        off={<Deprecated />}
      />
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <VStack
        gap="16"
        className={classNames(styles.ArticleDetails, {}, [className])}
      >
        {content}
      </VStack>
    </DynamicModuleLoader>
  );
});
