import styles from './PageLoader.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import Loader from '@/shared/ui/Loader/Loader';

interface PageLoaderProps {
  className?: string;
}

export default function PageLoader({ className }: PageLoaderProps) {
  return (
    <div className={classNames(styles.PageLoader, {}, [className])}>
      <Loader />
    </div>
  );
}
