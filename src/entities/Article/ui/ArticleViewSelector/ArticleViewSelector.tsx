import { ArticleListView } from 'entities/Article/model/types/article';
import styles from './ArticleViewSelector.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import ListIcon from 'shared/assets/icons/burger.svg';
import WindowIcon from 'shared/assets/icons/window.svg';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { memo } from 'react';

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleListView;
  onViewClick?: (view: ArticleListView) => void;
}

const viewTypes = [
  {
    view: ArticleListView.BIG,
    icon: <ListIcon className={styles.icon} />,
  },
  {
    view: ArticleListView.SMALL,
    icon: <WindowIcon className={styles.icon} />,
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
            theme={ThemeButton.CLEAR}
            onClick={handleClick(viewType.view)}
            className={classNames(
              '',
              { [styles.notSelected]: view !== viewType.view },
              []
            )}
          >
            {viewType.icon}
          </Button>
        ))}
      </div>
    );
  }
);
