import Text from 'shared/ui/Text/Text';
import styles from './ProfilePageHeader.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  getProfileData,
  getProfileReadonly,
  profileActions,
  updateProfileData,
} from 'entities/Profile';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from 'entities/User';

interface ProfilePageHeaderProps {
  className?: string;
}

export default function ProfilePageHeader({
  className,
}: ProfilePageHeaderProps) {
  const { t } = useTranslation('profile');
  const dispatch = useAppDispatch();
  const readonly = useSelector(getProfileReadonly);
  const profileData = useSelector(getProfileData);
  const authData = useSelector(getUserAuthData);
  const canEdit = authData?.id === profileData?.id;

  const handleEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const handleCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const handleSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  return (
    <div className={classNames(styles.ProfilePageHeader, {}, [className])}>
      <Text title={t('Profile')} />
      {canEdit && (
        <>
          {readonly && (
            <Button theme={ThemeButton.OUTLINE} onClick={handleEdit}>
              {t('Edit')}
            </Button>
          )}
          {!readonly && (
            <div className={styles.editBtns}>
              <Button
                theme={ThemeButton.OUTLINE_RED}
                onClick={handleCancelEdit}
              >
                {t('Cancel')}
              </Button>
              <Button theme={ThemeButton.OUTLINE} onClick={handleSave}>
                {t('Save')}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
