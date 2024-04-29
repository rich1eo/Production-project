import { useTranslation } from 'react-i18next';

import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import {
  Avatar,
  HStack,
  Input,
  Loader,
  Text,
  TextAlign,
  TextTheme,
  VStack,
} from '@/shared/ui';
import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';

import { ProfileCardProps } from '../ProfileCard/ProfileCard';

import styles from './ProfileCardDeprecated.module.scss';

export const ProfileCardDeprecatedError = () => {
  const { t } = useTranslation('profile');

  return (
    <HStack
      justify="center"
      max
      className={classNames(styles.ProfileCard, {}, [styles.error])}
    >
      <Text
        theme={TextTheme.ERROR}
        title={t('An error occurred while loading the profile')}
        text={t('Try to reload the page')}
        align={TextAlign.CENTER}
      />
    </HStack>
  );
};

export const ProfileCardDeprecatedLoader = () => {
  return (
    <HStack
      justify="center"
      max
      className={classNames(styles.ProfileCard, {}, [styles.loading])}
    >
      <Loader />
    </HStack>
  );
};

export const ProfileCardDeprecated = (props: ProfileCardProps) => {
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

  const mods: Mods = {
    [styles.editing]: !readonly,
  };

  return (
    <VStack
      max
      gap="16"
      className={classNames(styles.ProfileCard, mods, [className])}
      data-testid="ProfileCard"
    >
      {data?.avatar && (
        <HStack justify="center" max>
          <Avatar src={data.avatar} alt={`Avatar of ${data.username}`} />
        </HStack>
      )}
      <Input
        value={data?.username}
        placeholder={t('Username')}
        className={styles.input}
        onChange={onChangeUsername}
        readonly={readonly}
      />
      <Input
        value={data?.avatar}
        placeholder={t('Avatar')}
        className={styles.input}
        onChange={onChangeAvatar}
        readonly={readonly}
      />
      <Input
        value={data?.firstName}
        placeholder={t('First name')}
        className={styles.input}
        onChange={onChangeFirstName}
        readonly={readonly}
        data-testid="ProfileCard.firstName"
      />
      <Input
        value={data?.secondName}
        placeholder={t('Second name')}
        className={styles.input}
        onChange={onChangeSecondName}
        readonly={readonly}
        data-testid="ProfileCard.secondName"
      />
      <Input
        value={data?.age}
        placeholder={t('Age')}
        className={styles.input}
        onChange={onChangeAge}
        readonly={readonly}
      />
      <Input
        value={data?.city}
        placeholder={t('City')}
        className={styles.input}
        onChange={onChangeCity}
        readonly={readonly}
      />
      <CurrencySelect
        className={styles.input}
        value={data?.currency}
        onChange={onChangeCurrency}
        readonly={readonly}
      />
      <CountrySelect
        className={styles.input}
        value={data?.country}
        onChange={onChangeCountry}
        readonly={readonly}
      />
    </VStack>
  );
};
