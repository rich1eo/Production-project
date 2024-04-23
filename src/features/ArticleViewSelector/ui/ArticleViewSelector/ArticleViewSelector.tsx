import { memo } from 'react';

import { classNames } from '@/shared/lib';
import { Button, ButtonTheme, CardRedesigned, HStack, Icon } from '@/shared/ui';
import { ArticleListView } from '@/entities/Article';
import ListIconDeprecated from '@/shared/assets/icons/list-24-24.svg';
import WindowIconDeprecated from '@/shared/assets/icons/tiled-24-24.svg';
import ListIcon from '@/shared/assets/icons/burger.svg';
import WindowIcon from '@/shared/assets/icons/tile.svg';

import * as styles from './ArticleViewSelector.module.scss';
import { ToggleFeature, toggleFeature } from '@/shared/lib/features';

const viewTypes = [
  {
    view: ArticleListView.BIG,
    icon: toggleFeature({
      name: 'isAppRedesigned',
      on: () => ListIcon,
      off: () => ListIconDeprecated,
    }),
  },
  {
    view: ArticleListView.SMALL,
    icon: toggleFeature({
      name: 'isAppRedesigned',
      on: () => WindowIcon,
      off: () => WindowIconDeprecated,
    }),
  },
];

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleListView;
  onViewClick?: (view: ArticleListView) => void;
}

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  const { className, view, onViewClick } = props;

  const handleClick = (newView: ArticleListView) => () => {
    onViewClick?.(newView);
  };

  return (
    <ToggleFeature
      name="isAppRedesigned"
      on={
        <CardRedesigned
          className={classNames(styles.ArticleViewSelectorRedesigned, {}, [
            className,
          ])}
          borderRadius="round"
        >
          <HStack gap="8">
            {viewTypes.map((viewType) => (
              <Icon
                key={viewType.view}
                Svg={viewType.icon}
                clickable
                onClick={handleClick(viewType.view)}
                className={classNames('', {
                  [styles.notSelected]: view !== viewType.view,
                })}
              />
            ))}
          </HStack>
        </CardRedesigned>
      }
      off={
        <div className={classNames('', {}, [className])}>
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
              <Icon Svg={viewType.icon} width={24} height={24} />
            </Button>
          ))}
        </div>
      }
    />
  );
});
