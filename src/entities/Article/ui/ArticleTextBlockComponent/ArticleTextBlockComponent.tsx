import { memo } from 'react';

import { classNames } from '@/shared/lib';
import { Text, TextRedesigned } from '@/shared/ui';
import type { ArticleTextBlock } from '../../model/types/article';

import * as styles from './ArticleTextBlockComponent.module.scss';
import { ToggleFeature } from '@/shared/lib/features';

interface ArticleTextBlockComponentProps {
  block: ArticleTextBlock;
  className?: string;
}

export const ArticleTextBlockComponent = memo(
  ({ className, block }: ArticleTextBlockComponentProps) => {
    return (
      <div className={classNames('', {}, [className])}>
        {block.title && (
          <ToggleFeature
            name="isAppRedesigned"
            on={<TextRedesigned title={block.title} className={styles.title} />}
            off={<Text title={block.title} className={styles.title} />}
          />
        )}
        {block.paragraphs.length &&
          block.paragraphs.map((paragraph, index) => (
            <ToggleFeature
              name="isAppRedesigned"
              key={index}
              on={
                <TextRedesigned text={paragraph} className={styles.paragraph} />
              }
              off={<Text text={paragraph} className={styles.paragraph} />}
            />
          ))}
      </div>
    );
  },
);
