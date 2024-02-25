import { useTranslation } from 'react-i18next';
import styles from './NotFoundPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';

interface NotFoundPageProps {
  className?: string;
}

export function NotFoundPage({ className }: NotFoundPageProps) {
  const { t } = useTranslation();

  return (
    <Page className={classNames(styles.NotFoundPage, {}, [className])}>
      {t('Page not found')}
    </Page>
  );
}
