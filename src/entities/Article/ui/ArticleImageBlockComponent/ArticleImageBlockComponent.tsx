import styles from './ArticleImageBlockComponent.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleImgBlock } from '../../model/types/article';
import Text, { TextAlign } from 'shared/ui/Text/Text';

interface ArticleImageBlockComponentProps {
  block: ArticleImgBlock;
  className?: string;
}

export default function ArticleImageBlockComponent({
  className,
  block,
}: ArticleImageBlockComponentProps) {
  return (
    <div
      className={classNames(styles.ArticleImageBlockComponent, {}, [className])}
    >
      <img className={styles.img} src={block.src} alt={block.title} />
      {block.title && <Text text={block.title} align={TextAlign.CENTER} />}
    </div>
  );
}
