import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib';
import { TextRedesigned, VStack } from '@/shared/ui';
import { Page } from '@/widgets/Page';
import { UiDesignSwitcher } from '@/features/uiDesignSwitcher';

interface SettingsPageProps {
  className?: string;
}

const SettingsPage = (props: SettingsPageProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <Page className={classNames('', {}, [className])}>
      <VStack gap="16">
        <TextRedesigned title={t('Settings')} />
        <UiDesignSwitcher />
      </VStack>
    </Page>
  );
};

export default SettingsPage;
