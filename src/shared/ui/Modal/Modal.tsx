import { ReactNode } from 'react';

import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/app/providers/ThemeProvider';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';

import styles from './Modal.module.scss';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  lazy?: boolean;
  className?: string;
}

export default function Modal(props: ModalProps) {
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
        className={classNames(styles.Modal, mods, [
          className,
          theme,
          'app_modal',
        ])}
      >
        <Overlay onClick={close} />
        <div className={styles.content}>{children}</div>
      </div>
    </Portal>
  );
}
