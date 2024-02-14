import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';

import { NotificationList } from 'entities/Notification';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import Notification from 'shared/assets/icons/notification.svg';

import { classNames } from 'shared/lib/classNames/classNames';
import { Popover } from 'shared/ui/Popups';

import styles from './NotificationButton.module.scss';
import { Drawer } from 'shared/ui/Drawer/Drawer';

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
    <Button onClick={handleOpenDrawer} theme={ThemeButton.CLEAR}>
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
