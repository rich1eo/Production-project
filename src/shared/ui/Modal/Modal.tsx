import {
  MutableRefObject,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';

import styles from './Modal.module.scss';

const ANIMATION_DELAY = 300;

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  lazy?: boolean;
  className?: string;
}

export default function Modal({
  className,
  children,
  isOpen,
  lazy,
  onClose,
}: ModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const timeRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
  const { theme } = useTheme();

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  const mods: Mods = {
    [styles.opened]: isOpen,
    [styles.isClosing]: isClosing,
  };

  const handleClose = useCallback(
    function handleClose() {
      setIsClosing(true);
      timeRef.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, ANIMATION_DELAY);
    },
    [onClose]
  );

  const handleCloseOnEscKey = useCallback(
    function handleCloseOnEscKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleCloseOnEscKey);
    }

    return () => {
      clearTimeout(timeRef.current);

      window.removeEventListener('keydown', handleCloseOnEscKey);
    };
  }, [isOpen, handleCloseOnEscKey]);

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
        <Overlay onClick={handleClose} />
        <div className={styles.content}>{children}</div>
      </div>
    </Portal>
  );
}
