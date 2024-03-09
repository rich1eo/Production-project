import { CSSProperties, memo, useMemo } from 'react';

import { classNames } from '@/shared/lib';
import UserIcon from '@/shared/assets/icons/user-avatar.svg';
import { AppImage } from '../AppImage';

import styles from './Avatar.module.scss';
import { Skeleton } from '..';

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
}

export const Avatar = memo((props: AvatarProps) => {
  const { className, src, size = 100, alt } = props;
  const sizes = useMemo<CSSProperties>(() => {
    return {
      width: size,
      height: size,
    };
  }, [size]);

  const loadingFallback = <Skeleton width={size} height={size} border="50%" />;
  const errorFallback = (
    <UserIcon fill="var(--primary-color)" width={size} height={size} />
  );

  return (
    <AppImage
      src={src}
      alt={alt}
      style={sizes}
      className={classNames(styles.Avatar, {}, [className])}
      fallback={loadingFallback}
      errorFallback={errorFallback}
    />
  );
});
