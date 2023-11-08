import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import styles from './ArticleDetailsPageHeader.module.scss';

import { classNames } from 'shared/lib/classNames/classNames';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Button } from 'shared/ui/Button/Button';
import { getCanEditArticle } from 'pages/ArticleDetailsPage/model/selectors/article';
import { getArticleDetailsData } from 'entities/Article';

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
      navigate(RoutePath.articles);
    }, [navigate]);

    const handleEditArticle = useCallback(() => {
      navigate(`${RoutePath.articles}/${article?.id}/edit`);
    }, [article?.id, navigate]);

    return (
      <div
        className={classNames(styles.ArticleDetailsPageHeader, {}, [className])}
      >
        <Button onClick={handleBackToList}>{t('Back to articles')}</Button>
        {canEdit && (
          <Button onClick={handleEditArticle} className={styles.editBtn}>
            {t('Edit')}
          </Button>
        )}
      </div>
    );
  }
);
