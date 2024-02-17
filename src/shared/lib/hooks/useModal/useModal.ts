import {
  useState,
  useRef,
  MutableRefObject,
  useEffect,
  useCallback,
} from 'react';

interface UseModalProps {
  onClose?: () => void;
  isOpen?: boolean;
  animationDelay: number;
}

export const useModal = (props: UseModalProps) => {
  const { isOpen, animationDelay, onClose } = props;
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const timeRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  const close = useCallback(() => {
    if (!onClose) return;

    setIsClosing(true);
    timeRef.current = setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, animationDelay);
  }, [animationDelay, onClose]);

  const handleCloseOnEscKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    },
    [close]
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

  return {
    isClosing,
    isMounted,
    close,
  };
};
