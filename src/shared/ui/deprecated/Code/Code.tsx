import { memo, useCallback } from 'react';

import { classNames } from '@/shared/lib';
import CopyIcon from '@/shared/assets/icons/copy-20-20.svg';

import { Button, ButtonTheme } from '../Button/Button';

import styles from './Code.module.scss';

interface CodeProps {
  text: string;
  className?: string;
}

/**
 * @deprecated
 */
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
