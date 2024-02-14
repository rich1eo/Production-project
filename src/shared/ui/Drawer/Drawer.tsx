import { ReactNode, memo } from 'react';

import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';

import styles from './Drawer.module.scss';

interface DrawerProps {
  children: ReactNode;
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Drawer = memo((props: DrawerProps) => {
  const { className, children, isOpen, onClose } = props;
  const { theme } = useTheme();

  const mods: Mods = {
    [styles.opened]: isOpen,
  };

  return (
    <Portal>
      <div
        className={classNames(styles.Drawer, mods, [
          className,
          theme,
          'app_drawer',
        ])}
      >
        <Overlay onClick={onClose} />
        <div className={styles.content}>{children}</div>
      </div>
    </Portal>
  );
});
