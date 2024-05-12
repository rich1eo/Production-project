import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  Button,
  ButtonTheme,
  Text,
  HStack,
  ButtonRedesigned,
  TextRedesigned,
} from '@/shared/ui';

import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slice/profileSlice';
import { ToggleFeature } from '@/shared/lib/features';

interface EditableProfileCardHeaderProps {
  className?: string;
}

export const EditableProfileCardHeader = memo(
  ({ className }: EditableProfileCardHeaderProps) => {
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
      <HStack max justify="between" className={classNames('', {}, [className])}>
        <ToggleFeature
          name="isAppRedesigned"
          on={<TextRedesigned title={t('Profile')} />}
          off={<Text title={t('Profile')} />}
        />
        {canEdit && (
          <>
            {readonly && (
              <ToggleFeature
                name="isAppRedesigned"
                on={
                  <ButtonRedesigned
                    variant="outline"
                    onClick={handleEdit}
                    data-testid="EditableProfileCardHeader.EditBtn"
                  >
                    {t('Edit')}
                  </ButtonRedesigned>
                }
                off={
                  <Button
                    theme={ButtonTheme.OUTLINE}
                    onClick={handleEdit}
                    data-testid="EditableProfileCardHeader.EditBtn"
                  >
                    {t('Edit')}
                  </Button>
                }
              />
            )}
            {!readonly && (
              <HStack gap="8">
                <ToggleFeature
                  name="isAppRedesigned"
                  on={
                    <>
                      <ButtonRedesigned
                        variant="outline"
                        color="error"
                        onClick={handleCancelEdit}
                        data-testid="EditableProfileCardHeader.CancelBtn"
                      >
                        {t('Cancel')}
                      </ButtonRedesigned>
                      <ButtonRedesigned
                        variant="outline"
                        color="success"
                        onClick={handleSave}
                        data-testid="EditableProfileCardHeader.SaveBtn"
                      >
                        {t('Save')}
                      </ButtonRedesigned>
                    </>
                  }
                  off={
                    <>
                      <Button
                        theme={ButtonTheme.OUTLINE_RED}
                        onClick={handleCancelEdit}
                        data-testid="EditableProfileCardHeader.CancelBtn"
                      >
                        {t('Cancel')}
                      </Button>
                      <Button
                        theme={ButtonTheme.OUTLINE}
                        onClick={handleSave}
                        data-testid="EditableProfileCardHeader.SaveBtn"
                      >
                        {t('Save')}
                      </Button>
                    </>
                  }
                />
              </HStack>
            )}
          </>
        )}
      </HStack>
    );
  },
);
