import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';
import {
  CardRedesigned,
  HStack,
  AvatarRedesigned,
  VStack,
  InputRedesigned,
  SkeletonRedesigned,
  TextRedesigned,
} from '@/shared/ui';

import { ProfileCardProps } from '../ProfileCard/ProfileCard';

import styles from './ProfileCardRedesigned.module.scss';

export const ProfileCardRedesignedError = () => {
  const { t } = useTranslation('profile');

  return (
    <CardRedesigned cardPadding="24" max>
      <TextRedesigned
        variant="error"
        title={t('An error occurred while loading the profile')}
        text={t('Try to reload the page')}
        align={'center'}
      />
    </CardRedesigned>
  );
};

export const ProfileCardRedesignedSkeleton = () => {
  return (
    <CardRedesigned cardPadding="24" max>
      <HStack justify="center" max className={styles.profileCardHeader}>
        <SkeletonRedesigned border="50%" width={128} height={128} />
      </HStack>
      <HStack gap="32" max>
        <VStack gap="16" max>
          <SkeletonRedesigned width="100%" height={38} border="48px" />
          <SkeletonRedesigned width="100%" height={38} border="48px" />
          <SkeletonRedesigned width="100%" height={38} border="48px" />
          <SkeletonRedesigned width="100%" height={38} border="48px" />
        </VStack>
        <VStack gap="16" max>
          <SkeletonRedesigned width="100%" height={38} border="48px" />
          <SkeletonRedesigned width="100%" height={38} border="48px" />
          <SkeletonRedesigned width="100%" height={38} border="48px" />
          <SkeletonRedesigned width="100%" height={38} border="48px" />
        </VStack>
      </HStack>
    </CardRedesigned>
  );
};

export const ProfileCardRedesigned = (props: ProfileCardProps) => {
  const {
    className,
    data,
    readonly,
    onChangeFirstName,
    onChangeSecondName,
    onChangeAge,
    onChangeCity,
    onChangeUsername,
    onChangeAvatar,
    onChangeCurrency,
    onChangeCountry,
  } = props;
  const { t } = useTranslation('profile');

  return (
    <CardRedesigned
      cardPadding="24"
      max
      className={classNames('', {}, [className])}
      data-testid="ProfileCard"
    >
      <HStack justify="center" max className={styles.profileCardHeader}>
        <AvatarRedesigned
          src={data?.avatar}
          alt={`Avatar of ${data?.username}`}
          size={128}
        />
      </HStack>

      <HStack gap="24" max>
        <VStack gap="16" max>
          <InputRedesigned
            value={data?.username}
            label={t('Username')}
            onChange={onChangeUsername}
            readonly={readonly}
          />
          <InputRedesigned
            value={data?.avatar}
            label={t('Avatar')}
            onChange={onChangeAvatar}
            readonly={readonly}
          />
          <InputRedesigned
            value={data?.firstName}
            label={t('First name')}
            onChange={onChangeFirstName}
            readonly={readonly}
            data-testid="ProfileCard.firstName"
          />
          <InputRedesigned
            value={data?.secondName}
            label={t('Second name')}
            onChange={onChangeSecondName}
            readonly={readonly}
            data-testid="ProfileCard.secondName"
          />
        </VStack>
        <VStack gap="16" max>
          <InputRedesigned
            value={data?.age}
            label={t('Age')}
            onChange={onChangeAge}
            readonly={readonly}
          />
          <InputRedesigned
            value={data?.city}
            label={t('City')}
            onChange={onChangeCity}
            readonly={readonly}
          />
          <CurrencySelect
            value={data?.currency}
            onChange={onChangeCurrency}
            readonly={readonly}
          />
          <CountrySelect
            value={data?.country}
            onChange={onChangeCountry}
            readonly={readonly}
          />
        </VStack>
      </HStack>
    </CardRedesigned>
  );
};
