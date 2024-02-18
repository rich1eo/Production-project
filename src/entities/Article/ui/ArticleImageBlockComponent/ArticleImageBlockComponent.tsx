import styles from './ArticleImageBlockComponent.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleImgBlock } from '../../model/types/article';
import Text, { TextAlign } from '@/shared/ui/Text/Text';
import { memo } from 'react';

interface ArticleImageBlockComponentProps {
  block: ArticleImgBlock;
  className?: string;
}

export const ArticleImageBlockComponent = memo(
  ({ className, block }: ArticleImageBlockComponentProps) => {
    return (
      <div
        className={classNames(styles.ArticleImageBlockComponent, {}, [
          className,
        ])}
      >
        <img className={styles.img} src={block.src} alt={block.title} />
        {block.title && <Text text={block.title} align={TextAlign.CENTER} />}
      </div>
    );
  }
);
