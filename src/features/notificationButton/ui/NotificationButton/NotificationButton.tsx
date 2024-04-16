import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';

import { NotificationList } from '@/entities/Notification';
import {
  Button,
  ButtonTheme,
  Popover,
  Drawer,
  Icon,
  PopoverRedesigned,
} from '@/shared/ui';
import { classNames } from '@/shared/lib';
import { ToggleFeature } from '@/shared/lib/features';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import NotificationIconDeprecated from '@/shared/assets/icons/notification-20-20.svg';

import * as styles from './NotificationButton.module.scss';

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
    <ToggleFeature
      name="isAppRedesigned"
      on={<Icon Svg={NotificationIcon} clickable onClick={handleCloseDrawer} />}
      off={
        <Button onClick={handleOpenDrawer} theme={ButtonTheme.CLEAR}>
          <NotificationIconDeprecated className={styles.notification} />
        </Button>
      }
    />
  );

  return (
    <div>
      <BrowserView>
        <ToggleFeature
          name="isAppRedesigned"
          on={
            <PopoverRedesigned
              className={classNames('', {}, [className])}
              direction="bottom left"
              trigger={trigger}
            >
              <NotificationList className={styles.notifications} />
            </PopoverRedesigned>
          }
          off={
            <Popover
              className={classNames('', {}, [className])}
              direction="bottom left"
              trigger={trigger}
            >
              <NotificationList className={styles.notifications} />
            </Popover>
          }
        />
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
