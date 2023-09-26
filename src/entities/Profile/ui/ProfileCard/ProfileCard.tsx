import { useSelector } from 'react-redux';
import styles from './ProfileCard.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { getProfileData } from 'entities/Profile/model/selectors/getProfileData/getProfileData';
import { getProfileIsLoading } from 'entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from 'entities/Profile/model/selectors/getProfileError/getProfileError';
import { useTranslation } from 'react-i18next';
import Text from 'shared/ui/Text/Text';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';

interface ProfileCardProps {
  className?: string;
}

export function ProfileCard({ className }: ProfileCardProps) {
  const { t } = useTranslation('profile');
  const profileData = useSelector(getProfileData);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);

  return (
    <div className={classNames(styles.ProfileCard, {}, [className])}>
      <div className={styles.header}>
        <Text title={t('Profile')} />
        <Button theme={ThemeButton.OUTLINE}>{t('Edit')}</Button>
      </div>
      <div className={styles.data}>
        <Input
          value={profileData?.firstName}
          placeholder={t('First name')}
          className={styles.input}
        />
        <Input
          value={profileData?.secondName}
          placeholder={t('Second name')}
          className={styles.input}
        />
      </div>
    </div>
  );
}
