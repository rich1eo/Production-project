import { HStack, SkeletonRedesigned, VStack } from '@/shared/ui';
import { MainLayout } from '../MainLayout';

import * as styles from './AppLoaderLayout.module.scss';

export const AppLoaderLayout = () => {
  return (
    <MainLayout
      header={
        <HStack className={styles.header}>
          <SkeletonRedesigned width={40} height={40} border="50%" />
        </HStack>
      }
      content={
        <VStack gap="16" style={{ height: '100%' }}>
          <SkeletonRedesigned width="70%" height={32} border="16px" />
          <SkeletonRedesigned width="40%" height={20} border="16px" />
          <SkeletonRedesigned width="50%" height={20} border="16px" />
          <SkeletonRedesigned width="30%" height={32} border="16px" />
          <SkeletonRedesigned width="80%" height="40%" border="16px" />
          <SkeletonRedesigned width="80%" height="40%" border="16px" />
        </VStack>
      }
      sidebar={<SkeletonRedesigned border="32px" width={220} height="100%" />}
    />
  );
};
