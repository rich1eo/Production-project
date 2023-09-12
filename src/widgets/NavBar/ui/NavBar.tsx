/* eslint-disable i18next/no-literal-string */
import Modal from 'shared/ui/Modal/Modal';
import styles from './NavBar.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface NavBarProps {
  className?: string;
}

export function NavBar({ className }: NavBarProps) {
  const [isAuthModal, setIsAuthModal] = useState(false);
  const { t } = useTranslation();

  const handleToggleModal = useCallback(() => {
    setIsAuthModal(state => !state);
  }, []);

  return (
    <header className={classNames(styles.Navbar, {}, [className])}>
      <Button
        theme={ThemeButton.CLEAR_INVERTED}
        onClick={handleToggleModal}
        className={styles.links}
      >
        {t('Sign In')}
      </Button>
      <Modal isOpen={isAuthModal} onClose={handleToggleModal}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae rerum
        debitis sunt, consectetur aspernatur eos iure magnam perferendis
        eligendi ipsum! Exercitationem nulla dolores rerum animi, fugiat eaque
        temporibus iusto obcaecati.
      </Modal>
    </header>
  );
}
