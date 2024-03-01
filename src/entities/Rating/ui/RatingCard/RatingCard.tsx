import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import {
  Card,
  Drawer,
  Input,
  Modal,
  HStack,
  VStack,
  StarRating,
  Button,
  ButtonSize,
  ButtonTheme,
  Text,
} from '@/shared/ui';

interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  rate?: number;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
}

export const RatingCard = memo((props: RatingCardProps) => {
  const {
    title,
    className,
    feedbackTitle,
    hasFeedback,
    rate = 0,
    onAccept,
    onCancel,
  } = props;
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starsCount, setStarsCount] = useState(rate);
  const [feedback, setFeedback] = useState('');

  const handleSelectStars = useCallback(
    (selectedStarsCount: number) => {
      setStarsCount(selectedStarsCount);
      if (hasFeedback) {
        setIsModalOpen(true);
      } else {
        onAccept?.(selectedStarsCount);
      }
    },
    [hasFeedback, onAccept]
  );

  const handleAccept = useCallback(() => {
    setIsModalOpen(false);
    onAccept?.(starsCount, feedback);
  }, [feedback, onAccept, starsCount]);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
    onCancel?.(starsCount);
  }, [onCancel, starsCount]);

  const modalContent = (
    <>
      <Text title={feedbackTitle} />
      <Input
        placeholder={t('Your feedback')}
        value={feedback}
        onChange={setFeedback}
      />
    </>
  );

  return (
    <Card className={className} max>
      <VStack align="center" gap="8" max>
        <Text title={starsCount ? t('Thank you for feedback') : title} />
        <StarRating
          selectedStars={starsCount}
          size={40}
          onSelect={handleSelectStars}
        />
      </VStack>

      <BrowserView>
        <Modal isOpen={isModalOpen} onClose={handleCancel} lazy>
          <VStack max gap="32">
            {modalContent}
            <HStack max gap="8" justify="end">
              <Button theme={ButtonTheme.OUTLINE} onClick={handleAccept}>
                {t('Send')}
              </Button>
              <Button theme={ButtonTheme.OUTLINE_RED} onClick={handleCancel}>
                {t('Cancel')}
              </Button>
            </HStack>
          </VStack>
        </Modal>
      </BrowserView>
      <MobileView>
        <Drawer isOpen={isModalOpen} onClose={handleCancel}>
          <VStack gap="32">
            {modalContent}
            <Button onClick={handleAccept} size={ButtonSize.L} fullWidth>
              {t('Send')}
            </Button>
          </VStack>
        </Drawer>
      </MobileView>
    </Card>
  );
});
