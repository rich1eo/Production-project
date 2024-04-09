import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib';
import { Button } from '@/shared/ui';

import * as styles from './PageError.module.scss';

interface PageErrorProps {
  className?: string;
}

export default function PageError({ className }: PageErrorProps) {
  const { t } = useTranslation();

  function reloadPage() {
    location.reload();
  }

  return (
    <div className={classNames(styles.PageError, {}, [className])}>
      <p>{t('Something went wrong')}</p>
      <Button onClick={reloadPage}>{t('Reload page')}</Button>
    </div>
  );
}
