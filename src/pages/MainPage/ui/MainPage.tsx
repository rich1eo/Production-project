import { useTranslation } from 'react-i18next';

import { RatingCard } from '@/entities/Rating';
import { Page } from '@/widgets/Page/Page';

export default function MainPage() {
  const { t } = useTranslation('main');

  return (
    <Page>
      <p>{t('Main page')}</p>
      <RatingCard
        title="Как вам статья?"
        feedbackTitle="Оставьте отзыв о статье"
        hasFeedback
      />
    </Page>
  );
}
