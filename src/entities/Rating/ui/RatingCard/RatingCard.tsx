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
  TextRedesigned,
  InputRedesigned,
  ButtonRedesigned,
  CardRedesigned,
} from '@/shared/ui';
import { ToggleFeature } from '@/shared/lib/features';

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
    [hasFeedback, onAccept],
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
    <ToggleFeature
      name="isAppRedesigned"
      on={
        <>
          <TextRedesigned title={feedbackTitle} />
          <InputRedesigned
            placeholder={t('Your feedback')}
            value={feedback}
            onChange={setFeedback}
            data-testid="RatingCard.input"
          />
        </>
      }
      off={
        <>
          <Text title={feedbackTitle} />
          <Input
            placeholder={t('Your feedback')}
            value={feedback}
            onChange={setFeedback}
            data-testid="RatingCard.input"
          />
        </>
      }
    />
  );

  const content = (
    <>
      {' '}
      <VStack align="center" gap="8" max>
        <ToggleFeature
          name="isAppRedesigned"
          on={
            <>
              <TextRedesigned
                title={starsCount ? t('Thank you for feedback') : title}
              />
            </>
          }
          off={
            <>
              <Text title={starsCount ? t('Thank you for feedback') : title} />
            </>
          }
        />
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
            <ToggleFeature
              name="isAppRedesigned"
              on={
                <HStack max gap="8" justify="end">
                  <ButtonRedesigned
                    variant="outline"
                    onClick={handleAccept}
                    data-testid="RatingCard.send"
                  >
                    {t('Send')}
                  </ButtonRedesigned>
                  <ButtonRedesigned
                    variant="outline"
                    onClick={handleCancel}
                    data-testid="RatingCard.close"
                  >
                    {t('Cancel')}
                  </ButtonRedesigned>
                </HStack>
              }
              off={
                <HStack max gap="8" justify="end">
                  <Button
                    theme={ButtonTheme.OUTLINE}
                    onClick={handleAccept}
                    data-testid="RatingCard.send"
                  >
                    {t('Send')}
                  </Button>
                  <Button
                    theme={ButtonTheme.OUTLINE_RED}
                    onClick={handleCancel}
                    data-testid="RatingCard.close"
                  >
                    {t('Cancel')}
                  </Button>
                </HStack>
              }
            />
          </VStack>
        </Modal>
      </BrowserView>
      <MobileView>
        <Drawer isOpen={isModalOpen} onClose={handleCancel}>
          <VStack gap="32">
            {modalContent}
            <ToggleFeature
              name="isAppRedesigned"
              on={
                <ButtonRedesigned onClick={handleAccept} size="l" fullWidth>
                  {t('Send')}
                </ButtonRedesigned>
              }
              off={
                <Button onClick={handleAccept} size={ButtonSize.L} fullWidth>
                  {t('Send')}
                </Button>
              }
            />
          </VStack>
        </Drawer>
      </MobileView>
    </>
  );

  return (
    <ToggleFeature
      name="isAppRedesigned"
      on={
        <CardRedesigned
          className={className}
          max
          cardPadding="24"
          data-testid="RatingCard"
        >
          {content}
        </CardRedesigned>
      }
      off={
        <Card className={className} max data-testid="RatingCard">
          {content}
        </Card>
      }
    />
  );
});
