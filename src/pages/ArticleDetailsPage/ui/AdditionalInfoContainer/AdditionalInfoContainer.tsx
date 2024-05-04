import { useSelector } from 'react-redux';

import { getArticleDetailsData } from '@/entities/Article';
import { CardRedesigned } from '@/shared/ui';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';

import * as styles from './AdditionalInfoContainer.module.scss';
import { useNavigate } from 'react-router-dom';
import { getRouteArticleEdit } from '@/shared/const/router';

export const AdditionalInfoContainer = () => {
  const article = useSelector(getArticleDetailsData);

  const navigate = useNavigate();

  const handleEditArticle = () => {
    navigate(getRouteArticleEdit(article?.id || ''));
  };

  if (!article) return null;

  return (
    <CardRedesigned
      cardPadding="24"
      borderRadius="round"
      className={styles.card}
    >
      <ArticleAdditionalInfo
        author={article.user}
        createdAt={article.createdAt}
        views={article.views}
        onEdit={handleEditArticle}
      />
    </CardRedesigned>
  );
};
