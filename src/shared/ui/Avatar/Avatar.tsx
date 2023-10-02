import { CSSProperties, useMemo } from 'react';
import styles from './Avatar.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

interface AvatarProps {
  className?: string;
  src: string;
  size?: number;
  alt?: string;
}

export default function Avatar({ className, src, size, alt }: AvatarProps) {
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
}
