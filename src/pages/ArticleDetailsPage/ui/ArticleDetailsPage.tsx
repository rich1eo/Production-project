import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './ArticleDetailsPage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleDetails } from 'entities/Article';
import Text, { TextTheme } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment';
import DynamicModuleLoader, {
  ReducerList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  articleDetailsCommentsReducer,
  getArticleComments,
} from '../model/slice/articleDetailsCommentsSlice';
import { getArticleCommentsIsLoading } from '../model/selectors/comments';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { AddCommentForm } from 'features/addCommentForm';
import { addCommentForArticle } from '../model/services/addCommentForArticle/addCommentForArticle';
import { Button } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Page } from 'shared/ui/Page/Page';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducerList = {
  articleDetailsComments: articleDetailsCommentsReducer,
};

function ArticleDetailsPage({ className }: ArticlesPageProps) {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation('article-details');
  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  });

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text));
    },
    [dispatch]
  );

  const handleBackToList = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);

  if (!id) {
    return (
      <Page className={classNames('', {}, [className])}>
        <Text title={t('Article not found')} theme={TextTheme.ERROR} />
      </Page>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames('', {}, [className])}>
        <Button onClick={handleBackToList}>{t('Back to articles')}</Button>
        <ArticleDetails id={id} />
        <Text className={styles.commentTitle} title={t('Comments')} />
        <AddCommentForm onSendComment={onSendComment} />
        <CommentList isLoading={commentsIsLoading} comments={comments} />
      </Page>
    </DynamicModuleLoader>
  );
}

export default memo(ArticleDetailsPage);
