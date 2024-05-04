import { classNames } from '@/shared/lib';
import { Code } from '@/shared/ui';

import { ArticleCodeBlock } from '../../model/types/article';

type ArticleCodeBlockComponentProps = {
  block: ArticleCodeBlock;
  className?: string;
};

export const ArticleCodeBlockComponent = (
  props: ArticleCodeBlockComponentProps,
) => {
  const { className, block } = props;

  return (
    <div className={classNames('', {}, [className])}>
      <Code text={block.code} />
    </div>
  );
};
