/* eslint-disable indent */
import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { DynamicModuleLoader, ReducerList, classNames } from '@/shared/lib';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  Text,
  TextAlign,
  TextSize,
  Skeleton,
  Avatar,
  HStack,
  VStack,
} from '@/shared/ui';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import CalendarIcon from '@/shared/assets/icons/calendar.svg';

import * as selectors from '../../model/selectors/getArticleDetails';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { ArticleBlock } from '../../model/types/article';
import { ArticleBlockType } from '../../model/consts/consts';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

import styles from './ArticleDetails.module.scss';

interface ArticleDetailsProps {
  id?: string;
  className?: string;
}

const reducers: ReducerList = {
  articleDetails: articleDetailsReducer,
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

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
      case ArticleBlockType.CODE:
        return (
          <ArticleCodeBlockComponent
            className={styles.block}
            key={block.id}
            block={block}
          />
        );
      case ArticleBlockType.IMG:
        return (
          <ArticleImageBlockComponent
            className={styles.block}
            key={block.id}
            block={block}
          />
        );
      case ArticleBlockType.TEXT:
        return (
          <ArticleTextBlockComponent
            className={styles.block}
            key={block.id}
            block={block}
          />
        );
    }
  }, []);

  let content;

  if (isLoading) {
    content = (
      <>
        <Skeleton
          className={styles.avatar}
          width={200}
          height={200}
          border="50%"
        />
        <Skeleton className={styles.title} width={300} height={32} />
        <Skeleton className={styles.skeleton} width={600} height={24} />
        <Skeleton className={styles.skeleton} width="100%" height={200} />
        <Skeleton className={styles.skeleton} width="100%" height={200} />
      </>
    );
  } else if (error) {
    content = <Text title={t('Article not found')} align={TextAlign.CENTER} />;
  } else if (data) {
    content = (
      <>
        <HStack justify="center" max>
          <Avatar size={200} src={data.img} className={styles.avatar} />
        </HStack>
        <VStack gap="4" max>
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
          <HStack gap="8" className={styles.articleInfo}>
            <CalendarIcon className={styles.icon} />
            {<Text text={data.createdAt} />}
          </HStack>
        </VStack>
        {data.blocks.map((block) => renderBlock(block))}
      </>
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
