import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import styles from './Modal.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import Portal from '../Portal/Portal';

const ANIMATION_DELAY = 100;

interface ModalProps {
  className?: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({
  className,
  children,
  isOpen,
  onClose,
}: ModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const timeRef = useRef<ReturnType<typeof setTimeout>>();

  const mods = {
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

  function handleContentClick(event: React.MouseEvent) {
    event.stopPropagation();
  }

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleCloseOnEscKey);
    }

    return () => {
      clearTimeout(timeRef.current);
      window.removeEventListener('keydown', handleCloseOnEscKey);
    };
  }, [isOpen, handleCloseOnEscKey]);

  return (
    <Portal>
      <div className={classNames(styles.Modal, mods, [className])}>
        <div className={styles.overlay} onClick={handleClose}>
          <div className={styles.content} onClick={handleContentClick}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
}
