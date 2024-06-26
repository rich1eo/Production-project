import { CSSProperties, memo, useMemo } from 'react';

import { classNames } from '@/shared/lib';
import UserIcon from '@/shared/assets/icons/avatar.svg';
import { AppImage } from '../../redesigned/AppImage';

import * as styles from './Avatar.module.scss';
import { Skeleton } from '../Skeleton';

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
}

/**
 * @deprecated
 */
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
