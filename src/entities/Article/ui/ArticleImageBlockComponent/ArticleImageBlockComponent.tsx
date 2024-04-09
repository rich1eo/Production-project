import { memo } from 'react';

import { classNames } from '@/shared/lib';
import { Text, TextAlign } from '@/shared/ui';

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
        {block.title && <Text text={block.title} align={TextAlign.CENTER} />}
      </div>
    );
  },
);
