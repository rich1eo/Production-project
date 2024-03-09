import { memo } from 'react';

import { classNames } from '@/shared/lib';
import { Card, CardTheme, Text } from '@/shared/ui';

import { Notification } from '../../model/types/notification';

import styles from './NotificationItem.module.scss';

interface NotificationItemProps {
  className?: string;
  notification: Notification;
}

export const NotificationItem = memo(
  ({ className, notification }: NotificationItemProps) => {
    const content = (
      <Card
        theme={CardTheme.OUTLINED}
        className={classNames(styles.NotificationItem, {}, [className])}
      >
        <Text title={notification.title} />
        <Text text={notification.description} />
      </Card>
    );

    if (notification.href) {
      return (
        <a
          className={styles.link}
          target="_blank"
          href={notification.href}
          rel="noreferrer"
        >
          {content}
        </a>
      );
    }

    return content;
  }
);
