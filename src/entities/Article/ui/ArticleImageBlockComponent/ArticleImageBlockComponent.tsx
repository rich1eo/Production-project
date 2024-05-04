import { memo } from 'react';

import { classNames } from '@/shared/lib';
import { Text, TextAlign, TextRedesigned } from '@/shared/ui';
import { ToggleFeature } from '@/shared/lib/features';

import { ArticleImgBlock } from '../../model/types/article';

import * as styles from './ArticleImageBlockComponent.module.scss';

interface ArticleImageBlockComponentProps {
  block: ArticleImgBlock;
  className?: string;
}

export const ArticleImageBlockComponent = memo(
  ({ className, block }: ArticleImageBlockComponentProps) => {
    return (
      <div className={classNames('', {}, [className])}>
        <img className={styles.img} src={block.src} alt={block.title} />
        {block.title && (
          <ToggleFeature
            name="isAppRedesigned"
            on={<TextRedesigned text={block.title} align="center" />}
            off={<Text text={block.title} align={TextAlign.CENTER} />}
          />
        )}
      </div>
    );
  },
);
