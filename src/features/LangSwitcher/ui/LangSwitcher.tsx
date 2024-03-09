import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib';
import { Button, ButtonTheme } from '@/shared/ui';

interface LangSwitcherProps {
  className?: string;
  short?: boolean;
}

const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation();

  function handleToggle() {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  }

  return (
    <Button
      className={classNames('', {}, [className])}
      theme={ButtonTheme.CLEAR_INVERTED}
      onClick={handleToggle}
    >
      {t(short ? 'Short lang' : 'Language')}
    </Button>
  );
});

export default LangSwitcher;
