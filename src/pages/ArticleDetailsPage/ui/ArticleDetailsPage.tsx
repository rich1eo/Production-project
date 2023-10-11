import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Text, { TextTheme } from 'shared/ui/Text/Text';

interface ArticlesPageProps {
  className?: string;
}

function ArticleDetailsPage({ className }: ArticlesPageProps) {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation('article-details');

  if (!id) {
    return (
      <div className={classNames('', {}, [className])}>
        <Text title={t('Article not found')} theme={TextTheme.ERROR} />
      </div>
    );
  }

  return (
    <div className={classNames('', {}, [className])}>
      <ArticleDetails id={id} />
    </div>
  );
}

export default memo(ArticleDetailsPage);
