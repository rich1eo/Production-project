import { memo } from 'react';
import styles from './ArticleTextBlockComponent.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleTextBlock } from '@/entities/Article/model/types/article';
import Text from '@/shared/ui/Text/Text';

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
