import { useTranslation } from 'react-i18next';

import styles from './LangSwitcher.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';

interface LangSwitcherProps {
  className?: string;
}

export default function LangSwitcher({ className }: LangSwitcherProps) {
  const { t, i18n } = useTranslation();

  function handleToggle() {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  }

  return (
    <Button
      className={classNames(styles.LangSwitcher, {}, [className])}
      theme={ThemeButton.CLEAR}
      onClick={handleToggle}
    >
      {t('Language')}
    </Button>
  );
}
