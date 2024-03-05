import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, HStack } from '@/shared/ui';
import { getArticleDetailsData } from '@/entities/Article';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router';

import { getCanEditArticle } from '../../model/selectors/article';

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader = memo(
  (props: ArticleDetailsPageHeaderProps) => {
    const { className } = props;

    const navigate = useNavigate();
    const { t } = useTranslation('article-details');
    const article = useSelector(getArticleDetailsData);
    const canEdit = useSelector(getCanEditArticle);

    const handleBackToList = useCallback(() => {
      navigate(getRouteArticles());
    }, [navigate]);

    const handleEditArticle = useCallback(() => {
      navigate(getRouteArticleEdit(article?.id || ''));
    }, [article?.id, navigate]);

    return (
      <HStack max justify="between" className={classNames('', {}, [className])}>
        <Button onClick={handleBackToList}>{t('Back to articles')}</Button>
        {canEdit && <Button onClick={handleEditArticle}>{t('Edit')}</Button>}
      </HStack>
    );
  }
);
