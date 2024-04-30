import { classNames } from '@/shared/lib';
import {
  Card as CardDeprecated,
  SkeletonRedesigned,
  Skeleton as SkeletonDeprecated,
  CardRedesigned,
} from '@/shared/ui';
import { toggleFeature } from '@/shared/lib/features';

import { ArticleListView } from '../../model/consts/consts';

import * as styles from './ArticleListItem.module.scss';

interface ArticleListItemSkeletonProps {
  view: ArticleListView;
  className?: string;
}

export const ArticleListItemSkeleton = (
  props: ArticleListItemSkeletonProps,
) => {
  const { className, view } = props;

  const Skeleton = toggleFeature({
    name: 'isAppRedesigned',
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated,
  });

  const Card = toggleFeature({
    name: 'isAppRedesigned',
    on: () => CardRedesigned,
    off: () => CardDeprecated,
  });

  const mainClass = toggleFeature({
    name: 'isAppRedesigned',
    on: () => styles.ArticleListItemSkeletonRedesigned,
    off: () => '',
  });

  if (view === ArticleListView.BIG) {
    return (
      <div className={classNames(mainClass, {}, [className, styles[view]])}>
        <Card cardPadding="24" max>
          <div className={styles.header}>
            <Skeleton border="50%" height={30} width={30} />
            <Skeleton width={150} height={16} className={styles.username} />
            <Skeleton width={150} height={16} className={styles.date} />
          </div>
          <Skeleton width={250} height={24} className={styles.title} />
          <Skeleton height={420} className={styles.img} />
          <div className={styles.footer}>
            <Skeleton height={36} width={200} />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={classNames(mainClass, {}, [className, styles[view]])}>
      <Card className={styles.card}>
        <div>
          <Skeleton width="100%" height={200} className={styles.img} />
        </div>
        <div className={styles.infoWrapper}>
          <Skeleton width={130} height={16} />
        </div>
        <Skeleton width={150} height={16} className={styles.title} />
      </Card>
    </div>
  );
};
