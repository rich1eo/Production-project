import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { List, ListRowProps, WindowScroller } from 'react-virtualized';

import cls from './ArticleList.module.scss';

import { classNames } from 'shared/lib/classNames/classNames';
import Text, { TextSize } from 'shared/ui/Text/Text';
import { PAGE_ID } from 'widgets/Page/Page';

import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { Article, ArticleListView } from '../../model/types/article';

interface ArticleListProps {
  articles: Article[];
  className?: string;
  isLoading?: boolean;
  view?: ArticleListView;
  target?: HTMLAttributeAnchorTarget;
  virtualized?: boolean;
}

const getSkeletons = (view: ArticleListView) =>
  new Array(view === ArticleListView.SMALL ? 9 : 3)
    .fill(0)
    .map((item, index) => (
      <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
    ));

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    view = ArticleListView.SMALL,
    isLoading,
    target,
    virtualized = true,
  } = props;
  const { t } = useTranslation();

  const isBig = view === ArticleListView.BIG;

  const itemsPerRow = isBig ? 1 : 3;
  const rowCount = isBig
    ? articles.length
    : Math.ceil(articles.length / itemsPerRow);

  const rowRender = ({ index, key, style }: ListRowProps) => {
    const items = [];
    const fromIndex = index * itemsPerRow;
    const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);

    for (let i = fromIndex; i < toIndex; i += 1) {
      items.push(
        <ArticleListItem
          article={articles[i]}
          view={view}
          target={target}
          key={`str${i}`}
          className={cls.card}
        />
      );
    }

    return (
      <div key={key} style={style} className={cls.row}>
        {items}
      </div>
    );
  };

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        <Text size={TextSize.L} title={t('Articles not found')} />
      </div>
    );
  }

  return (
    <WindowScroller scrollElement={document.getElementById(PAGE_ID) as Element}>
      {({
        height,
        width,
        registerChild,
        onChildScroll,
        isScrolling,
        scrollTop,
      }) => (
        <div
          // @ts-ignore
          ref={registerChild}
          className={classNames(cls.ArticleList, {}, [className, cls[view]])}
        >
          {virtualized ? (
            <List
              height={height ?? 700}
              rowCount={rowCount}
              rowHeight={isBig ? 700 : 330}
              rowRenderer={rowRender}
              width={width ? width - 80 : 700}
              autoHeight
              onScroll={onChildScroll}
              isScrolling={isScrolling}
              scrollTop={scrollTop}
            />
          ) : (
            articles.map((article) => (
              <ArticleListItem key={article.id} article={article} view={view} />
            ))
          )}
          {isLoading && getSkeletons(view)}
        </div>
      )}
    </WindowScroller>
  );
});
