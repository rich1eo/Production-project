import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Drawer, Modal, Text } from '@/shared/ui';
import { saveJsonSettings, useUserJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { isMobile } from 'react-device-detect';

export const ArticlePageGreeting = memo(() => {
  const { t } = useTranslation('articles');
  const [open, setIsOpen] = useState(false);
  const { isArticlesPageHasBeenOpen } = useUserJsonSettings();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isArticlesPageHasBeenOpen) {
      setIsOpen(true);
      dispatch(saveJsonSettings({ isArticlesPageHasBeenOpen: true }));
    }
  }, [isArticlesPageHasBeenOpen, dispatch]);

  const handleClose = () => setIsOpen(false);

  const text = (
    <Text
      title={t('articlePageGreeting.title')}
      text={t('articlePageGreeting.description')}
    />
  );

  if (isMobile) {
    return (
      <Drawer isOpen={open} onClose={handleClose}>
        {text}
      </Drawer>
    );
  }

  return (
    <Modal isOpen={open} onClose={handleClose} lazy>
      {text}
    </Modal>
  );
});
