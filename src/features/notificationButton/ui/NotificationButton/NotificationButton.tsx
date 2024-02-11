import { memo } from 'react';

import { NotificationList } from 'entities/Notification';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import Notification from 'shared/assets/icons/notification.svg';

import { classNames } from 'shared/lib/classNames/classNames';
import { Popover } from 'shared/ui/Popups';

import styles from './NotificationButton.module.scss';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className } = props;

  return (
    <Popover
      className={classNames('', {}, [className])}
      direction="bottom left"
      trigger={
        <Button theme={ThemeButton.CLEAR}>
          <Notification className={styles.notification} />
        </Button>
      }
    >
      <NotificationList className={styles.notifications} />
    </Popover>
  );
});
