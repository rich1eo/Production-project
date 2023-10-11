import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';

interface ArticlesPageProps {
  className?: string;
}

function ArticlesPage({ className }: ArticlesPageProps) {
  const { t } = useTranslation();

  return (
    <div className={classNames('', {}, [className])}>{t('Articles Page')}</div>
  );
}

export default memo(ArticlesPage);
