import { ReactNode } from 'react';

import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

import { Portal } from '../../redesigned/Portal/Portal';
import { Overlay } from '../../redesigned/Overlay';

import * as styles from './Modal.module.scss';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  lazy?: boolean;
  className?: string;
}

/**
 * @deprecated
 */
export const Modal = (props: ModalProps) => {
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
};
