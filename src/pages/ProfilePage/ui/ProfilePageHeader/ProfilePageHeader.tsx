import Text from 'shared/ui/Text/Text';
import styles from './ProfilePageHeader.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  getProfileReadonly,
  profileActions,
  updateProfileData,
} from 'entities/Profile';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

interface ProfilePageHeaderProps {
  className?: string;
}

export default function ProfilePageHeader({
  className,
}: ProfilePageHeaderProps) {
  const { t } = useTranslation('profile');
  const dispatch = useAppDispatch();
  const readonly = useSelector(getProfileReadonly);

  const handleEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const hanldeCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const handleSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  return (
    <div className={classNames(styles.ProfilePageHeader, {}, [className])}>
      <Text title={t('Profile')} />
      {readonly && (
        <Button theme={ThemeButton.OUTLINE} onClick={handleEdit}>
          {t('Edit')}
        </Button>
      )}
      {!readonly && (
        <div className={styles.editBtns}>
          <Button theme={ThemeButton.OUTLINE_RED} onClick={hanldeCancelEdit}>
            {t('Cancel')}
          </Button>
          <Button theme={ThemeButton.OUTLINE} onClick={handleSave}>
            {t('Save')}
          </Button>
        </div>
      )}
    </div>
  );
}
