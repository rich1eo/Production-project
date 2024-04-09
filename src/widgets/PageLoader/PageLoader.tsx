import { classNames } from '@/shared/lib';
import { Loader } from '@/shared/ui';

import * as styles from './PageLoader.module.scss';

interface PageLoaderProps {
  className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => {
  return (
    <div className={classNames(styles.PageLoader, {}, [className])}>
      <Loader />
    </div>
  );
};
