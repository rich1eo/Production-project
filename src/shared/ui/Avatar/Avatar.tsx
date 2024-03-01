import { CSSProperties, memo, useMemo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import styles from './Avatar.module.scss';

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
}

export const Avatar = memo(({ className, src, size, alt }: AvatarProps) => {
  const sizes = useMemo<CSSProperties>(() => {
    return {
      width: size || 100,
      height: size || 100,
    };
  }, [size]);

  return (
    <img
      style={sizes}
      alt={alt}
      className={classNames(styles.Avatar, {}, [className])}
      src={src}
    />
  );
});
