import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import Text from '@/shared/ui/Text/Text';
import type { ArticleTextBlock } from '@/entities/Article';

import styles from './ArticleTextBlockComponent.module.scss';

interface ArticleTextBlockComponentProps {
  block: ArticleTextBlock;
  className?: string;
}

export const ArticleTextBlockComponent = memo(
  ({ className, block }: ArticleTextBlockComponentProps) => {
    return (
      <div
        className={classNames(styles.ArticleTextBlockComponent, {}, [
          className,
        ])}
      >
        {block.title && <Text title={block.title} className={styles.title} />}
        {block.paragraphs.length &&
          block.paragraphs.map((paragraph, index) => (
            <Text key={index} text={paragraph} className={styles.paragraph} />
          ))}
      </div>
    );
  }
);
