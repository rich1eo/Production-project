import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';

import { NotificationList } from '@/entities/Notification';
import { Button, ButtonTheme, Popover, Drawer } from '@/shared/ui';
import Notification from '@/shared/assets/icons/notification-20-20.svg';
import { classNames } from '@/shared/lib';

import styles from './NotificationButton.module.scss';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  const trigger = (
    <Button onClick={handleOpenDrawer} theme={ButtonTheme.CLEAR}>
      <Notification className={styles.notification} />
    </Button>
  );

  return (
    <div>
      <BrowserView>
        <Popover
          className={classNames('', {}, [className])}
          direction="bottom left"
          trigger={trigger}
        >
          <NotificationList className={styles.notifications} />
        </Popover>
      </BrowserView>
      <MobileView>
        {trigger}
        <Drawer isOpen={isOpen} onClose={handleCloseDrawer}>
          <NotificationList />
        </Drawer>
      </MobileView>
    </div>
  );
});
