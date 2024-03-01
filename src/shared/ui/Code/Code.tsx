import { memo, useCallback } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import CopyIcon from '@/shared/assets/icons/copy.svg';

import { Button, ButtonTheme } from '../Button/Button';

import styles from './Code.module.scss';

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
        theme={ButtonTheme.CLEAR}
        onClick={handleCopy}
      >
        <CopyIcon className={styles.icon} />
      </Button>
      <code>{text}</code>
    </pre>
  );
});
