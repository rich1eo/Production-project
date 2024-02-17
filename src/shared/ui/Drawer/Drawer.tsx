import { ReactNode, memo } from 'react';

import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { useModal } from 'shared/lib/hooks/useModal/useModal';

import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';

import styles from './Drawer.module.scss';

interface DrawerProps {
  children: ReactNode;
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

export const Drawer = memo((props: DrawerProps) => {
  const { className, children, isOpen, lazy, onClose } = props;

  const { close, isClosing, isMounted } = useModal({
    animationDelay: 300,
    isOpen,
    onClose,
  });

  const { theme } = useTheme();

  const mods: Mods = {
    [styles.opened]: isOpen,
    [styles.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div
        className={classNames(styles.Drawer, mods, [
          className,
          theme,
          'app_drawer',
        ])}
      >
        <Overlay onClick={close} />
        <div className={styles.content}>{children}</div>
      </div>
    </Portal>
  );
});
