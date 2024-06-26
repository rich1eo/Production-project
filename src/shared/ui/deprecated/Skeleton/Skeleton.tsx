import { CSSProperties, memo } from 'react';

import { classNames } from '@/shared/lib';

import * as styles from './Skeleton.module.scss';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  border?: string;
}

/**
 * @deprecated
 */
export const Skeleton = memo((props: SkeletonProps) => {
  const { className, width, height, border } = props;

  const style: CSSProperties = {
    width,
    height,
    borderRadius: border,
  };

  return (
    <div
      className={classNames(styles.Skeleton, {}, [className])}
      style={style}
    />
  );
});
