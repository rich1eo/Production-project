import { memo, useCallback } from 'react';
import styles from './Code.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ThemeButton } from '../Button/Button';
import CopyIcon from '@/shared/assets/icons/copy.svg';

interface CodeProps {
  text: string;
  className?: string;
}

export const Code = memo(({ text, className }: CodeProps) => {
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <pre className={classNames(styles.Code, {}, [className])}>
      <Button
        className={styles.copyBtn}
        theme={ThemeButton.CLEAR}
        onClick={handleCopy}
      >
        <CopyIcon className={styles.icon} />
      </Button>
      <code>{text}</code>
    </pre>
  );
});
