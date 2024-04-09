import { memo } from 'react';

import { classNames } from '@/shared/lib';
import { VStack, Skeleton } from '@/shared/ui';

import { useNotifications } from '../../api/notificationApi';
import { NotificationItem } from '../NotificationItem/NotificationItem';

interface NotificationListProps {
  className?: string;
}

export const NotificationList = memo(({ className }: NotificationListProps) => {
  const { data: notifications, isLoading } = useNotifications(null, {
    pollingInterval: 5000,
  });

  if (isLoading) {
    return (
      <VStack gap="16" max className={classNames('', {}, [className])}>
        <Skeleton width="100%" border="8px" height="80px" />
        <Skeleton width="100%" border="8px" height="80px" />
        <Skeleton width="100%" border="8px" height="80px" />
      </VStack>
    );
  }

  return (
    <VStack gap="16" max className={classNames('', {}, [className])}>
      {notifications?.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </VStack>
  );
});
