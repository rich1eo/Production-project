import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

export default function AdminPanelPage() {
  const { t } = useTranslation('admin-panel');

  return <Page data-testid="AdminPanelPage">{t('Admin panel')}</Page>;
}
