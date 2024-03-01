import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui';

// Компонент для тестирования ErrorBoundary
export default function BugButton() {
  const [error, setError] = useState(false);
  const { t } = useTranslation();

  function handleThrowError() {
    setError((state) => !state);
  }

  useEffect(() => {
    if (error) {
      throw new Error();
    }
  }, [error]);

  return <Button onClick={handleThrowError}>{t('Throw Error')}</Button>;
}
