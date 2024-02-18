import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page/Page';

export default function ForbiddenPage() {
  const { t } = useTranslation('forbidden');

  return <Page>{t('Forbidden page')}</Page>;
}
