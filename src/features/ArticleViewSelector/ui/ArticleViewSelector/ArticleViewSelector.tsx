import { memo } from 'react';

import { classNames } from '@/shared/lib';
import ListIcon from '@/shared/assets/icons/burger.svg';
import WindowIcon from '@/shared/assets/icons/window.svg';
import { Button, ButtonTheme } from '@/shared/ui';

import styles from './ArticleViewSelector.module.scss';
import { ArticleListView } from '@/entities/Article';

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleListView;
  onViewClick?: (view: ArticleListView) => void;
}

const viewTypes = [
  {
    view: ArticleListView.BIG,
    icon: <ListIcon className={styles.icon} width={24} height={24} />,
  },
  {
    view: ArticleListView.SMALL,
    icon: <WindowIcon className={styles.icon} width={24} height={24} />,
  },
];

export const ArticleViewSelector = memo(
  ({ className, view, onViewClick }: ArticleViewSelectorProps) => {
    const handleClick = (newView: ArticleListView) => () => {
      onViewClick?.(newView);
    };

    return (
      <div className={classNames(styles.ArticleViewSelector, {}, [className])}>
        {viewTypes.map((viewType) => (
          <Button
            key={viewType.view}
            theme={ButtonTheme.CLEAR}
            onClick={handleClick(viewType.view)}
            className={classNames(
              '',
              { [styles.notSelected]: view !== viewType.view },
              [],
            )}
          >
            {viewType.icon}
          </Button>
        ))}
      </div>
    );
  },
);
