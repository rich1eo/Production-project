import { CSSProperties, memo } from 'react';
import styles from './Skeleton.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  border?: string;
}

function Skeleton(props: SkeletonProps) {
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
}

export default memo(Skeleton);
