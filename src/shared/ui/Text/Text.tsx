import { memo } from 'react';
import styles from './Text.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

export enum TextTheme {
  PRIMARY = 'primary',
  ERROR = 'error',
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
}

const Text = memo((props: TextProps) => {
  const { className, title, text, theme = TextTheme.PRIMARY } = props;

  return (
    <div
      className={classNames(styles.Text, { [styles[theme]]: theme }, [
        className,
      ])}
    >
      {title && <p className={styles.title}>{title}</p>}
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
});

export default Text;
