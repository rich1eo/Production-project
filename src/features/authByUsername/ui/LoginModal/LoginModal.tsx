import Modal from 'shared/ui/Modal/Modal';
import styles from './LoginModal.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import LoginForm from '../LoginForm/LoginForm';

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ className, isOpen, onClose }: LoginModalProps) {
  return (
    <Modal
      className={classNames(styles.LoginModal, {}, [className])}
      isOpen={isOpen}
      onClose={onClose}
      lazy
    >
      <LoginForm />
    </Modal>
  );
}
