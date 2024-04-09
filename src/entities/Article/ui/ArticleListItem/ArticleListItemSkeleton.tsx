import { memo } from 'react';

import { classNames } from '@/shared/lib';
import { Card, Skeleton } from '@/shared/ui';

import { ArticleListView } from '../../model/consts/consts';

import * as styles from './ArticleListItem.module.scss';

interface ArticleListItemSkeletonProps {
  view: ArticleListView;
  className?: string;
}

export const ArticleListItemSkeleton = memo(
  (props: ArticleListItemSkeletonProps) => {
    const { className, view } = props;

    if (view === ArticleListView.BIG) {
      return (
        <div className={classNames('', {}, [className, styles[view]])}>
          <Card>
            <div className={styles.header}>
              <Skeleton border="50%" height={30} width={30} />
              <Skeleton width={150} height={16} className={styles.username} />
              <Skeleton width={150} height={16} className={styles.date} />
            </div>
            <Skeleton width={250} height={24} className={styles.title} />
            <Skeleton height={200} className={styles.img} />
            <div className={styles.footer}>
              <Skeleton height={36} width={200} />
            </div>
          </Card>
        </div>
      );
    }

    return (
      <div className={classNames('', {}, [className, styles[view]])}>
        <Card>
          <div>
            <Skeleton width={200} height={200} className={styles.img} />
          </div>
          <div className={styles.infoWrapper}>
            <Skeleton width={130} height={16} />
          </div>
          <Skeleton width={150} height={16} className={styles.title} />
        </Card>
      </div>
    );
  },
);
