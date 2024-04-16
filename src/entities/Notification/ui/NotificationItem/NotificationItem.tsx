import { memo } from 'react';

import { classNames } from '@/shared/lib';
import {
  Card,
  CardRedesigned,
  CardTheme,
  Text,
  TextRedesigned,
} from '@/shared/ui';

import { Notification } from '../../model/types/notification';

import * as styles from './NotificationItem.module.scss';
import { ToggleFeature } from '@/shared/lib/features';

interface NotificationItemProps {
  className?: string;
  notification: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
  const { className, notification } = props;

  const content = (
    <ToggleFeature
      name="isAppRedesigned"
      on={
        <CardRedesigned
          className={classNames(styles.NotificationItem, {}, [className])}
          variant="outline"
        >
          <TextRedesigned title={notification.title} />
          <TextRedesigned text={notification.description} />
        </CardRedesigned>
      }
      off={
        <Card
          theme={CardTheme.OUTLINED}
          className={classNames(styles.NotificationItem, {}, [className])}
        >
          <Text title={notification.title} />
          <Text text={notification.description} />
        </Card>
      }
    />
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
});
