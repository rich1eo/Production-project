import { memo } from 'react';

import { classNames } from '@/shared/lib';
import { Code } from '@/shared/ui';

import { ArticleCodeBlock } from '../../model/types/article';

interface ArticleCodeBlockComponentProps {
  block: ArticleCodeBlock;
  className?: string;
}

export const ArticleCodeBlockComponent = memo(
  ({ className, block }: ArticleCodeBlockComponentProps) => {
    return (
      <div className={classNames('', {}, [className])}>
        <Code text={block.code} />
      </div>
    );
  }
);
