import {
  MutableRefObject,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './Modal.module.scss';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import Portal from '../Portal/Portal';

const ANIMATION_DELAY = 100;

interface ModalProps {
  className?: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  lazy?: boolean;
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

  if (lazy && !isMounted) {
    return null;
  }

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
