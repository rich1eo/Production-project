import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

export default function ForbiddenPage() {
  const { t } = useTranslation('forbidden');

  return <Page data-testid="ForbiddenPage">{t('Forbidden page')}</Page>;
}
